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
    console.log("Newpoly")
    newPolygon.addPoint(point, ctx);

    if (newPolygon.getAmountPoints() > 1) {
      showCloseButton();
    }
  }
  else {
    // IF the clicked point belongs to any polygons, redraw
    for (let pol=0; pol < polygons.length; pol++) {
      console.log("for", polygons[pol])

      if (polygons[pol].isMouseInsidePoint(point)){
        console.log("isMouseInsidePoint")

        isDragging = true;
        canvas.addEventListener('mousemove', movePolygon);
        newPolygon = polygons[pol];
        return;
      }
    }
    console.log("new oneee")

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
    const newCenterPoint = getMousePosition(event);
    const diffCenterX = newPolygon.getCenter().x - newCenterPoint.x;
    const diffCenterY = newPolygon.getCenter().y - newCenterPoint.y;
    //console.log("polygonCenter",polygonCenter,"pol")

    ctx.clearRect(0, 0, 1000, 1000);
    newPolygon.reDrawPolygon(ctx, diffCenterX, diffCenterY);
    reDrawAll();
  }
}

function stopMovePolygon() {
  if (isDragging) {
    newPolygon = null;
  }
  isDragging = false;
  canvas.addEventListener('mousemove', null);
}
