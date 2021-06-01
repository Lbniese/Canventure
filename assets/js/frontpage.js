// target canvas element and save it in variable
const canvas = document.getElementById('canvas');
// getContext gives access to build canvas methods
const ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 800;

const keys = [];

const player = {
    x: 575,
    y: 600,
    width: 32,
    height: 48,
    frameX: 0, // horizontal coordinate
    frameY: 0, //vertical coordinate - which row we are animating - crop from top left corner
    speed: 5,
    moving: false
};

const playerS = new Image();
playerS.src = "assets/img/spritesheet.png";

const background = new Image();
background.src = "assets/img/background.jpg";

const logo = new Image();
logo.src = "assets/img/logo.png";

function drawSprite(image, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH) {
    ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH);
}

window.addEventListener("keydown", (event) => {
    keys[event.keyCode] = true;
    player.moving = true;
    console.log(keys);

});

window.addEventListener("keyup", (event) => {
    delete keys[event.keyCode];
    player.moving = false;
});

function movePlayer() {
    // up
    if ((keys[38] || keys[87]) && player.y > 500) {
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }

    // left
    if ((keys[37] || keys[65]) && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }

    // down
    if ((keys[40] || keys[83]) && player.y < (canvas.height - player.height)) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }

    // right
    if ((keys[39] || keys[68]) && player.x < (canvas.width - player.width)) {
        player.x += player.speed;
        player.frameY = 2;
        
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) {
        player.frameX++
    } else {
        player.frameX = 0;
    }
}

/*
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    drawSprite(playerS, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
         player.x, player.y, player.width, player.height);

    movePlayer();
    handlePlayerFrame();
    requestAnimationFrame(animate);
}
*/

// animate();

// speed handling
let fps;
let fpsInterval;
let startTime;
let now;
let then;
let elapsed;

function handleSpeed(fps) {
    fpsInterval = 1000 / fps; // value in milli seconds
    then = Date.now();
    startTime = then;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(logo, 500, 0, 200, 150);

        drawSprite(playerS, player.width * player.frameX, player.height * player.frameY, player.width, player.height,
            player.x, player.y, player.width, player.height);

        movePlayer();
        handlePlayerFrame();
    }
    
}

handleSpeed(45);