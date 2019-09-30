$( document ).ready(function() {

let isRuning = false;
let showingEnemy = false;
let checkCollitionsInterval;
let showEnemyInterval;
let newFire;
let newFire2;
let coins;
let newEnemy;
let coinsEarned = 0;

function continueWalking() {
  $('#spriteFull').removeClass('jumping').addClass('walking');
}

function jumping(){
  $('#spriteFull').addClass('jumping');
  setTimeout(continueWalking, 1700);
}

function walking(){
  isRuning = true;
  $('#spriteFull').removeClass().addClass('walking');

  
  if ($('.parallax').hasClass('stopWalking')){
    $('.parallax').removeClass('stopWalking')
  }
  if ($('.parallax').hasClass('reverseWalking')){
    $('.parallax').removeClass('reverseWalking')
  }
  $('.parallax').addClass('walking');
  gameRuning();

}

function stopWalking(){
  isRuning = false;

  $('#spriteFull').removeClass().addClass('stopWalking');

  if ($('.parallax').hasClass('walking')){
    $('.parallax').removeClass('walking')
  }
  if ($('.parallax').hasClass('reverseWalking')){
    $('.parallax').removeClass('reverseWalking')
  }
  $('.parallax').addClass('stopWalking');
  pauseGame()
}

function reverseWalking(){
  $('#spriteFull').removeClass().addClass('reverseWalking');
  if ($('.parallax').hasClass('stopWalking')){
    $('.parallax').removeClass('stopWalking')
  }
  if ($('.parallax').hasClass('walking')){
    $('.parallax').removeClass('walking')
  }
  $('.parallax').addClass('reverseWalking');
}

document.body.onkeyup = function(e){
  console.log("e.which?,", e.which)

  if(e.which == 32){
    jumping();
  }
  if(e.which == 39){
    walking();
  }
  if(e.which == 40){
    stopWalking();
  }
  if(e.which == 37){
    reverseWalking();
  }
}




function showEnemy() {
  console.log("newEemeny")
  // newEnemy = new Enemy('copa');
  // newEnemy.showEnemy();

  newFire = new Enemy('smallFireCoins1')
  newFire.showEnemy();
  newFire2 = new Enemy('smallFireCoins2')
  newFire2.showEnemy();
  coins = new Enemy('smallCoins')
  coins.showEnemy();
  checkCollisions()
}

function gameRuning() {
  console.log("runign")
  if (isRuning) {
    // if (newEnemy && newEnemy.isShowing()){
    //   newEnemy.resuming();
    // }

    if (newFire && newFire.isShowing()){
      newFire.resuming();
      newFire2.resuming();
      coins.resuming();
      checkCollitionsInterval = setInterval(checkCollision, 100);

    }
    else {
      showEnemy()
    }

  }
}

function pauseGame() {
  //newEnemy.stop()
  newFire.stop()
  newFire2.stop()
  coins.stop()
  $('.parallax').addClass('stopWalking');
  clearInterval(checkCollitionsInterval);

  isRuning = false;

}

function stopGame() {
 // newEnemy.stop()
 newFire.stop()
 newFire2.stop()
 coins.stop()
 $('.parallax').addClass('stopWalking');
  //newEnemy = null;
  newFire = null;
  newFire2 = null;
  coins = null;
  isRuning = false;
  clearInterval(showEnemyInterval);
    clearInterval(checkCollitionsInterval);
    
}


function checkCollisions() {
  checkCollitionsInterval = setInterval(checkCollision, 100);
}

function checkCollision() {
  // if (detectCollision()){
  // }
  console.log("check tipo",  $('#spriteFull' ).position().top)
  //console.log("shown", showingEnemy)
if (newEnemy) {
  const spriteFull = $('#spriteFull' ).position();
  if (newEnemy.checkCollision(spriteFull)) {
    
    lose()
  }
}
if (newFire && newFire2) {
  const spriteFull = $('#spriteFull' ).position();
  if (newFire.checkCollision(spriteFull)) {
    
    lose()
  } else {
    if (newFire.getReward() > 0) {
      coinsEarned += newFire.getReward();
    }
  }
}

  
}

function lose() {
  stopGame()
  $('#spriteFull').removeClass().addClass('dye');
  $('#spriteFull').addClass('chco');

}

  // const audio = document.getElementById('music');
  // setTimeout(function(){
  //   console.log(audio)
  //   audio.play()
  // }, 5000)
  var audio;
  

  function start() {
    
    audio = new Audio('comp.mp3');
        audio.addEventListener("ended", function(){
            audio.currentTime = 0;
       });
        audio.play();
    
        gameRuning();
}

$("#start").click(function() {
  start();
});
});