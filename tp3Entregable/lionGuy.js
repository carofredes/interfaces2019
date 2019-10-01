class LionGuy {
  constructor() {
    this.idGuy = 'spriteFull';
    this.jumpSound = new Audio('audio/jump.wav');
    this.dyingSound = new Audio('audio/dying.wav');

  }

  continueWalking() {
    $(`#${this.idGuy}`).removeClass('jumping').addClass('walking');
  }

  jump() {
    $(`#${this.idGuy}`).addClass('jumping');
    setTimeout(this.continueWalking.bind(this), 1700);
    this.jumpSound.play();
  }

  walk() {
    $(`#${this.idGuy}`).removeClass().addClass('walking');
  }

  stopWalk() {
    $(`#${this.idGuy}`).removeClass().addClass('stopWalking');
  }

  getPosition() {
    return $(`#${this.idGuy}`).position();
  }

  dye() {
    this.dyingSound.play();
    $(`#${this.idGuy}`).removeClass().addClass('dye');
    $(`#${this.idGuy}`).addClass('chco');
  }
}