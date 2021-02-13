const monster = {
    "level": 1,
    "monster-pic": {
        "col": 0,
        "row": 0,
    },
    'defaultHP': 5,
    'HP': 5,
    'defense': 1,
    'goldDrop': 1,
    'damage': 0,
    'speed': 2,
};

const row = 190; //height = 190px
const col = 134; //width = 134px

const player = {
    'gold': 0,
    'defaultHP': 15,
    'HP': 15,
    'damage': 1,
    'kills': 0,
    'critical': {
        'damage': .00,
        'rate': .00,
    },
    'passive': {
        'damage': 0,
        'cooldown': 5,
    },
};
const upgradeCost = {
    'damage': 20,
    'HP': 20,
    'defense': 20,
    'criticalRate': 20,
    'criticalDamage': 20,
    'passiveDamage': 20,
    'passiveCooldown': 20,
    'goldDrop': 50,
}

const image = new Image();
image.src = 'images/img.png';
const character = new Image();
character.src = 'images/mainchar.png';
character.height = 150;
character.width = 150;
const battleImage = new Image();
battleImage.src = 'images/battle.png';
battleImage.height = 300;
battleImage.width = 600;

window.onload = function() {
    updateText();
}

function attackMonster()
{
     if(monster['HP'] > 0)
     {
         let damage = player['damage'] * (1 + player["critical"]["rate"]) * (1 + player["critical"]["damage"]);
         monster['HP'] -= damage;
         if (monster['HP'] <= 0) {
              player['gold'] += monster['level'] * monster['goldDrop'];
              player['kills']++;
              monsterUpgrade();
         }
     }

     updateText();
}

//upgrades
function increaseDamage() {
    if(player["gold"] >= upgradeCost["damage"])
    {
        player["gold"] -= upgradeCost["damage"];
        player["damage"]++;
        upgradeCost["damage"] = Math.ceil(upgradeCost["damage"] * 1.25);
        updateText();
    }
}
function increaseHP() {
    if(player["gold"] >= upgradeCost["HP"])
    {
        player["gold"] -= upgradeCost["HP"];
        player["defaultHP"] += 10;
        player["HP"] = player["defaultHP"];
        upgradeCost["HP"] = Math.ceil(upgradeCost["HP"] * 1.25);
    }
    updateText();
}
function increaseDefense() {
    if(player["gold"] >= upgradeCost["defense"])
    {
        player["gold"] -= upgradeCost["defense"];
        player["defense"]++;
        upgradeCost["defense"] = Math.ceil(upgradeCost["defense"] * 1.25);
    }
    updateText();
}

function criticalRateIncrease() {
    if(player["gold"] >= upgradeCost["criticalRate"]) {
        player["gold"] -= upgradeCost["criticalRate"];
        player["criticalRate"]+=.1;
        upgradeCost["criticalRate"] = Math.ceil(upgradeCost["criticalRate"] * 1.5);
    }
    updateText();
}

function criticalDamageIncrease() {
    if(player["gold"] >= upgradeCost["criticalDamage"]) {
        player["gold"] -= upgradeCost["criticalDamage"];
        player["criticalDamage"]+=.1;
        upgradeCost["criticalDamage"] = Math.ceil(upgradeCost["criticalDamage"] * 1.5);
    }
    updateText();
}

function passiveSkillsDamage() {
    if(player["gold"] >= upgradeCost["passiveDamage"]) {
        player["gold"] -= upgradeCost["passiveDamage"];
        player["passive"]["damage"]++;
        upgradeCost["passiveDamage"] = Math.ceil(upgradeCost["passiveDamage"] * 1.5);
    }
    updateText();
}

function passiveSkillsCooldown() {
    if (player["passive"]["cooldown"] > 0.1)
        if(player["gold"] >= upgradeCost["passiveCooldown"]) {
            player["gold"] -= upgradeCost["passiveCooldown"];
            player["passiveCooldown"] -= .1;
            upgradeCost["passiveCooldown"] = Math.ceil(upgradeCost["passiveCooldown"] * 1.5);
        }
    updateText();
}

function increaseGoldDrop() {
    if(player["gold"] >= upgradeCost["goldDrop"]) {
        player["gold"] -= upgradeCost["goldDrop"];
        monster["goldDrop"]++;
        upgradeCost["goldDrop"] = Math.ceil(upgradeCost["goldDrop"] * 1.5);
    }
    updateText();
}

