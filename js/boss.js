const bossMonster = {
    "level": 1,
    "bossMonster-pic": {
        "col": 0,
        "row": 0,
    },
    'defaultHP': 300,
    'HP': 300,
    'defense': 3,
    'goldDrop': 200,
};

function attackBossMonster()
{
    if (bossMonster['HP'] > 0)
    {
        let criticalRate = Math.random();
        if (criticalRate > player["critical"]["rate"]) criticalRate = 0;
        let criticalDamage = Math.random();
        if (criticalDamage > player["critical"]["damage"]) criticalDamage = 0;
        let damage = player['damage'] * (1 + criticalDamage) * (1 + criticalRate);
        bossMonster['HP'] -= damage;
        if (bossMonster['HP'] <= 0) {
            player['gold'] += bossMonster['level'] * bossMonster['goldDrop'];
            player['kills']++;
            bossesKilled++;
            bossesAvailable--;
            bossMonsterUpgrade();
            runAway();
            document.getElementById('notification').style.display = (bossesAvailable > 0) ? "block" : "none";
            document.getElementById('numOfBosses').innerHTML = bossesAvailable.toString();
        }
    }
    updateBossText();
}

//Boss Monster update
function bossMonsterUpgrade() {
    bossMonster['defaultHP'] *= 2;
    bossMonster['HP'] = bossMonster['defaultHP'];
    bossMonster['damage'] = Math.ceil(bossMonster['damage'] * 1.75);

    bossMonster["level"]++;
    bossMonster["bossMonster-pic"]["col"]++;

    if (bossMonster["bossMonster-pic"]["col"] === 4) {
        bossMonster["bossMonster-pic"]["col"] = 0;
        bossMonster["bossMonster-pic"]["row"]++;
    }
    if (bossMonster["bossMonster-pic"]["row"] === 8) {
        bossMonster["bossMonster-pic"]["row"] = 0;
    }
}

let time = 60.000;
let bossImage = new Image();
bossImage.src = 'images/bosses.png';
let stopBoss = false;

function updateBossText() {
    if (time > 0) {
        let canvas = document.getElementById("boss-field");
        let context = canvas.getContext("2d");
        context.fillRect(0, 0, canvas.width * (60 - time) / 60, 20);
        context.strokeRect(0, 0, canvas.width, 20);

        context.drawImage(bossImage, 0, 0, 100, 104, canvas.width/2 - 200, 50, 400, 400);

        context.font = "bolder 30px Comic Sans MS";
        context.textAlign = "left";
        context.fillText("HP", 10, canvas.height - 10);
        let lostHP = (canvas.width - 80) * (1 - bossMonster["HP"] / bossMonster["defaultHP"]);
        context.fillRect(70 + lostHP,canvas.height - 30,canvas.width - 80 - lostHP,20);
        context.strokeRect(70,canvas.height - 30,canvas.width - 80,20);
    } else {
        runAway();
    }
}

function runAway() {
    document.getElementById("playground").style.display = "block";
    document.getElementById("boss_field_div").style.display = "none";
    stopBoss = true;
}