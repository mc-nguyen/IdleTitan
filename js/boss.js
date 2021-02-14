const bossMonster = {
    "level": 1,
    "bossMonster-pic": {
        "col": 0,
        "row": 0,
    },
    'defaultHP': 1000,
    'HP': 1000,
    'defense': 3,
    'goldDrop': 200,
    'damage': 1,
    'speed': 2,
};

function attackBossMonster()
{
     if (monster['level'] % 10 === 0)
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
                  bossMonsterUpgrade();
              }
         }
     }
}

//Boss Monster update
function bossMonsterUpgrade() {
    bossMonster['defaultHP'] *= 2;
    bossMonster['HP'] = bossMonster['defaultHP'];
    bossMonster['damage'] = Math.ceil(bossMonster['damage'] * 1.75);

    bossMonster["level"]++;
    /*bossMonster["monster-pic"]["col"]++;

    if (bossMonster["monster-pic"]["col"] === 4) {
        bossMonster["monster-pic"]["col"] = 0;
        bossMonster["monster-pic"]["row"]++;
    }
    if (bossMonster["monster-pic"]["row"] === 3) {
        bossMonster["monster-pic"]["row"] = 0;
    }*/
}

window.setInterval(function bossMonsterAttack() {
    if (player['HP'] > 0) {
        player["HP"] -= bossMonster["damage"];
        if (player["HP"] <= 0) {
            monster['level']--;
            monster['defaultHP'] = Math.ceil(monster['defaultHP'] / 1.2);
            monster['HP'] = monster['defaultHP'];
            monster["damage"]--;
            player['HP'] = player['defaultHP'];

            /*monster["monster-pic"]["col"]--;
            if (monster['monster-pic']['col'] < 0) {
                monster["monster-pic"]["col"] = 3;
                monster["monster-pic"]["row"]--;
            }
            if (monster["monster-pic"]["row"] < 0) {
                monster["monster-pic"]["row"] = 2;
            }*/
        }
    }
    updateText();
}, bossMonster["speed"] * (1 + Math.random()) * 1000);

let time = 60.000;
let bossImage = new Image();
bossImage.src = 'images/bosses.png';

function updateBossText() {
    if (time > 0) {
        let canvas = document.getElementById("boss-field");
        let context = canvas.getContext("2d");
        context.fillRect(0, 0, canvas.width * (60 - time) / 60, 20);
        context.strokeRect(0, 0, canvas.width, 20);

        context.drawImage(bossImage, 0, 0, 100, 104, canvas.width/2 - 300, 50, 600, 600);

        context.font = "bolder 50px Comic Sans MS";
        context.textAlign = "left";
        context.fillText("HP", 10, canvas.height - 10);
        lostHP = (canvas.width/2 - 40) * (1 - bossMonster["HP"] / bossMonster["defaultHP"]);
        context.fillRect(100 + lostHP,canvas.height - 60,canvas.width - 120 - lostHP,50);
        context.strokeRect(100,canvas.height - 60,canvas.width - 120,50);
    } else {
        document.getElementById("playground").style.display = "block";
        document.getElementById("boss-field").style.display = "none";
    }
}