function updateText() {
    let canvas = document.getElementById("battle");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(battleImage,
        0,
        0,
        canvas.width,
        canvas.height
    );

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
    context.textAlign = "right";
    context.fillText("Level " + monster["level"], canvas.width - 10, 35);

    //HP monster
    context.font = "bolder 12px Comic Sans MS";
    context.fillStyle = "pink";
    context.textAlign = "left";
    context.fillText("HP", canvas.width/2 + 10, canvas.height - 10);
    let lostHP = (canvas.width/2 - 40) * (1 - monster["HP"] / monster["defaultHP"]);
    context.fillRect(canvas.width/2 + 30 + lostHP,canvas.height - 25,canvas.width/2 - 40 - lostHP,20);
    context.strokeRect(canvas.width/2 + 30,canvas.height - 25,canvas.width/2 - 40,20);

    //Boss monster
    context.drawImage(image,
        bossMonster["bossMonster-pic"]["col"] * col,
        bossMonster["bossMonster-pic"]["row"] * row,
        col,
        row,
        canvas.width * 3/4 - col / 2,
        canvas.height - row + 10,
        col,
        row
    );
    context.font = "30px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "right";
    context.fillText("Level " + bossMonster["level"], canvas.width - 10, 35);
    
    //Boss monster HP
    context.font = "bolder 12px Comic Sans MS";
    context.fillStyle = "pink";
    context.textAlign = "left";
    context.fillText("HP", canvas.width/2 + 10, canvas.height - 10);
    let lostHP = (canvas.width/2 - 40) * (1 - bossMonster["HP"] / bossMonster["defaultHP"]);
    context.fillRect(canvas.width/2 + 30 + lostHP,canvas.height - 25,canvas.width/2 - 40 - lostHP,20);
    context.strokeRect(canvas.width/2 + 30,canvas.height - 25,canvas.width/2 - 40,20);
    
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
    context.fillText("Gold: " + player["gold"], 10, 35);
    context.fillText("Kills: " + player['kills'], 10, 70);

    //HP character
    context.font = "bolder 12px Comic Sans MS";
    context.fillStyle = "yellow";
    context.textAlign = "left";
    context.fillText("HP", 10, canvas.height - 10);
    lostHP = (canvas.width/2 - 40) * (1 - player["HP"] / player["defaultHP"]);
    context.fillRect(30 + lostHP,canvas.height - 25,canvas.width/2 - 40 - lostHP,20);
    context.strokeRect(30,canvas.height - 25,canvas.width/2 - 40,20);

    //upgrade
    document.getElementById("damage").innerHTML = upgradeCost["damage"];
    document.getElementById("hp").innerHTML = upgradeCost["HP"];
    document.getElementById("defense").innerHTML = upgradeCost["defense"];
    document.getElementById("criticalRate").innerHTML = upgradeCost["criticalRate"];
    document.getElementById("criticalDamage").innerHTML = upgradeCost["criticalDamage"];
    document.getElementById("passiveDamage").innerHTML = upgradeCost["passiveDamage"];
    document.getElementById("passiveCooldown").innerHTML = upgradeCost["passiveCooldown"];
    document.getElementById("goldDrop").innerHTML = upgradeCost["goldDrop"];
}

window.setInterval(function() {
    let upgrades = 5;
    let skills = 3;
    if (player["gold"] < upgradeCost["damage"]) {
        document.getElementById("damageBtn").style.display = "none";
        upgrades--;
    } else document.getElementById("damageBtn").style.display = "block";

    if (player["gold"] < upgradeCost["HP"]) {
        document.getElementById("hpBtn").style.display = "none";
        upgrades--;
    } else document.getElementById("hpBtn").style.display = "block";

    if (player["gold"] < upgradeCost["defense"]) {
        document.getElementById("defenseBtn").style.display = "none";
        upgrades--;
    } else document.getElementById("defenseBtn").style.display = "block";

    if (player["gold"] < upgradeCost["criticalRate"]) {
        document.getElementById("crBtn").style.display = "none";
        upgrades--;
    } else document.getElementById("crBtn").style.display = "block";

    if (player["gold"] < upgradeCost["criticalDamage"]) {
        document.getElementById("cdBtn").style.display = "none";
        upgrades--;
    } else document.getElementById("cdBtn").style.display = "block";

    if (upgrades === 0) document.getElementById("upgrade").style.display = "none";
    else document.getElementById("upgrade").style.display = "block";

    if (player["gold"] < upgradeCost["passiveDamage"]) {
        document.getElementById("pdBtn").style.display = "none";
        skills--;
    } else document.getElementById("pdBtn").style.display = "block";

    if (player["gold"] < upgradeCost["passiveCooldown"]) {
        document.getElementById("pcBtn").style.display = "none";
        skills--;
    } else document.getElementById("pcBtn").style.display = "block";

    if (player["gold"] < upgradeCost["goldDrop"]) {
        document.getElementById("goldBtn").style.display = "none";
        skills--;
    } else document.getElementById("goldBtn").style.display = "block";

    if (skills === 0) document.getElementById("skills").style.display = "none";
    else document.getElementById("skills").style.display = "block";

    if (upgrades === 0 && skills === 0) document.getElementById("upgradeArea").style.display = "none";
    else document.getElementById("upgradeArea").style.display = "block";

    updateText();
}, 1)

//monster update
function monsterUpgrade() {
    monster['defaultHP'] = Math.ceil(monster['defaultHP'] * 1.2);
    monster['HP'] = monster['defaultHP'];
    monster["damage"] = Math.floor(monster["level"] / 5);

    monster["level"]++;
    monster["monster-pic"]["col"]++;

    if (monster["monster-pic"]["col"] === 4) {
        monster["monster-pic"]["col"] = 0;
        monster["monster-pic"]["row"]++;
    }
    if (monster["monster-pic"]["row"] === 3) {
        monster["monster-pic"]["row"] = 0;
    }
}

window.setInterval(function passiveAttack() {
    if(monster['HP'] > 0)
    {
        monster['HP'] -= player['passive']["damage"];
        if(monster['HP'] <= 0) {
            player['gold'] += monster['level'] * monster['goldDrop'];
            player['kills']++;
            monsterUpgrade();
            updateText();
        }
    }

    updateText();
}, player["passive"]["cooldown"] * 1000);

window.setInterval(function monsterAttack() {
    if (player['HP'] > 0) {
        player["HP"] -= monster["damage"];
        if (player["HP"] <= 0) {
            monster['level']--;
            monster['defaultHP'] = Math.ceil(monster['defaultHP'] / 1.2);
            monster['HP'] = monster['defaultHP'];
            monster["damage"]--;
            player['HP'] = player['defaultHP'];

            monster["monster-pic"]["col"]--;
            if (monster['monster-pic']['col'] < 0) {
                monster["monster-pic"]["col"] = 3;
                monster["monster-pic"]["row"]--;
            }
            if (monster["monster-pic"]["row"] < 0) {
                monster["monster-pic"]["row"] = 2;
            }
        }
    }
    updateText();
}, monster["speed"] * 1000);
