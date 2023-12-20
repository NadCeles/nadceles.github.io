const walkArr = ["url('sprites/player_walk_1.png')", "url('sprites/player_walk_2.png')"];
const iceSpikeHArr = ["url('sprites/trapSpike1H.png')", "url('sprites/trapSpike2H.png')"]
const iceSpikeVArr = ["url('sprites/trapSpike1V.png')", "url('sprites/trapSpike2V.png')"]
const itemSpriteArr = ["url('sprites/bonesprite2.png')", "url('sprites/bonesprite3.png')"]
const iceSpriteArr = ["url('sprites/iceTile1.png')", "url('sprites/iceTile2.png')"]
const dogWalkArr = ["url('sprites/doggyWalk1.png') , url('sprites/doggyWalk2.png')"]
const iceSpikesH = document.getElementsByClassName("trapsH")
const iceSpikesV = document.getElementsByClassName("trapsV")
const jumpSound = new Audio('music/Jump.wav')
const stepSound = new Audio('music/Step.wav')
const dashSound = new Audio('music/Dash.wav')
const wallSound = new Audio('music/Friction.wav')
const deadSound = new Audio('music/Dead.wav')
let walkArrIndex = 0;
let itemSpriteIndex = 0;
let iceSpriteIndex = 0;
let iceSpikeIndex = 0;
let intervalWalk
let intervalItem
let intervalIce
let intervalSpike


/*Sets player sprite according player status, and iterates through the animation set for the current state*/
function animations(){
    if(isWalking){
        stepSound.play()
        if(!intervalWalk){
            intervalWalk = setInterval(walkAnimation, 100);
        }
    }
    else{
        stepSound.pause()
        clearInterval(intervalWalk)
        intervalWalk = null;
        if(isDashing){
            dashSound.play()
            character.style.backgroundImage = "url('sprites/player_dash.png')";
        }
        else if (isJumping || isWallJumping){
            jumpSound.play()
            character.style.backgroundImage = "url('sprites/player_jumping_1.png')";
        }
        else if(isFalling){
            character.style.backgroundImage = "url('sprites/player_fall_1.png')";
        }
        else if(isOnWall){
            wallSound.play()
            character.style.backgroundImage = "url('sprites/trywallslide_2.png')";
        }
        else{
            character.style.backgroundImage = "url('sprites/player_stand_1.png')";
        }
    }

    /*Flips sprites in facing direction*/
    if(lastFacing === "left"){
        character.style.transform = "scaleX(-1)";
    }
    else if(lastFacing === "right"){
        character.style.transform = "scaleX(1)";
    }


    /*Calls item animation function*/
    if(!intervalItem){
        intervalItem = setInterval(itemAnimation, 500)
    }
    if(!intervalIce){
        intervalIce = setInterval(iceAnimation, 800)
    }
    if(!intervalSpike){
        intervalSpike = setInterval(iceSpikesAnimation, 1500)
    }
}


/*Altenates between walking sprites to create walk animation*/
function walkAnimation(){
    character.style.backgroundImage = walkArr[walkArrIndex]
    walkArrIndex += 1
        if(walkArrIndex > walkArr.length - 1){
            walkArrIndex = 0;
        }
}


function itemAnimation(){
    for(let i = 0; i < items.length; i++){
        items[i].style.backgroundImage = itemSpriteArr[itemSpriteIndex]
    }
    itemSpriteIndex += 1
        if(itemSpriteIndex > itemSpriteArr.length -1){
            itemSpriteIndex = 0;
        }
}

function iceAnimation(){
    if(levelIndex != 3){
        for(let i = 0; i < platforms.length; i++){
            platforms[i].style.backgroundImage = iceSpriteArr[iceSpriteIndex] 
        }
        iceSpriteIndex += 1
            if(iceSpriteIndex > iceSpriteArr.length -1){
                iceSpriteIndex = 0
            }
    }
}
function iceSpikesAnimation(){
    for(let i = 0; i < iceSpikesH.length; i++){
        iceSpikesH[i].style.backgroundImage = iceSpikeHArr[iceSpikeIndex]
    }
    for(let i = 0; i < iceSpikesV.length; i ++){
        iceSpikesV[i].style.backgroundImage = iceSpikeVArr[iceSpikeIndex]
    }

    iceSpikeIndex += 1
    if(iceSpikeIndex > iceSpikeHArr.length -1){
        iceSpikeIndex = 0
    }

}


