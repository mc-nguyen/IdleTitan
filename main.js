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
    updateText();
    updateTitan();
}

//Global Variables
var defaultMonsterHP = 5;
var monsterHP = 5;
var defeatedMonsterCount = 0;
var playerATK = 1;
var characterGold = 0;

function attackMonster()
{
     if(monsterHP > 0)
     {
         console.log("Monster HP: " + monsterHP)
          monsterHP -= playerATK;
          if(monsterHP <= 0)
          {
              characterGold += Math.ceil(defaultMonsterHP/2);
              console.log("Gold: " + characterGold);
               defeatedMonsterCount++;
               defaultMonsterHP = Math.ceil(defaultMonsterHP * 1.2)
               monsterHP = defaultMonsterHP;
               nextBattle();
               updateTitan();
          }
     }
     updateText();
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

    updateText();
}

function updateText() {
    var canvas = document.getElementById("battle")
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image,
        monster["monster-pic"]["col"] * col,
        monster["monster-pic"]["row"] * row,
        col,
        row,
        (canvas.width - col) / 2,
        canvas.height - row + 10,
        col,
        row
    );
    context.font = "30px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Level: " + monster["level"], canvas.width/2, 35);
    context.fillText("HP: " + monsterHP, canvas.width/2, 70);
}

function updateTitan() {
    document.getElementById("gold").innerHTML = characterGold;
    document.getElementById("attack-damage").innerHTML = playerATK;
    document.getElementById("defeated-monsters").innerHTML = defeatedMonsterCount;
}