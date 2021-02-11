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
    'damage': 4,
    'speed': 2,
};

function attackBossMonster()
{
     if ((monster['level'] % 10) == 0)
     {
          if(bossMonster['HP'] > 0)
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
                   monsterUpgrade();
         }
     }

     updateText();
}

//Boss Monster update
function monsterUpgrade() {
    bossMonster['defaultHP'] *= 2;
    bossMonster['HP'] = bossMonster['defaultHP'];
    bossMonster['damage'] = Math.ceil(bossMonster['damage'] * 1.75);

    bossMonster["level"]++;
    /*monster["monster-pic"]["col"]++;

    if (monster["monster-pic"]["col"] === 4) {
        monster["monster-pic"]["col"] = 0;
        monster["monster-pic"]["row"]++;
    }
    if (monster["monster-pic"]["row"] === 3) {
        monster["monster-pic"]["row"] = 0;
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
