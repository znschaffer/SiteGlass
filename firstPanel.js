var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Create Red Border
ctx.fillStyle = "#981E32";
ctx.fillRect(0, 0, 383, 401);

//ctx.fillRect(0, 32, 369, 375); // Left, Top, Width, Height
// Adjust All Rectangles W/ -8 For Borders
// <canvas id="myCanvas" width="383" height="401"></canvas>
// roundRect(x, y, width, height, radii)

// Create White BG
ctx.beginPath();
ctx.roundRect(8, 40, 367, 353, [0, 0, 15, 15])
ctx.stroke();
ctx.fillStyle = "white";
ctx.fill();