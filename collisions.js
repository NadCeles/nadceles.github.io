const platforms = document.getElementsByClassName("platforms")
const traps = document.getElementsByClassName("traps")
let items = document.getElementsByClassName("items")
const itemSound = new Audio('music/Item.wav')
let floorPosition /*Position of floor player is on*/
let ceilPosition /*Position of ceil against wich the player collided*/
let wallPosition /*Position of wall agains wich the player collided*/
let landed /*Player is on floor*/
let crashed /*Player is moving against a wall*/
let topped /*Player is moving against a ceil*/
let traped /*Player is moving against a trap*/
let ended /*Player is moving against the end*/

/*Calls collision functions and checks player status*/
function checkMovement(){
    ended = checkEndCollisions()
    if(ended){
        levelIndex += 1;
        if(levelIndex == 3){
            ending = true;
            lastFacing = "right";
            isDashing = false;
            isFalling = false;
            isJumping = false;
            isOnWall = false;
            isWallJumping = false;
            bgMusic.pause();
            endMusic.play();
            clearInterval(timerInterval);
            board.innerHTML = level4;
            spawnX = spawnLevel4.x;
            spawnY = spawnLevel4.y;
            endingBG()
            respawn()
            bgImage.style.backgroundColor = "#10033d"
            let picho = document.getElementById('picho');
            let endText = document.getElementById('endText');
            var endingTimer = setInterval(endScene, 40)
            let endAnimation = setInterval(endingBG, 700)
        }
        board.innerHTML = levelArr[levelIndex];
        spawnX = levelSpawnArr[levelIndex].x;
        spawnY = levelSpawnArr[levelIndex].y;
        respawn();
    }
    traped = checkTrapCollisions();
    if(traped){
        deadSound.play()
        respawn()
    }
    landed = checkFloorCollisions();
    crashed = checkWallCollisions();
    topped = checkCeilCollisions();
    checkItemCollisions();
    if (landed) {
        isOnFloor = true;
    } 
    else {
        isOnFloor = false;
    }
    if(crashed){
        isOnWall = true;
    }
    else{
        isOnWall = false;
    }
    if(topped){
        isOnCeil = true;
    }
    else{
        isOnCeil = false;
    }
    
   
}


/*Checks if player is on the floor*/
function checkFloorCollisions(){
    for (let i = 0; i < platforms.length; i++) {
        let currentPlatform = getComputedStyle(platforms[i])
        let pLeft = Number(currentPlatform.left.replace("px",""))
        let pRight = pLeft + Number(currentPlatform.width.replace("px",""))
        let pTop = Number(currentPlatform.top.replace("px",""))
        let pBot = pTop + Number(currentPlatform.height.replace("px",""))

        if ( xPosition < pRight && 
            yPosition < pBot &&
            xPosition + charWidth > pLeft &&
            yPosition + charHeight > pTop &&
            yPosition + charHeight < pTop + 20) {
                floorPosition = pTop
                return true
            }
    }
    return false
}


/*Check if player is moving against a wall*/
function checkWallCollisions(){
    for (let j = 0; j < platforms.length; j++) {
        let currentPlatform = getComputedStyle(platforms[j])
        let pLeft = Number(currentPlatform.left.replace("px",""))
        let pRight = pLeft + Number(currentPlatform.width.replace("px",""))
        let pTop = Number(currentPlatform.top.replace("px",""))
        let pBot = pTop + Number(currentPlatform.height.replace("px",""))

        if (xPosition < pRight && 
            yPosition < pBot &&
            xPosition + charWidth > pLeft &&
            yPosition + charHeight > pTop + 10 &&
            (xPosition > pRight - 20 || xPosition + charWidth < pLeft + 20)) {
                if(xPosition > pRight - 20){
                    wallPosition = pRight;
                    wallJumpDirection = "left"
                }
                else if(xPosition + charWidth < pLeft + 20){
                    wallPosition = pLeft - charWidth;
                    wallJumpDirection = "right"
                }
                
                return true
            }

    }
    return false
}


/*Checks if player is jumping or dashing against the ceil*/
function checkCeilCollisions(){
    for (let i = 0; i < platforms.length; i++) {
        let currentPlatform = getComputedStyle(platforms[i]);
        let pLeft = Number(currentPlatform.left.replace("px",""));
        let pRight = pLeft + Number(currentPlatform.width.replace("px",""));
        let pTop = Number(currentPlatform.top.replace("px",""))
        let pBot = pTop + Number(currentPlatform.height.replace("px",""))

        if ( xPosition < pRight && 
            yPosition < pBot &&
            xPosition + charWidth > pLeft &&
            yPosition + charHeight > pTop &&
            yPosition > pBot - 20) {
                ceilPosition = pBot
                return true
            }
    }
    return false
}

/*Checks if player is picking an item*/
function checkItemCollisions(){
    for(let i = 0; i < items.length; i++){
        let currentItem = getComputedStyle(items[i]);
        let iLeft = Number(currentItem.left.replace("px", ""));
        let iRight = iLeft + Number(currentItem.width.replace("px", ""));
        let iTop = Number(currentItem.top.replace("px", ""));
        let iBot = iTop + Number(currentItem.height.replace("px", ""));

        if( xPosition < iRight &&
            yPosition < iBot &&
            xPosition + charWidth > iLeft &&
            yPosition + charHeight > iTop){
                hasAnItem = true;
                itemSound.play();
                const item = {
                    x: currentItem.left,
                    y: currentItem.top
                }
                itemPositionArr.push(item)
                items[i].style.top = yPosition - 50 + "px";
                items[i].style.left = xPosition - 50 + "px";
                itemArr.push(items[i])
        }
            
    }
}

/*Checks if player is moving torwards a trap*/
function checkTrapCollisions(){
    for (let i = 0; i < traps.length; i++) {
        let currentTrap = getComputedStyle(traps[i])
        let tLeft = Number(currentTrap.left.replace("px",""))
        let tRight = tLeft + Number(currentTrap.width.replace("px",""))
        let tTop = Number(currentTrap.top.replace("px",""))
        let tBot = tTop + Number(currentTrap.height.replace("px",""))

        if ( xPosition < tRight && 
            yPosition < tBot &&
            xPosition + charWidth > tLeft &&
            yPosition + charHeight > tTop) {
                return true
            }
        }
    return false
}

/*Checks if player reached the end of level*/
function checkEndCollisions(){
        let end = document.getElementsByClassName("end")
        if(end.length > 0){
            let currentEnd = getComputedStyle(end[0])
            let eLeft = Number(currentEnd.left.replace("px",""))
            let eRight = eLeft + Number(currentEnd.width.replace("px",""))
            let eTop = Number(currentEnd.top.replace("px",""))
            let eBot = eTop + Number(currentEnd.height.replace("px",""))
            if ( xPosition < eRight && 
                yPosition < eBot &&
                xPosition + charWidth > eLeft &&
                yPosition + charHeight > eTop) {
                    return true
                }
            else{
                return false
                }
        }
        else{
            return false
        }
    }
    