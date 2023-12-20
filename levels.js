let board = document.getElementById('level');
let levelIndex = 0;
let bgImage = document.getElementById('board');
let bgMusic = new Audio('music/Glacier.mp3');
let endMusic = new Audio('music/Ending.mp3');
let menuMusic = new Audio('music/Menu.mp3')
bgMusic.play()


const level0 = `<div id="titleImg"></div>
<button type="button" id="newGame"></button>
<div id="gameCredits">A Game by Nadia Cerra & Jaime Llaca<div>`

const level1 = `<div class="platforms" id="p_1_1"></div>
<div class="platforms" id="p_1_2"></div>
<div class="platforms" id="p_1_3"></div>
<div class="platforms" id="p_1_4"></div>
<div class="platforms" id="p_1_5"></div>
<div class="platforms" id="p_1_6"></div>
<div class="platforms" id="p_1_7"></div>
<div class="platforms" id="p_1_8"></div>
<div class="platforms" id="p_1_9"></div>
<div class="platforms" id="p_1_10"></div>
<div class="platforms" id="p_1_11"></div>
<div class="traps trapsV" id="t_1_1"></div>
<div class="traps trapsV" id="t_1_2"></div>
<div class="traps trapsH" id="t_1_3"></div>
<div class="items" id="i_1_1"></div>
<div class="items" id="i_1_2"></div>
<div class="items" id="i_1_3"></div>
<div class="end" id="e_1"></div>`

const level2 = `<div class="platforms" id="p_2_1"></div>
<div class="platforms" id="p_2_2"></div>
<div class="platforms" id="p_2_3"></div>
<div class="platforms" id="p_2_4"></div>
<div class="platforms" id="p_2_5"></div>
<div class="platforms" id="p_2_6"></div>
<div class="platforms" id="p_2_7"></div>
<div class="platforms" id="p_2_8"></div>
<div class="platforms" id="p_2_9"></div>
<div class="platforms" id="p_2_10"></div>
<div class="platforms" id="p_2_11"></div>
<div class="platforms" id="p_2_12"></div>
<div class="platforms" id="p_2_13"></div>
<div class="platforms" id="p_2_14"></div>
<div class="platforms" id="p_2_15"></div>
<div class="platforms" id="p_2_16"></div>
<div class="platforms" id="p_2_17"></div>
<div class="platforms" id="p_2_18"></div>
<div class="platforms" id="p_2_19"></div>
<div class="platforms" id="p_2_20"></div>
<div class="traps trapsV" id="t_2_1"></div>
<div class="traps trapsH" id="t_2_2"></div>
<div class="traps trapsH" id="t_2_3"></div>
<div class="traps trapsH" id="t_2_4"></div>
<div class="traps trapsH" id="t_2_5"></div>
<div class="traps trapsH" id="t_2_6"></div>
<div class="traps trapsH" id="t_2_7"></div>
<div class="traps trapsH" id="t_2_8"></div>
<div class="traps trapsH" id="t_2_10"></div>
<div class="items" id="i_2_1"></div>
<div class="items" id="i_2_2"></div>
<div class="items" id="i_2_3"></div>
<div class="items" id="i_2_4"></div>
<div class="end" id="e_2"></div>`

const level4 = `<div class="platforms peakPlatform" id="p_4_3"></div>
<div id="picho"></div>
<div id="endText">I miss you</div>`

const spawnLevel0 = {
    x: 0,
    y: 0
}

const spawnLevel1 = {
    x: 60,
    y: 500
}

const spawnLevel2 = {
    x: 60,
    y: 500
}

const spawnLevel4 = {
    x: 60,
    y: 520
}

const levelArr = [level0, level1, level2, level4]
const levelSpawnArr = [spawnLevel0, spawnLevel1, spawnLevel2, spawnLevel4]


board.innerHTML = levelArr[levelIndex]
character.style.display = "none";

let newGameButton = document.getElementById("newGame")

window.onclick = function(event){

    if(event.target === newGameButton){
        /*Calls time every second to display time on screen*/
        menuMusic.play()
        scorePrompt.innerText = `Score: 0`
        timePrompt.innerText = `Time: 00:00:00`
        timerInterval = setInterval(scoreTimer, 1000);
        levelIndex += 1;
        board.innerHTML = levelArr[levelIndex];
        spawnX = levelSpawnArr[levelIndex].x;
        spawnY = levelSpawnArr[levelIndex].y;
        character.style.display = "block";
        bgImage.style.backgroundImage="url('sprites/background2.png')"
        respawn();
    }
}

window.addEventListener('keydown', function(e) {
    if(e.key === "1"){
        board.innerHTML = level1;
        levelIndex = 1;
        spawnX = spawnLevel1.x;
        spawnY = spawnLevel1.y;
        character.style.display = "block";
        bgImage.style.backgroundImage="url('sprites/background2.png')"
        respawn()

    }
    if(e.key === "2"){
        board.innerHTML = level2;
        levelIndex = 2;
        spawnX = spawnLevel1.x;
        spawnY = spawnLevel1.y;
        character.style.display = "block";
        bgImage.style.backgroundImage="url('sprites/background2.png')"
        respawn()
    }
    if(e.key === "3"){
        board.innerHTML = level0;
        levelIndex = 0;
        character.style.display = "none"; 
        spawnX = spawnLevel0.x;
        spawnY = spawnLevel0.y;
        bgImage.style.backgroundImage="url('sprites/background2.png')"
        respawn()
    }
    if(e.key === "4"){
        bgMusic.pause()
        endMusic.play()
        board.innerHTML = level4;
        levelIndex = 3;
        ending = true;
        lastFacing = "right";
        spawnX = spawnLevel4.x;
        spawnY = spawnLevel4.y;
        bgImage.style.backgroundColor = "#10033d"
        let endAnimation = setInterval(endingBG, 700)
        character.style.display = "block";
        
        endingBG()
        respawn()
        let picho = document.getElementById('picho');
        var endingTimer = setInterval(endScene, 40)
    }
    })
