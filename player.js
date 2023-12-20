let character = document.getElementById('character'); /*Gets the character div in html*/
let charStyle = getComputedStyle(character); /*Gets an object from we can read the character atributtes*/
let scorePrompt = document.getElementById("score") /*Gets the score div in html*/
let timePrompt = document.getElementById('time') /*Gets the time div in html*/

let charWidth = Number(charStyle.width.replace("px", "")); /*Gets character width to use in calculations*/
let charHeight = Number(charStyle.height.replace("px", "")); /*Gets character height to use in calculations*/

/*Gravity values*/
let gravity = 4; /*Gravity value, substracted every update*/
const gravDefault = 4; /*Default gravity value*/
const gravJump = 2; /*Gravity value during jump*/
const gravDash = 0; /*Gravity value during dash */
const gravWall = 1; /*Gravity value while grabing a wall*/

/*Player position*/
let spawnX = 60; /*X position of player respawn, from the left of the screen*/
let spawnY = 500; /*Y position of player respawn, from the Top of the screen*/
let xPosition = spawnX; /*X position of the character, from the left of the screen*/
let yPosition = spawnY; /*Y position of the character, from the top of the screen*/
let yOldPosition /*Holds the previous Y position of the character, for animation purposes*/

/*Player directions*/
let right = false; /*Flag to check is right direction is pressed*/
let left = false; /*Flag to check is left direction is pressed*/
let up = false; /*Flag to check is up direction is pressed during a dash*/
let down = false; /*Flag to check is right direction is pressed during a dash*/
let lastFacing = "right"; /*Holds the direction in wich the character is looking, right for default*/

/*Movement values*/
const movementSpeed = 3; /*Movement speed value*/

 /*Jump values*/
let jumpFrames = 0; /*Counts the time since jump started*/
const maxJumpFrames = 12; /*Jump duration*/
const jumpSpeed = 10; /*Jump distance*/

 /*Wall jump values*/
let wallJumpFrames = 0; /*Counts the time since wall jump started*/
const maxWallJumpFrames = 13; /*Wall jump duration*/
const wallJumpSpeedY = 10; /*Wall jump y distance*/
const wallJumpSpeedX = 1.5; /*Wall jump x distance*/
let wallJumpDirection /*The direction for the wall jump*/

 /*Dash values*/
let dashFrames = 0; /*Counts time since dash started*/
const dash_speed = 9; /*Dash distance*/
const dash_max_frames = 10/*Dash time*/

/*Player status*/
let isJumping = false; /*Checks if player is jumping*/
let isWallJumping = false; /*Checks if player is wall jumping*/
let isDashing = false; /*Checks if player is dashing*/
let isOnFloor = false; /*Checks if player is on the floor*/
let isOnCeil = false; /*Checks if player is jumping against the ceiling*/
let isOnWall = false; /*Checks if player is going against a wall*/
let isWalking = false; /*Checks if player is walking*/
let isFalling = false; /*Checks if player is falling*/

let canJump = true; /*Checks if player can jump*/
let canWallJump = false; /*Checks if player can wall jump*/
let canDash = true; /*Checks if player can dash*/

/*Timers*/
let mainLoop /*Controls the main game loop interval*/
let timerDash /*Controls time between jump and dash*/
let timerInterval /*Controls time since game started*/
let hours = 0
let minutes = 0
let seconds = 0
let strHours = String()
let strMinutes = String()
let strSeconds = String()

/*General*/
let score = 0; /*Holds the current score*/
let hasAnItem = false; /*Checks if player has an item*/
let itemArr = [] /*Holds the html items the player has*/
let itemPositionArr = [] /*Holds the original position of items*/
let jumpButtonPressed = false; /*Checks if jump button is pressed*/
let dashButtonPressed = false; /*Checks if dash button is pressed*/
let ending = false; /*Checks if player is in the ending scene*/


/*Calls the game update function every 10 miliseconds*/
mainLoop = setInterval(updateMove, 10);

