// Constants
const RED = '#d61010';
const YELLOW = '#F2CB05';
const GREEN = '#0bd015';

// Initialization
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const closeButton = document.getElementById('closeButton');
let points = [];
let polygonCenter = null;
let dragok = false;
// Add listeners
//canvas.addEventListener('click', handleClick);
closeButton.addEventListener('click', closePolygon);
canvas.addEventListener('mouseup', myUp);
canvas.addEventListener('mousedown', handleClick);

function drawCircle(location, color, radius) {
  ctx.beginPath();
  ctx.arc(location.x, location.y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
};

function drawLine(previous, destination) {
  ctx.beginPath();
  ctx.moveTo(previous.x, previous.y);
  ctx.lineTo(destination.x, destination.y);
  ctx.lineWidth = 2;
  ctx.strokeStyle = YELLOW;
  ctx.stroke();
};

function showCloseButton() {
  closeButton.className = "show";
};

function isMouseInsidePoint(coordinates) {
  const distanceX = coordinates.x - polygonCenter.x;
  const distanceY = coordinates.y - polygonCenter.y;
  //return true if x^2 + y^2 <= radius squared.
  return (
    distanceX * distanceX + distanceY * distanceY <= 3.5 * 3.5
  );
};

// Use the polygon calculation from wikipedia
// https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
function calculateCenter() {
  let signedArea = 0;
  let centroid = {
    x: 0,
    y: 0
  };

  // For all vertices except last
  for (let i=0; i<points.length; ++i){
    const point0 = {
      x: points[i].x,
      y: points[i].y
    } 
    const point1 = {
      x: points[(i+1) % points.length].x,
      y: points[(i+1) % points.length].y
    }
    let a = point0.x*point1.y - point1.x*point0.y;
    signedArea += a;
    centroid.x += (point0.x + point1.x)*a;
    centroid.y += (point0.y + point1.y)*a;
  }

  signedArea *= 0.5;
  centroid.x /= (6.0*signedArea);
  centroid.y /= (6.0*signedArea);
  polygonCenter = centroid;
  return centroid;
};

function closePolygon() {
  drawLine(points[points.length-1], points[0]);
  const polygonCenter = calculateCenter();
  drawCircle(polygonCenter, GREEN, 3.5);
  console.log("points", points)
}

function movePolygon(event) {
  //console.log("ev my move")
  if (dragok) {
    const newCenterPoint = getMousePosition(event);
    const diffCenterX = polygonCenter.x - newCenterPoint.x;
    const diffCenterY = polygonCenter.y - newCenterPoint.y;
    //console.log("polygonCenter",polygonCenter,"pol")

    ctx.clearRect(0, 0, 1000, 1000);
    reDrawPolygon(diffCenterX, diffCenterY);
  }
}

function myUp() {
  dragok = false;
  canvas.onmousemove = null;
}

function reDrawPolygon(diffCenterX, diffCenterY) {
  //console.log("x", diffCenterX, "y", diffCenterY)
  let newPoints = [];
  for (let index = 0; index < points.length; index++) {
    console.log("index", index)
    let point = points[index];
    point.x = point.x - diffCenterX;
    point.y = point.y - diffCenterY;
  
    newPoints.push(point)
    drawCircle(point, RED, 5);
    if (index >= 1 && index < points.length) {
      const previousPoint = newPoints[newPoints.length - 2];
      drawLine(previousPoint, point);
    }
  }
  points = newPoints;

  closePolygon();
}

function getMousePosition(event) {
  const offset = canvas.getBoundingClientRect();
  // Adjust x and y with the position calculated.
  return {
    x: event.clientX - offset.left,
    y: event.clientY - offset.top
  };
}

function handleClick(event) {
  const point = getMousePosition(event);
  if (polygonCenter && isMouseInsidePoint(point)) {
    //console.log("handleClick return")
    dragok = true;
    canvas.onmousemove = movePolygon;
    return;
  }
  points.push(point);
  console.log("Detected a clik on canvas");
  //console.log("X: ", point.x, " Y: ", point.y);

  drawCircle(point, RED, 5);

  if (points.length === 2) {
    showCloseButton();
  }

  // If there are more than one point, it will draw a line between the last 2 added.
  if (points.length - 1 > 0) {
    const previousPoint = points[points.length - 2];
    drawLine(previousPoint, point);
  }
}