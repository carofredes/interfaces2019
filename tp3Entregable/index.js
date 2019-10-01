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
    isRuning = false;
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

  function gameRuning() {
    if (isRuning) {
      if (newEnemyCopa && newEnemyCopa.isShowing()){

        newEnemyCopa.resuming();
      }
      else {
        setTimeout(function(){
          showEnemyCopa();
        },3000);
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
        },1000);
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
      clearInterval(checkCollitionsInterval);
      clearInterval(checkCollitionsIntervalFire);
      isRuning = false;
    }
  }

  function stopGame() {
    pauseGame();
    clearInterval(showEnemyInterval);
  }

  function checkCollisionsCopa() {
    checkCollitionsInterval = setInterval(checkCollision, 200);
  }

  function checkCollisionsFire() {
    checkCollitionsIntervalFire = setInterval(checkCollision, 200);
  }

  function checkCollision() {
    const domadorPosition = domador.getPosition();

    if (newEnemyCopa && newEnemyCopa.checkCollision(domadorPosition)) {
      lose();
      return;
    }
    if (newFire && newFire.checkCollision(domadorPosition)) {
      lose();
      domador.dyeUP();
    }
    if (coins && coins.checkCollision(domadorPosition)) {
      addCoin();
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
    clearInterval(checkCollitionsInterval);
    clearInterval(checkCollitionsIntervalFire);
    backgroundMusic.pause();
    setTimeout(function(){
      dyeSound.play();
    },300);
    stopGame();
    domador.dye();
    document.body.removeEventListener('keyup', keyboardPressed);
    $('#restart').show();
    isRuning=false;
  }

  function startGame() {
    $('#start').hide();
    backgroundMusic = new Audio('comp.mp3');
    backgroundMusic.addEventListener('ended', function(){
      backgroundMusic.currentTime = 0;
    });
    backgroundMusic.play();
    dyeSound = new Audio('audio/failure.mp3');
    coinSound = new Audio('audio/coin.wav');
    winSound = new Audio('audio/applause.mp3');
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
    backgroundMusic.play();
    gameRuning();
  }

  function checkWin(){
    if (coinsEarned >= 10000){
      clearInterval(checkCollitionsInterval);
      clearInterval(checkCollitionsIntervalFire);
      backgroundMusic.pause();
      winSound.play();
      stopGame();
      domador.win();
      document.body.removeEventListener('keyup', keyboardPressed);
      $('#restart').show();
      isRuning=false;
    }
  }
});