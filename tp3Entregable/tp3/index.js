
const possibleTransformations = [ 'scale', 'rotate', 'skew', 'translate'];

$('#randomTransformation').on('click', applyRandomTransformClass);

function hideAll() {
  $('#scale').addClass('hidden');
  $('#rotate').addClass('hidden');
  $('#skew').addClass('hidden');
  $('#translate').addClass('hidden');
}

function applyRandomTransformClass() {
  // Remove all
  $('.randomContainer').removeClass().addClass('randomContainer');
  hideAll();

  const index = Math.floor(Math.random() * 4);
  $('.randomContainer').addClass(possibleTransformations[index]);
  $('#'+possibleTransformations[index]).toggleClass('hidden');
}


