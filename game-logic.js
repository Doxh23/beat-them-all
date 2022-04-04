const lifebar = document.querySelectorAll(".bar");
const dmg = document.querySelectorAll(".dmg");
const heal = document.querySelectorAll(".heal");
const yield = document.querySelectorAll(".yield");
let player1 = "";
let player2 = "";
const playerBox = document.querySelector('.box-player')
const name1 = document.querySelector(".name1");
const name2 = document.querySelector(".name2");
let player = [];
const race1 = document.querySelector(".race1");
const race2 = document.querySelector(".race2");

const item1 = document.querySelector(".item1");
const item2 = document.querySelector(".item2");

const submit1 = document.querySelector(".submit1");
const submit2 = document.querySelector(".submit2");

const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");

const nom1 = document.querySelector(".nom1");
const nom2 = document.querySelector(".nom2");

const perso1 = document.querySelector(".perso1");
const perso2 = document.querySelector(".perso2");

const arme1 = document.querySelector(".arme1");
const arme2 = document.querySelector(".arme2");

const log = document.querySelector('.log')
const logName = document.querySelector('.log-name')
const logAction = document.querySelector('.log-action')
let playerturn = 0;
let def = 0;

console.log(submit1.style);
function makeLog(message,name){
  const temp = document.getElementsByTagName("template")[0];
  let clone = temp.content.cloneNode(true);
  clone.querySelector('h4').innerHTML = ` ${name}`
  clone.querySelector("p").innerHTML = `   ${message}`
  log.appendChild(clone);
}
submit1.addEventListener("click", function () {
  let race = race1.value;
  let item = item1.value;
  let name = name1.value;
  console.log(race);
  if (name !== "") {
    
    modal1.classList.toggle('hidden')
    modal2.classList.remove('hidden')
    player1 = new Person(race, item,name);
    nom1.innerHTML = name;
    perso1.innerHTML = race;
    arme1.innerHTML = item;
  } else {
    alert("pls fill all blank");
  }
});
submit2.addEventListener("click", function () {
  let race = race2.value;
  let item = item2.value;
  let name = name2.value;
  if (name !== "" && race !== "" && item !== ""  && name !== "") {
    modal2.classList.toggle('hidden')
    log.classList.remove('hidden')
    playerBox.classList.remove('hidden')
    let player2 = new Person(race, item,name);
    player = [player1, player2];
    nom2.innerHTML = name;
    perso2.innerHTML = race;
    arme2.innerHTML = item;
    console.log(player);
  } else {
    alert("pls fill all blank");
  }
});
function messageLog(damage,name){
  console.log(damage)
  switch (true) {
    case (damage>= 14):
      return ` :nice one , you have done ${Math.floor(damage)} to ${name}`
    case (damage < 14 && damage >= 10):
      return ` :good job, you have done ${Math.floor(damage)} to ${name}`
    case (damage < 10):
      return ` :unlucky , you have done ${Math.floor(damage)} to ${name}`
    default:
      return 'hello';
  }
}
function percent() {
  return(Math.floor(Math.random() * 10));
}
function makedamage(take, make) {
  let damage = player[make].damage();
  if (player[take].race === "Human") {
    damage = Math.floor(damage * 0.8);
  }
  if (player[take].items === "Boots" && percent() <= 3) {
  } else {
    if (player[take].race === "Elve" && percent() <= 3) {
      player[make].currenthealth = Math.floor(
        player[make].currenthealth - damage / 2
      );
      makeLog("reverse his attack",player[take].name)
    } else {
      if (def === 1) {
        player[take].currenthealth = Math.floor(
          player[take].currenthealth - damage / 2
        );
        console.log(take);
      } else {
        player[take].currenthealth = Math.floor(
          player[take].currenthealth - damage
        );
        console.log(take); // check si la defense ne bug pas
      }
    }
    if (player[take].currenthealth <= 0) {
      player[take].currenthealth = 0;
    }
    if (player[take].currenthealth <= damage) {
      player[take].currenthealth = 0;
    }
    if (player[make].currenthealth <= 0) {
      player[make].currenthealth = 0;
    }
    if (player[make].currenthealth <= damage) {
      player[make].currenthealth = 0;
    }
    if (player[make].race === "Vampire") {
      player[make].currenthealth = player[make].currenthealth + damage * 0.1;
      makeLog("stole blood from his opponent",player[make].name)
    }
    lifebar[take].style.width = `${player[take].currenthealth}%`;
    lifebar[make].style.width = `${player[make].currenthealth}%`;
  }
  document.querySelector(`.player${make+1}`).style.backgroundColor = "#39353580"
  document.querySelector(`.player${take+1}`).style.backgroundColor = "#393535cc"

  let message = messageLog(damage,player[make].name)
  console.log(message)
  makeLog(message,player[make].name)
  playerturn = take;
  def = 0;
}

function makeheal(make,p2) {
  if (player[make].currenthealth !== 100) {
    player[make].currenthealth = Math.floor(
      player[make].currenthealth + player[make].heal()
    );
    if (player[make].currenthealth >= 100) {
      player[make].currenthealth = 100;
    }

    if (player[make].currenthealth <= player[make].heal()) {
      player[make].currenthealth = 0;
    }
    lifebar[make].style.width = `${player[make].currenthealth}%`;
    playerturn = p2;
    makeLog(`heal himself`,player[make].name)
    document.querySelector(`.player${make+1}`).style.backgroundColor = "#39353580"
document.querySelector(`.player${p2+1}`).style.backgroundColor = "#393535cc"

  }
}

yield.forEach((el, index) => {
  el.addEventListener("click", function () {
    if (playerturn === 0 && index === 0) {
      document.querySelector(`.player1`).style.backgroundColor = "#39353580"
      document.querySelector(`.player2`).style.backgroundColor = "#393535cc"
      
      def = 1;
      playerturn = 1;
    } else if (playerturn === 1 && index === 1) {
      document.querySelector(`.player2`).style.backgroundColor = "#39353580"
      document.querySelector(`.player1`).style.backgroundColor = "#393535cc"
      
      def = 1;
      playerturn = 0;
    }
  });
});

dmg.forEach((el, index) => {
  el.addEventListener("click", function () {
    if (playerturn === 0 && index === 0) {
      makedamage(1, index);
      console.log(player[1].currenthealth);
    } else if (playerturn === 1 && index === 1) {
      makedamage(0, index);
    }
  });
});
heal.forEach((el, index) => {
  el.addEventListener("click", function () {
    if (playerturn === 0 && index === 0) {
      makeheal(index, 1);
    } else if (playerturn === 1 && index === 1) {
      makeheal(index, 0);
    }
  });
});
