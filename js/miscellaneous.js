function playGame() {
    document.getElementById("instruction").style.display = "none";
    document.getElementById("playground").style.display = "block";
}

let percent = 0;
function count() {
    if (percent <= 100) percent += 0.1;
    else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("toInstruction").style.display = "block";
    }
}

window.setInterval(function loading() {
    let canvas = document.getElementById("loading");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0,0, canvas.width * percent/100, canvas.height);
    count();
}, 5);

function toInstruction() {
    document.getElementById("introduction").style.display = "none";
    document.getElementById("instruction").style.display = "block";
}

let bossScene = new Image();
bossScene.src = 'images/boss_scene.jpg'
const counting = ['3', '2', '1', 'READY?', 'FIGHT!'];

function toBoss() {
    document.getElementById("playground").style.display = "none";
    document.getElementById("boss_field_div").style.display = "block";

    stopBoss = false;

    let canvas = document.getElementById("boss-field");
    let context = canvas.getContext("2d");
    context.drawImage(bossScene, 0, 0, canvas.width, canvas.height);
    bossScene.width = canvas.width;
    bossScene.height = canvas.height;

    let count = 0;
    const notification = setInterval(function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bossScene, 0, 0, canvas.width, canvas.height);
        if (count < 5) {
            context.font = "100px Comic Sans MS";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("WARNING", canvas.width / 2, canvas.height / 2 - 50);
            context.fillText(counting[Math.floor(count)], canvas.width / 2, canvas.height / 2 + 70);
            count += 0.005;
        } else {
            time -= 0.005;
            updateBossText();
        }
        if (stopBoss) {
            clearInterval(notification);
            time = 60.0;
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, 1);
}