/*Main game function*/
function updateMove(){


    /*Modifies gravity based in wich movement is performed and calls special movement functions*/
    if(isJumping){
        updateJump();
        gravity = gravJump;
    }
    else if(isDashing){
        updateDash();
        gravity = gravDash;
    }
    else if(isOnWall){
        gravity = gravWall;
    }
    else{
        gravity = gravDefault; 
    }

    /*Movement to the left*/
    if(left && !isWallJumping){
        xPosition -= movementSpeed
        if(isDashing && !up){
            xPosition -= dash_speed;
        }
        else if(isDashing && up){
            xPosition -= dash_speed * 0.707;
        }
    }

    /*Movement to the Right*/
    if(right && !isWallJumping){
        xPosition += movementSpeed;
        if(isDashing && !up){
            xPosition += dash_speed;
        }
        else if(isDashing && up){
            xPosition += dash_speed * 0.707;
        }
        
    }

    /*Movement up for dashing*/
    if(up && isDashing){
        if(left || right){
            yPosition -= dash_speed * 0.707;
        }
        else{
            yPosition -= dash_speed;
        }
        
    }

    /*Movement down for dashing*/
    if(down && isDashing){
        if(left || right){
            yPosition += dash_speed * 0.707;
        }
        else{
            yPosition += dash_speed;
        }
    }

    /*Stand still dash*/
    if(!right && !left && !up && !down && isDashing){
        if(lastFacing === "right"){
            xPosition += dash_speed;
        }
        else if(lastFacing === "left"){
            xPosition -= dash_speed;
        }
    }

    
    /*Adds gravity every game update*/
    yPosition += gravity;
    
    /*Checks movement collision functions*/
    checkMovement()

    /*Limits xPosition if a wall collision ocurred*/
    if(isOnWall){
        if(lastFacing === "right"){
            xPosition = clamp(xPosition, 0, wallPosition);
        }
        if(lastFacing === "left"){
            xPosition = clamp(xPosition, wallPosition, 600);
        }
    }
    /*Calls wall jump function and sets gravity*/
    if(isWallJumping){
        updateWallJump();
        gravity = gravJump;
    }


    /*Limits yPosition if floor collision ocurred*/
    if(isOnFloor){
        yPosition = clamp(yPosition, 0, floorPosition - charHeight)
    }

    /*Limits yPosition if ceil collision ocurred*/
    if(isOnCeil && yPosition <= ceilPosition){
        yPosition = clamp(yPosition, ceilPosition, 600);
    }

    /*Calls respawn and resets player position if player falls into the void*/
    if(yPosition >= 600 && levelIndex != 0){
        deadSound.play()
        respawn()
    }
    
    /*Calls animation function to change the sprite before aplying movement*/
    animations();

    /*Applies movement to the player character*/
    character.style.left = xPosition + "px";
    character.style.top =  yPosition + "px";

    if(hasAnItem){
        for(let i = 0; i < itemArr.length; i++){
            itemArr[i].style.top = yPosition - 50 + "px";
            itemArr[i].style.left = xPosition - 50 + "px";
        }
    }

    /*Checks player conditions*/
    checkStatus();
    yOldPosition = yPosition
    
   
}

/*Jump*/
function updateJump(){
    jumpFrames += 1;
    yPosition -= jumpSpeed;
    if(jumpFrames >= maxJumpFrames){
        isJumping = false;
        jumpFrames = 0;
    }
}

/*Wall jump*/
function updateWallJump(){
    wallJumpFrames += 1;
    yPosition -= wallJumpSpeedY;
    if(wallJumpDirection === "left"){
        xPosition += movementSpeed * wallJumpSpeedX
    }
    if(wallJumpDirection === "right"){
        xPosition -= movementSpeed * wallJumpSpeedX
    }
    if(wallJumpFrames >= maxWallJumpFrames){
        isWallJumping = false;
        wallJumpFrames = 0;
    }
}

/*Dash*/
function updateDash(){
    dashFrames += 1;
    if(dashFrames >= dash_max_frames){
        isDashing = false;
        dashFrames = 0;
    }
}

/*Checks player status after movement*/
function checkStatus(){
    if(isOnFloor){
        canJump = true;

        if(!isDashing){
            canDash = true;
        }
        if(hasAnItem){
           itemUpdate()
        }
    }
    else{
        canJump = false
    }
    
    if((left || right) && isOnFloor){
        isWalking = true;
    }
    else{
        isWalking = false;
    }
    if(!isJumping && !isOnFloor && yPosition - yOldPosition > 3){
        isFalling = true;
        character.style.height = "40px";
    }
    else{
        isFalling = false;
        character.style.height = "30px";
    }
    
    if(isOnWall){
        character.style.height = "33px"
        canWallJump = true;
        canDash = true;
    }
    else{
        canWallJump = false;
    }

    if(isJumping){
        character.style.height = "33px";
        canJump = false;
    }
    else{
        character.style.height = "30 px"
    }

    if(isDashing){
        canDash = false;
    }
}   

/*Resets player position to the level spawn*/
function respawn(){
    character.style.left = xPosition + "px";
    character.style.top = yPosition + "px";
    xPosition = spawnX;
    yPosition = spawnY;
    character.style.left = xPosition + "px";
    character.style.top = yPosition + "px";
    
    restoreItems();
}

/*Enables dash when some time is passed after the jump*/
function jumpDashWindow(){
    canDash = true;
}

/*Update score and removes items*/
function itemUpdate(){
    for(let i = 0; i < itemArr.length; i++){
        itemSound.play();
        score += 100;
        scorePrompt.innerText = `Score: ${score}`
        itemArr[i].remove()
    }
    itemArr = [];
    itemPositionArr = [];
    hasAnItem = false;
}

/*Resets items picked before dead*/
function restoreItems(){
    if(hasAnItem){
        for(let i = 0; i < itemArr.length; i++){
            itemArr[i].style.top = itemPositionArr[i].y;
            itemArr[i].style.left = itemPositionArr[i].x;
        }
        itemArr = [];
        itemPositionArr = [];
        hasAnItem = false;
    }
}

/*Counts time since game started and display it in screen*/
function scoreTimer(){
    seconds += 1;
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
    if(minutes >= 60){
        hours += 1;
        minutes = 0;
    }
    
    strHours = hours.toString().padStart(2, '0');
    strMinutes = minutes.toString().padStart(2, '0');
    strSeconds = seconds.toString().padStart(2, '0')

    timePrompt.innerText = `Time: ${strHours}:${strMinutes}:${strSeconds}`
}

/*Clamps values in movement functions*/
function clamp(val, min, max){
    return Math.min(Math.max(val, min), max);
}