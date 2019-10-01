$( document ).ready(function() {
  // Variables
  let isRuning = false;
  let domador;
  // intervals
  let checkCollitionsInterval;
  let showEnemyInterval;
  // Enemies
  let newFire;
  let newFire2;
  let coins;
  let newEnemyCopa;
  let coinsEarned = 0;
  // Music
  let backgroundMusic;
  let dyeSound;
  let coinSound;

  // Listeners
  document.body.addEventListener('keyup', keyboardPressed);
  $('#start').click(function() {
    startGame();
  });



  function removeClassBackground(classname) {
    console.log("removeClassBackground",classname)
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
    isRuning = false;
    domador.stopWalk();
    removeClassBackground('walking');
    addClassBackground('stopWalking');
    pauseGame();
  }

  function keyboardPressed(event) {
    if (event.which == 32) {
      jumping();
    }
    if (event.which == 39) {
      walking();
    }
    if (event.which == 40) {
      stopWalking();
    }
    // if(e.which == 37){ not for now
    //   reverseWalking();
    // }
  }

  function showEnemyCopa() {
    console.log("show copa")

    newEnemyCopa = new Enemy('copa');
    newEnemyCopa.showEnemy();
    checkCollisions();
  }

  function showEnemyFire() {
    console.log("show fire")

    newFire = new Enemy('smallFireCoins1');
    newFire.showEnemy();
    newFire2 = new Enemy('smallFireCoins2');
    newFire2.showEnemy();
    coins = new Enemy('smallCoins');
    coins.showEnemy();
    checkCollisions();
  }

  function gameRuning() {
    console.log("runing")
    if (isRuning) {
      if (newEnemyCopa && newEnemyCopa.isShowing()){
        console.log("resuming copa")

        newEnemyCopa.resuming();
      }
      else {
        setTimeout(function(){
          showEnemyCopa();
        },3000000);
      }

      // It will be better if I add a function that could be reusable for this
      if (newFire && newFire.isShowing()){
        console.log("resuming fire")

        newFire.resuming();
        newFire2.resuming();
        coins.resuming();
        checkCollitionsInterval = setInterval(checkCollision, 100);
      }
      else {
        setTimeout(function(){
          showEnemyFire();
        },100000);
      }
    }
  }

  function pauseGame() {
    if (newEnemyCopa){
      newEnemyCopa.stop();
    }
    if (newFire){
      newFire.stop();
      newFire2.stop();
      coins.stop();
    }
    
    addClassBackground('stopWalking');
    clearInterval(checkCollitionsInterval);
    isRuning = false;
  }

  // could add an array with the enemies and loop through them instead of repeat
  function stopGame() {
    pauseGame();

    // cleaning enemies
    newEnemyCopa = null;
    newFire = null;
    newFire2 = null;
    coins = null;
    clearInterval(showEnemyInterval);
  }

  function checkCollisions() {
    checkCollitionsInterval = setInterval(checkCollision, 100);
  }

  function checkCollision() {
    const domadorPosition = domador.getPosition();

    if ((newEnemyCopa && newEnemyCopa.checkCollision(domadorPosition))
      || (newFire && newFire.checkCollision(domadorPosition))) {
      lose();
    } else {
      // only play this sound for fire enemy
      // if (newFire) {
      //   coinSound.play();
      //   coinsEarned += newFire.getReward();
      // }
    }
  }

  function lose() {
    backgroundMusic.pause();
    setTimeout(function(){
      dyeSound.play();
    },300);
    stopGame();
    domador.dye();
  }

  function startGame() {
    $('#start').hide();
    backgroundMusic = new Audio('comp.mp3');
    backgroundMusic.addEventListener('ended', function(){
      backgroundMusic.currentTime = 0;
    });
    //backgroundMusic.play();
    dyeSound = new Audio('audio/failure.mp3');
    coinSound = new Audio('audio/coin.wav');
    domador = new LionGuy();
    gameRuning();
  }

});