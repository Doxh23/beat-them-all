function Person(race, item,name) {
  this.race = race;
  this.item = item;
  this.name = name
  this.currenthealth = 100;
  this.maxHealth = 100;
  this.min = 3;
  this.maxDamage = 20;
  this.maxHealing = 30;
  if (this.race === "orc") {
    this.maxHealth = this.maxHealth * 1.4;
  }

  this.heal = function () {
    let random = Math.floor(
      Math.random() * (this.maxHealing - this.min) + this.min
    );
    if (this.item === "Staff") {
      random = random * 1.2;
    }
    return random;
  };

  this.damage = function () {
    let random = Math.floor(
      Math.random() * (this.maxDamage - this.min) + this.min
    );
    let percent = Math.floor(Math.random() * 100);
    if (this.item === "Sword") {
      random = random * 1.3;
    }
    if (this.item === "Bow" && percent <= 30) {
      random = random * 2;
      console.log("double degat " + random);
    }
    return random;
  };

  this.totalDamage = this.damage();

  this.displayChar = function () {
    return console.log(
      `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`
    );
  };
}

let p1 = new Person("orc", "Bow");
let p2 = new Person("orc", "bow");
