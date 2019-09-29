'use strict';

console.log("hola?")
$('#sprite').on('click', function(){
  $(this).toggleClass('active');
  $('#guy').toggleClass('active');
});


$('#spriteFull').on('click', function(){
  $(this).toggleClass('active');
});

function walking(){
  $('#spriteFull').removeClass().addClass('walking');

  
  if ($('.parallax').hasClass('stopWalking')){
    $('.parallax').removeClass('stopWalking')
  }
  if ($('.parallax').hasClass('reverseWalking')){
    $('.parallax').removeClass('reverseWalking')
  }
  $('.parallax').addClass('walking');
}

function stopWalking(){
  $('#spriteFull').removeClass().addClass('stopWalking');

  if ($('.parallax').hasClass('walking')){
    $('.parallax').removeClass('walking')
  }
  if ($('.parallax').hasClass('reverseWalking')){
    $('.parallax').removeClass('reverseWalking')
  }
  $('.parallax').addClass('stopWalking');
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
      //your code
      $('#spriteFull').toggleClass('jumping');
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