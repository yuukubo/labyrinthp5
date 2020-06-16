// labyrinthp5

let game_title = "* labyrinthp5 * c2.2";
let game_title_X, game_title_Y;

let canvas_W, canvas_H;
let is_init = 1;
let background_RGB;

let [wall_X, wall_Y, wall_W, wall_H] = [[], [], [], []];
let wall_RGB = [];
let [floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4] = [[], [], [], [], [], [], [], []];
let floor_RGB = [];

function setup() {
  set_val();
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
}

function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H);
  set_floor(floor_RGB, floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4);
  set_game_title();
}

function set_game_title() {
  push();
  textSize(10);
  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(100);
  text(game_title, game_title_X, game_title_Y);
  pop();
}

function set_val() {
  if (is_init) {
    background_RGB = [50, 50, 50];

    is_init = 0;
  }

  [canvas_W, canvas_H] = [windowWidth - 20, windowHeight - 20];
  [game_title_X, game_title_Y] = [canvas_W * 36 / 40, canvas_H * 29 / 30]

  for (let i=0; i<3; i++) {
    wall_X.push(canvas_W / 2);
    wall_Y.push(canvas_H / 2);
    wall_W.push(canvas_H * (4 - i) / 5);
    wall_H.push(wall_W[i]);
    wall_RGB.push([40 - 10 * i, 40 - 10 * i, 40 - 10 * i]);
  }

  for (let i=0; i<2; i++) {
    floor_X1.push(wall_X[i] - wall_W[i] / 2);
    floor_Y1.push(wall_Y[i] + wall_W[i] / 2);
    floor_X2.push(wall_X[i] + wall_W[i] / 2);
    floor_Y2.push(wall_Y[i] + wall_W[i] / 2);
    floor_X3.push(wall_X[i+1] + wall_W[i+1] / 2);
    floor_Y3.push(wall_Y[i+1] + wall_W[i+1] / 2);
    floor_X4.push(wall_X[i+1] - wall_W[i+1] / 2);
    floor_Y4.push(wall_Y[i+1] + wall_W[i+1] / 2);
    floor_RGB.push([40 - 5 * i, 40 - 5 * i, 40 - 5 * i]);
  }
}

function windowResized() {
  [wall_X, wall_Y, wall_W, wall_H] = [[], [], [], []];
  wall_RGB = [];
  [floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4] = [[], [], [], [], [], [], [], []];
  floor_RGB = [];
  set_val();
  resizeCanvas(canvas_W, canvas_H);
  console.log("resize(w, h) : " + canvas_W + ", " + canvas_H);
  set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H);
}

function set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H) {
  push();
  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  for (let i=0; i < wall_X.length; i++) {
    fill(wall_RGB[i][0], wall_RGB[i][1], wall_RGB[i][2]);
    rect(wall_X[i], wall_Y[i], wall_W[i], wall_H[i]);
  }
}

function set_floor(floor_RGB, floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4) {
  push();
  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  for (let i=0; i < floor_X1.length; i++) {
    fill(floor_RGB[i][0], floor_RGB[i][1], floor_RGB[i][2]);
    quad(floor_X1[i], floor_Y1[i], floor_X2[i], floor_Y2[i], floor_X3[i], floor_Y3[i], floor_X4[i], floor_Y4[i]);
  }
}