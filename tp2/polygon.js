class Polygon {
  constructor() {
    this.points = [];
    this.pointsLength = 0;
    this.centroID = {};
    this.draggingFromPoint = null;
    this.draggingFromCenter = false;
    this.indexToRemove = null;
    this.lineColor = 'hsl(50,96%,48%)'; //Yellow
    this.pointColor = 'hsl(0,86%,48%)'; //Red
    this.centerColor = 'hsl(123,90%,48%)'; //Green
  }

  setColors(newLineC, newPointC, newCenterC) {
    this.lineColor = newLineC;
    this.pointColor = newPointC;
    this.centerColor = newCenterC;
  }

  getAmountPoints() {
    return this.pointsLength;
  }

  getCenter() {
    return this.centroID;
  }

  // Use the polygon calculation from wikipedia
  // https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
  calculateCenter() {
    let signedArea = 0;
    let centroid = {
      x: 0,
      y: 0
    };

    // For all vertices except last
    for (let i=0; i<this.pointsLength; ++i){
      const point0 = {
        x: this.points[i].x,
        y: this.points[i].y
      } 
      const point1 = {
        x: this.points[(i+1) % this.pointsLength].x,
        y: this.points[(i+1) % this.pointsLength].y
      }
      let a = point0.x*point1.y - point1.x*point0.y;
      signedArea += a;
      centroid.x += (point0.x + point1.x)*a;
      centroid.y += (point0.y + point1.y)*a;
    }

    signedArea *= 0.5;
    centroid.x /= (6.0*signedArea);
    centroid.y /= (6.0*signedArea);
    this.centroID = centroid;
  
    return centroid;
  };

  drawLine(ctx, previous, destination) {
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(destination.x, destination.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.lineColor;
    ctx.stroke();
  };

  drawCircle(ctx, location, color, radius) {
    ctx.beginPath();
    ctx.arc(location.x, location.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  };

  drawLines(ctx) {
    for (let index = 1; index < this.pointsLength; index++) {
      const previousPoint = this.points[index - 1];
      const point = this.points[index];
      this.drawLine(ctx, previousPoint, point);
    }
  }

  reDrawPoint(ctx, newClickedPoint) {
    let changedPoint = this.points[this.draggingFromPoint.index];
    const diffCenterX = changedPoint.x - newClickedPoint.x;
    const diffCenterY = changedPoint.y - newClickedPoint.y;
     
    changedPoint.x = changedPoint.x - diffCenterX;
    changedPoint.y = changedPoint.y - diffCenterY;
    this.points[this.draggingFromPoint.index] = changedPoint;
    this.reDraw(ctx);
  }

  closePolygon(ctx) {
    this.drawLine(ctx, this.points[this.pointsLength-1], this.points[0]);
    const polygonCenter = this.calculateCenter();
    this.drawCircle(ctx, polygonCenter, this.centerColor, 3.5);
  }

  pointBelongsToPolygon(pointToCompare) {
    // Check with center
    const isInsideCenter = this.isMouseInsidePoint(this.centroID, pointToCompare, 3.5);

    if (isInsideCenter){
      this.draggingFromCenter = true;
      return true;
    }

    // Check with other points
    for (let i=0; i<this.pointsLength; ++i) {
      let isSamePoint = this.isMouseInsidePoint(this.points[i], pointToCompare, 5);
      if (isSamePoint) {
        this.draggingFromPoint = {
          "isMoving": true,
          "index": i
        };
        return true;
      }
    }

    return false;
  }

  findPointInPolygon(pointToCompare) {
    for (let i=0; i<this.pointsLength; ++i) {
      let isSamePoint = this.isMouseInsidePoint(this.points[i], pointToCompare, 5);
      if (isSamePoint) {
        this.indexToRemove = i;
        return true;
      }
    }
    return false;
  }

  isMouseInsidePoint(actualPoint, pointToCompare, radius) {
    const distanceX = actualPoint.x - pointToCompare.x;
    const distanceY = actualPoint.y - pointToCompare.y;
    //return true if x^2 + y^2 <= radius squared.
    return (
      distanceX * distanceX + distanceY * distanceY <= radius * radius
    );
  }

  reDrawPolygon(ctx, newClickedPoint) {
    if (this.draggingFromPoint) {
      this.reDrawPoint(ctx, newClickedPoint)
    }
    else if (this.draggingFromCenter) {
      const diffCenterX = this.centroID.x - newClickedPoint.x;
      const diffCenterY = this.centroID.y - newClickedPoint.y;
      let newPoints = [];
      for (let index = 0; index < this.pointsLength; index++) {
        let point = this.points[index];
        point.x = point.x - diffCenterX;
        point.y = point.y - diffCenterY;
      
        newPoints.push(point)
        this.drawCircle(ctx, point, this.pointColor, 5);
      }
      this.points = newPoints;
  
      this.drawLines(ctx);
      this.closePolygon(ctx);
    }
  }

  addPoint(newPoint, ctx) {
    this.points.push(newPoint);
    this.pointsLength++;
    console.log("Detected a clik on canvas");
    console.log("X: ", newPoint.x, " Y: ", newPoint.y);
  
    this.drawCircle(ctx, newPoint, this.pointColor, 5);
  
    // If there are more than one point, it will draw a line between the last 2 added.
    if (this.pointsLength - 1 > 0) {
      const previousPoint = this.points[this.pointsLength - 2];
      this.drawLine(ctx, previousPoint, newPoint);
    }
  }

  stopDragging() {
    this.draggingFromPoint = null;
    this.draggingFromCenter = false;
  }

  reDraw(ctx) {
    for (let index = 0; index < this.pointsLength; index++) {
      this.drawCircle(ctx, this.points[index], this.pointColor, 5);
      if (index - 1 >= 0) {
        const previousPoint = this.points[index - 1];
        this.drawLine(ctx, previousPoint, this.points[index]);
      }
    }
    this.closePolygon(ctx);

    this.drawCircle(ctx, this.centroID, this.centerColor, 3.5);
  }

  deletePoint() {
    this.points.splice(this.indexToRemove, 1);
    this.pointsLength--;
    this.indexToRemove = null;
  }
}