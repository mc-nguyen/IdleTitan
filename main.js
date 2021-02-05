const monster = {
    "level": 1,
    "monster-pic": {
        "col": 0,
        "row": 0,
    },
    'defaultHP': 5,
    'HP': 5,
};

const row = 190; //height = 190px
const col = 134; //width = 134px

const player = {
    'gold': 0,
    'level': 1,
    'damage': 1,
    'kills': 0,
};

const image = new Image();
image.src = 'images/img.png';
const character = new Image();
character.src = 'images/mainchar.png';
character.height = 150;
character.width = 150;

window.onload = function() {
    updateText();
}

function attackMonster()
{
     if(monster['HP'] > 0)
     {
         monster['HP'] -= player['damage'];
         if(monster['HP'] <= 0) {
              player['gold'] += Math.ceil(monster['defaultHP']/2);
              player['kills']++;
              monster['defaultHP'] = Math.ceil(monster['defaultHP'] * 1.2)
              monster['HP'] = monster['defaultHP'];

              monster["level"]++;
              monster["monster-pic"]["col"]++;

              if (monster["monster-pic"]["col"] == 4) {
                  monster["monster-pic"]["col"] = 0;
                  monster["monster-pic"]["row"]++;
              }
              if (monster["monster-pic"]["row"] == 3) {
                  monster["monster-pic"]["row"] = 0;
              }

              updateTitan();
         }
     }

     updateText();
}

function updateText() {
    let canvas = document.getElementById("battle");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    //monster
    context.drawImage(image,
        monster["monster-pic"]["col"] * col,
        monster["monster-pic"]["row"] * row,
        col,
        row,
        canvas.width * 3/4 - col / 2,
        canvas.height - row + 10,
        col,
        row
    );
    context.font = "30px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Level: " + monster["level"], canvas.width*3/4, 35);
    context.fillText("HP: " + monster['HP'] + "/" + monster['defaultHP'], canvas.width*3/4, 70);

    //character
    context.drawImage(character,
        canvas.width / 4 - character.width / 2,
        canvas.height - character.height - 30,
        character.width,
        character.height,
    );
    context.font = "30px Comic Sans MS";
    context.fillStyle = "blue";
    context.textAlign = "left";
    context.fillText("Gold: " + player["gold"], 20, 35);
    context.fillText("Attack Damage: " + player["damage"], 20, 70);
    context.fillText("Kills: " + player['kills'], 20, 105);
}

//Global Variables
var defaultMonsterHP = 5;
var monsterHP = 5;
var defeatedMonsterCount = 0;
var playerATK = 1;
var characterGold = 0;
var atkUpgradeCount = 0;
var atkUpgradeCost = 20;
var poisonUpgradeCount = 0;
var poisonUpgradeCost = 100;
var poisonUpgradeMultiplier = 1;
var escapeUsesCount = 3;

// Add to attackMonster() function.
         /*if(poisonUpgradeCount > 0)
         {
             var randomProc = Math.floor((Math.random() * 30) + 1);
             var randomMatch = Math.floor((Math.random() * 30) + 1);
             
             if(randomProc == randomMatch)
             {
                 monsterHP -= Math.ceil(playerATK * poisonUpgradeMultiplier);
             }    
         }
         else
         {    
              monsterHP -= playerATK;
         }    

// Upgrade ATK System - increase damage dealt per attack / max 15.
function upgradeATK()
{
    if(atkUpgradeCount <= 14)
    {
        if(characterGold >= atkUpgradeCost)
        {
            characterGold -= atkUpgradeCost;
            playerATK++;
            atkUpgradeCost = Math.ceil(atkUpgradeCost * 1.5);
            atkUpgradeCount++;
        }    
    }
}

// Upgrade Poison System - deal random extra damage per attack / max 5.
function managePoisonUpgrade()
{
     if(poisonUpgradeCount <= 4)
     {
          if(characterGold >= poisonUpgradeCost)
          {
               characterGold -= poisonUpgradeCost;
               poisonUpgradeCost = Math.ceil(poisonUpgradeCost * 2.75);
               poisonUpgradeMultiplier = Math.ceil(poisonUpgradeMultiplier * 3.2)
               poisonUpgradeCount++;
          }    
     }    
}*/
