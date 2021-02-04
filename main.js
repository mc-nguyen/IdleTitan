var monster = {
    "level": 1,
    "monster-pic": {
        "col": 0,
        "row": 0,
    },
};
var row = 190;
var col = 134;

var image = new Image();
image.src = 'images/img.png';

window.onload = function() {
    var canvas = document.getElementById("battle").getContext("2d");
    canvas.drawImage(image, monster["monster-pic"]["col"] * col, monster["monster-pic"]["row"] * row, col, row, 10, 10, col, row);
}

function runAway() {
    var canvas = document.getElementById("battle").getContext("2d");
    canvas.clearRect(0, 0, 300, 300);
}

function nextBattle() {
    monster["level"]++;
    monster["monster-pic"]["col"]++;

    if (monster["monster-pic"]["col"] == 4) {
        monster["monster-pic"]["col"] = 0;
        monster["monster-pic"]["row"]++;
    }
    if (monster["monster-pic"]["row"] == 3) {
        monster["monster-pic"]["row"] = 0;
    }

    var canvas = document.getElementById("battle").getContext("2d");
    canvas.clearRect(0, 0, 300, 300);
    canvas.drawImage(image, monster["monster-pic"]["col"] * col, monster["monster-pic"]["row"] * row, col, row, 10, 10, col, row);
}