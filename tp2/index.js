// Initialization
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const closeButton = document.getElementById('closeButton');
let newPolygon = new Polygon();
let polygons = [];

let isDragging = false;
// Add listeners
closeButton.addEventListener('click', closePolygon);
canvas.addEventListener('mouseup', stopMovePolygon);
canvas.addEventListener('mousedown', handleClick);


function getMousePosition(event) {
  const offset = canvas.getBoundingClientRect();
  // Adjust x and y with the position calculated.
  return {
    x: event.clientX - offset.left,
    y: event.clientY - offset.top
  };
}
////////////////////////////////////////////////////////
function handleClick(event) {
  const point = getMousePosition(event);
  // If there is an "open" polygon, add the new point
  if (newPolygon) {
    newPolygon.addPoint(point, ctx);

    if (newPolygon.getAmountPoints() > 1) {
      showCloseButton();
    }
  }
  else {
    // IF the clicked point belongs to any polygons, redraw
    for (let pol=0; pol < polygons.length; pol++) {
      if (polygons[pol].pointBelongsToPolygon(point)){
        isDragging = true;
        canvas.addEventListener('mousemove', movePolygon);
        newPolygon = polygons[pol];
        return;
      }
    }

    // Else, create new polygon
    newPolygon = new Polygon();
    newPolygon.addPoint(point, ctx);
  }
}

function showCloseButton() {
  closeButton.className = "show";
};


function closePolygon() {
  newPolygon.closePolygon(ctx);
  polygons.push(newPolygon);
  newPolygon = null;
}

function reDrawAll() {
  if (polygons.length > 1) {
    for (let pol=0; pol < polygons.length; pol++) {
      polygons[pol].reDraw(ctx);
    }
  }
}

function movePolygon(event) {
  if (isDragging) {
    const newClickedPoint = getMousePosition(event);

    ctx.clearRect(0, 0, 1000, 1000);
    newPolygon.reDrawPolygon(ctx, newClickedPoint);
    reDrawAll();
  }
}

function stopMovePolygon() {
  if (isDragging) {
    newPolygon.stopDragging();
    newPolygon = null;
  }
  isDragging = false;
  canvas.addEventListener('mousemove', null);
}
