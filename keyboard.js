/*Gets input from keyboard and checks if keys are pressed*/
window.addEventListener('keydown', function(e) {
    if(!ending){
        if(e.key === 'a'){
            left = true;
            lastFacing = "left";
        }
        if(e.key === 'd'){
            right = true;
            lastFacing = "right";
        }
        if(e.key === 'w'){
            up = true;
        }
        if(e.key === 's'){
            down = true;
        }

        if((e.key === ' ' || e.key === 'l') && canJump){
            isOnFloor = false;
            isJumping = true;
            canDash = false;
            timerDash = setTimeout(jumpDashWindow, 150)
        }
        if((e.key === ' ' || e.key === 'l') && canWallJump && !isJumping && !jumpButtonPressed){
            jumpButtonPressed = true;
            isWallJumping = true;
            timerDash = setTimeout(jumpDashWindow, 150)
        }
        if((e.key === 'k' || e.key === 'Shift') && canDash && !dashButtonPressed){
            dashButtonPressed = true;
            canJump = false;
            isDashing = true;
        }
    }
})

/*Gets input from keyboard and checks if keys are released*/
window.addEventListener('keyup', function(e) {
    if(e.key === 'a'){
        left = false;
    }
    if(e.key === 'd'){
        right = false;
    }
    if(e.key === "w"){
        up = false;
    }
    if(e.key === "s"){
        down = false;
    }
    if(e.key === ' ' || e.key === 'l'){
        jumpButtonPressed = false;
    }
    if(e.key === 'k' || e.key === 'Shift'){
        dashButtonPressed = false;
    }
})