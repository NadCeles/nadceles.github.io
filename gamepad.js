let gamepad

/*Search for gamepads*/

window.addEventListener("gamepadconnected", function (e) {
    gamepad = e.gamepad;
});

/*Reads the value in gamepad attributes*/
function updateGamePad(){
    if(gamepad && !ending){
        if(gamepad.buttons[14].value === 1){
            left = true;
            lastFacing = "left";
        }
        else{
            left = false
        }

        if(gamepad.buttons[15].value === 1){
            right = true;
            lastFacing = "right";
        }
        else{
            right = false;
        }

        if(gamepad.buttons[12].value === 1){
            up = true;
        }
        else{
            up = false;
        }

        if(gamepad.buttons[13].value === 1){
            down = true;
        }
        else{
            down = false;
        }

        if(gamepad.buttons[0].value === 1 && !jumpButtonPressed){
            jumpButtonPressed = true;
            if(canJump){
                isOnFloor = false;
                isJumping = true;
                canDash = false;
                timerDash = setTimeout(jumpDashWindow, 150)
            }
            if(canWallJump && !isJumping){
                isWallJumping = true;
                timerDash = setTimeout(jumpDashWindow, 150)
            }
        }
        else if(gamepad.buttons[0].value === 0){
            jumpButtonPressed = false;
        }
        if(gamepad.buttons[2].value == 1 && canDash && !dashButtonPressed){
            dashButtonPressed = true;
            canJump = false;
            isDashing = true;
        }
        else if(gamepad.buttons[2].value === 0){
            dashButtonPressed = false;
        }
    }
}

var timerPad = setInterval(updateGamePad, 10)