var ctx;
var canvas;

function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d')
  
  var v1 = new Vector3([2.25, 2.25, 0.0]);;

  // Draw a black rectangle
  ctx.fillStyle = 'black'; 
  ctx.fillRect(0, 0, 400, 400);

  drawVector(v1, "red");
}

function drawVector (v, color) {
  ctx.beginPath();
  ctx.moveTo(200, 200);
  ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20); 
  ctx.strokeStyle = color;
  ctx.stroke();
}

function handleDrawEvent() {
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  //v1
  var x = parseFloat(document.getElementById("xInput").value);
  var y = parseFloat(document.getElementById("yInput").value);
  var v1 = new Vector3([x, y, 0]);
  drawVector(v1, "red");

  //v2
  var x2 = parseFloat(document.getElementById("xInput2").value);
  var y2 = parseFloat(document.getElementById("yInput2").value);
  var v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");
}

function angleBetween(v1, v2) {
  var dot = Vector3.dot(v1, v2);
  var mag1 = v1.magnitude();
  var mag2 = v2.magnitude();

  var alpha = Math.acos(dot/(mag1*mag2));
  alpha *= 180 / Math.PI; 

  return alpha;
}

function areaTriangle(v1, v2) {
  const cross = Vector3.cross(v1, v2);
  const areaParallelogram = cross.magnitude(); 
  return areaParallelogram / 2; 
}

function handleDrawOperationEvent() {
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  //v1
  var x = parseFloat(document.getElementById("xInput").value);
  var y = parseFloat(document.getElementById("yInput").value);
  var v1 = new Vector3([x, y, 0]);
  drawVector(v1, "red");

  //v2
  var x2 = parseFloat(document.getElementById("xInput2").value);
  var y2 = parseFloat(document.getElementById("yInput2").value);
  var v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");

  var operation = document.getElementById("operation").value;
  var scalar = document.getElementById("scalar").value;

  //v3
  if (operation === "add") {
    v1.add(v2)
    drawVector(v1, "green");
  } else if (operation === "sub") {
    v1.sub(v2)
    drawVector(v1, "green");
  } else if (operation === "mul") {
    v1.mul(scalar);
    v2.mul(scalar);
    drawVector(v1, "green");
    drawVector(v2, "green");
  } else if (operation === "div") {
    v1.div(scalar);
    v2.div(scalar);
    drawVector(v1, "green");
    drawVector(v2, "green");
  } else if (operation === "magnitude") {
    console.log("Magnitude of v1:", v1.magnitude());
    console.log("Magnitude of v2:", v2.magnitude());
  } else if (operation === "normalize") {
    v1.normalize();
    v2.normalize();
    drawVector(v1, "green");
    drawVector(v2, "green");
  } else if (operation === "angle") {
    console.log("Angle: " + angleBetween(v1, v2).toFixed(2));
  } else if (operation === "area") {
    console.log("Area of the Triangle: " + areaTriangle(v1, v2));
  }
}
