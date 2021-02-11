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

function toBoss() {
    document.getElementById("playground").style.display = "none";
    document.getElementById("boss-field").style.display = "block";
}