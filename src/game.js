import { Scene } from "./scene.js";
import { Player, Plateform } from "./solids.js";

const canvas = document.getElementById('platformer');
const ctx = canvas.getContext('2d');

const scene = new Scene(new Player(40, 0), new Plateform(0, 275, 300, 25), new Plateform(350, 200, 100, 25), new Plateform(400, 275, 400, 25), new Plateform(700, 120, 300, 25), new Plateform(850, 275, 200, 25), new Plateform(1000, 200, 100, 25));

let previous = 0;
const tick = function (timestamp) {
    scene.updatePositions((timestamp - previous) / 1000);
    scene.checkCollisions();
    scene.updateCameraPosition(canvas.width);

    if (player.y > canvas.height) {
        player.x = 40;
        player.y = 0;
        player.velX = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.render(ctx);
    requestAnimationFrame(tick);
    previous = timestamp;
}

requestAnimationFrame(tick);

const player = scene.player();
document.addEventListener('keydown', function (e) {
    if (e.code == 'ArrowRight') {
        player.rightKeyDown = true;
    } else if (e.code == 'ArrowLeft') {
        player.leftKeyDown = true;
    }
    if (e.code == 'Space') {
        player.jump();
    }
}, false);
document.addEventListener('keyup', function (e) {
    if (e.code == 'ArrowRight') {
        player.rightKeyDown = false;
    }
    if (e.code == 'ArrowLeft') {
        player.leftKeyDown = false;
    }
}, false);