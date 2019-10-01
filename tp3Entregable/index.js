const interval = {
  // to keep a reference to all the intervals
  intervals : new Set(),

  // create another interval
  make(...args) {
    const newInterval = setInterval(...args);
    this.intervals.add(newInterval);
    return newInterval;
  },

  // clear a single interval
  clear(id) {
    this.intervals.delete(id);
    return clearInterval(id);
  },

  // clear all intervals
  clearAll() {
    for (let id of this.intervals) {
        this.clear(id);
    }
  }
};
$( document ).ready(function() {
  // Variables
  let isRuning = false;
  let domador;
  // intervals
  let checkCollitionsInterval;
  let checkCollitionsIntervalFire;
  let showEnemyInterval;
  // Enemies
  let newFire;
  let newFire2;
  let coins;
  let newEnemyCopa;
  let coinsEarned = 0000;
  // Music
  let backgroundMusic;
  let dyeSound;
  let coinSound;
  let winSound;

  // Listeners
  $('#start').click(function() {
    document.body.addEventListener('keyup', keyboardPressed);

    startGame();
  });

  $('#restart').click(restartGame);



  function removeClassBackground(classname) {
    if ($('.parallax').hasClass(classname)) {
      $('.parallax').removeClass(classname);
    }
  }

  function addClassBackground(classname) {
    $('.parallax').addClass(classname);
  }

  function jumping() {
    domador.jump();
  }

  function walking() {
    isRuning = true;
    domador.walk();
    removeClassBackground('stopWalking');
    addClassBackground('walking');
    gameRuning();
  }

  function stopWalking(){
    domador.stopWalk();
    removeClassBackground('walking');
    addClassBackground('stopWalking');
    pauseGame();
  }

  function keyboardPressed(event) {
    // w
    if (event.which == 87) {
      jumping();
    }
    // d
    if (event.which == 68) {
      walking();
    }
    // s
    if (event.which == 83) {
      stopWalking();
    }
    // if(e.which == 37){ not for now
    //   reverseWalking();
    // }
  }

  function showEnemyCopa() {
    newEnemyCopa = new Enemy('copa');
    newEnemyCopa.showEnemy();
    checkCollisionsCopa();
  }

  function showEnemyFire() {
    newFire = new Enemy('smallFireCoins1');
    newFire.showEnemy();
    newFire2 = new Enemy('smallFireCoins2');
    newFire2.showEnemy();
    coins = new Enemy('smallCoins',500);
    coins.showEnemy();
    checkCollisionsFire();
  }

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function gameRuning() {
    if (isRuning) {
      if (newEnemyCopa && newEnemyCopa.isShowing()){

        newEnemyCopa.resuming();
      }
      else {
        setTimeout(function(){
          showEnemyCopa();
        }, randomIntFromInterval(4000, 7000));
      }

      // It will be better if I add a function that could be reusable for this
      if (newFire && newFire.isShowing()){

        newFire.resuming();
        newFire2.resuming();
        coins.resuming();
      }
      else {
        setTimeout(function(){
          showEnemyFire();
        }, randomIntFromInterval(3000, 6000));
      }
    }
  }

  function pauseGame() {
    if (isRuning) {

      if (newEnemyCopa){
        newEnemyCopa.stop();
      }
      if (newFire){
        newFire.stop();
        newFire2.stop();
        coins.stop();
      }
      
      addClassBackground('stopWalking');
      isRuning = false;
    }
  }

  function stopGame() {
    interval.clearAll()

    pauseGame();
  }

  function checkCollisionsCopa() {
    interval.make(checkCollision, 200);
  }

  function checkCollisionsFire() {
    interval.make(checkCollision, 200);
  }

  function checkCollision() {
    const domadorPosition = domador.getPosition();
    if (isRuning) {
      if (newEnemyCopa && newEnemyCopa.checkCollision(domadorPosition)) {
        lose();
        return;
      }
      if (newFire && newFire.checkCollision(domadorPosition)) {
        lose();
        domador.dyeUP();
      } else {
        if (coins && coins.checkCollision(domadorPosition)) {
          addCoin();
        }
      }
    }
  }

  function addCoin(){
    const cointsToAdd = coins.getReward();
    coinSound.play();
    coinsEarned = coinsEarned + cointsToAdd;
    $('#coins').text(coinsEarned);
    $('#smallCoins').css("visibility", "hidden");
    $('#coinsText').css("visibility", "visible");
    setTimeout(function(){
      $('#smallCoins').css("visibility", "visible");
      $('#coinsText').css("visibility", "hidden");
    },1500);
    checkWin();
  }

  function lose() {
    document.body.removeEventListener('keyup', keyboardPressed);
    backgroundMusic.pause();
    setTimeout(function(){
      dyeSound.play();
    },300);
    stopGame();
    domador.dye();
    setTimeout(function(){
      $('#restart').show();
    },4000)
  }

  function startGame() {
    $('#start').hide();
    backgroundMusic = new Audio('comp.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play();
    dyeSound = new Audio('audio/failure.mp3');
    coinSound = new Audio('audio/coin.wav');
    winSound = new Audio('audio/applause.mp3');
    winSound.loop = true;
    domador = new LionGuy();
    gameRuning();
  }

  // could add an array with the enemies and loop through them instead of repeat
  function restartGame() {
    $('#restart').hide();
    newEnemyCopa.hideEnemy();
    newFire.hideEnemy();
    newFire2.hideEnemy();
    coins.hideEnemy();
    // cleaning enemies
    newEnemyCopa = null;
    newFire = null;
    newFire2 = null;
    coins = null;
    domador.stopWalk();
    coinsEarned = 00000;
    $('#coins').text('0000');
    document.body.addEventListener('keyup', keyboardPressed);
    winSound.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    gameRuning();
  }

  function checkWin(){
    if (coinsEarned >= 10000){
      backgroundMusic.pause();
      winSound.play();
      stopGame();
      domador.win();
      document.body.removeEventListener('keyup', keyboardPressed);
      setTimeout(function(){
        $('#restart').show();
      },4000)
      isRuning=false;
    }
  }
});