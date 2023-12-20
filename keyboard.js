/*Gets input from keyboard and checks if keys are pressed*/
window.addEventListener('keydown', function(e) {
    if(!ending){
        if(e.key.toLowerCase() === 'a'){
            left = true;
            lastFacing = "left";
        }
        if(e.key.toLowerCase() === 'd'){
            right = true;
            lastFacing = "right";
        }
        if(e.key.toLowerCase() === 'w'){
            up = true;
        }
        if(e.key.toLowerCase() === 's'){
            down = true;
        }

        if((e.key.toLowerCase() === 'l') && canJump){
            isOnFloor = false;
            isJumping = true;
            canDash = false;
            timerDash = setTimeout(jumpDashWindow, 150)
        }
        if((e.key.toLowerCase() === 'l') && canWallJump && !isJumping && !jumpButtonPressed){
            jumpButtonPressed = true;
            isWallJumping = true;
            timerDash = setTimeout(jumpDashWindow, 150)
        }
        if((e.key.toLowerCase() === 'k') && canDash && !dashButtonPressed){
            dashButtonPressed = true;
            canJump = false;
            isDashing = true;
        }
    }
})

/*Gets input from keyboard and checks if keys are released*/
window.addEventListener('keyup', function(e) {
    if(e.key.toLowerCase() === 'a'){
        left = false;
    }
    if(e.key.toLowerCase() === 'd'){
        right = false;
    }
    if(e.key.toLowerCase() === "w"){
        up = false;
    }
    if(e.key.toLowerCase() === "s"){
        down = false;
    }
    if(e.key.toLowerCase() === 'l'){
        jumpButtonPressed = false;
    }
    if(e.key.toLowerCase() === 'k'){
        dashButtonPressed = false;
    }
})