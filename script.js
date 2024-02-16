console.log(
  "%c /* \n https://pesinasiller.github.io\n */",
  "font-size: 15px; color: coral;",
);


var xspacing = 8; // How far apart should each horizontal location be spaced
var w; // Width of entire wave

var theta = 0.0; // Start angle at 0
var theta2 = 0.0;
var amplitude = 15.0; // Height of wave
var period = 200.0; // How many pixels before the wave repeats
var period2 = -80.0; // How many pixels before the wave repeats
var dx; // Value for incrementing X, a function of period and xspacing
var dy; // Value for incrementing X, a function of period and xspacing
var yvalues = []; // Using an array to store height values for the wave
var yvalues2 = [];

var x1, x2, y1, y2;
var angle1 = 0;
var angle2 = 0;
var scalar = 70;

var color1, color2;
var song;
var reverb;

function setup() {
  var myCanvas = createCanvas(640, 360);
  myCanvas.parent("canvas");

  color1 = color(255, 204, 0);
  color2 = color(255, 204, 0);

  w = width;

  dx = (TWO_PI / period) * xspacing;
  dy = (TWO_PI / period2) * xspacing;

  yvalues = new Array(w / xspacing);
  yvalues2 = new Array(w / xspacing);
}
function preload(){
  song = loadSound("modem.mp3");
}

function draw() {
  var speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.15, 10);
  song?.rate(1 / speed);

  background(255);

  dy = (TWO_PI / mouseX) * xspacing;
  dx = (TWO_PI / mouseY) * xspacing;

  calcWave();
  calcWave2();

  var ang1 = radians(angle1);
  var ang2 = radians(angle2);

  x1 = width / 2 + scalar * cos(ang1);
  x2 = width / 2 + scalar * cos(ang2);
  y1 = height / 2 + scalar * sin(ang1);
  y2 = height / 2 + scalar * sin(ang2);

  for (r = -100; r < width * 2; r += 100) {
    for (x = 1; x < yvalues.length; x++) {
      stroke(0, 140, r);
      line(
        width / 2 - yvalues2[yvalues2.length - x - 1] * 0.5 - y2 + r - 150,
        x * xspacing,
        yvalues[yvalues.length - x - 1] * 0.2 + y1 + r - 150,
        x * xspacing,
      );

      stroke(color1);
      line(
        r + yvalues[yvalues.length - x - 1],
        -50 + x * xspacing + 7,
        r + yvalues[yvalues.length - x - 1] + y2 * 0.3,
        -50 + x * xspacing + 7,
      );

      stroke(color2);
      line(
        r + yvalues2[yvalues2.length - x - 1] - y2,
        -50 + x * xspacing,
        r + yvalues2[yvalues2.length - x - 1] + y2 * 0.3 - y2,
        -50 + x * xspacing,
      );
    }
  }

  angle1 += 2;
  angle2 += 3;
}

function mousePressed() {
  color1 = color(random(0, 255), 204, 0);
  color2 = color(155, random(0, 255), 0);
  reverb = new p5.Reverb();
  reverb.process(song, 3, 2);
  song.play();
}

function mouseReleased() {
  song.stop();
  return false;
}

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.1;
  // For every x value, calculate a y value with sine function
  var x = theta;
  for (i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function calcWave2() {
  // Increment theta (try different values for 'angular velocity' here
  theta2 += 0.2;

  // For every x value, calculate a y value with sine function
  var x = theta2;
  for (i = 0; i < yvalues2.length; i++) {
    yvalues2[i] = cos(x) * amplitude;
    x += dy;
  }
}
var indice = 0;

const siguienteTexto = () => {
  document.getElementById("texto").innerHTML = textos[indice];
  indice++;
  indice = indice % textos.length;
};

document
  .getElementById("boton-siguiente")
  .addEventListener("click", siguienteTexto);
document
  .getElementById("boton-siguiente")
  .addEventListener("touchstart", siguienteTexto);
