// labyrinthp5

let game_title = "* labyrinthp5 * c1.0";
let game_title_X, game_title_Y;

let canvas_W, canvas_H;
let is_init = 1;
let background_RGB;

let wall_X, wall_Y, wall_W, wall_H;
let wall_RGB;

function setup() {
  set_val();
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
}

function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H);
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
    wall_RGB = [40, 40, 40];
    background_RGB = [50, 50, 50];

    is_init = 0;
  }

  [canvas_W, canvas_H] = [windowWidth - 20, windowHeight - 20];
  [game_title_X, game_title_Y] = [canvas_W * 36 / 40, canvas_H * 29 / 30]

  wall_X = canvas_W / 2;
  wall_Y = canvas_H / 2;
  wall_W = canvas_H * 4 / 5;
  wall_H = canvas_H * 4 / 5;
}

function windowResized() {
  set_val();
  resizeCanvas(canvas_W, canvas_H);
  console.log("resize(w, h) : " + canvas_W + ", " + canvas_H);
}

function set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H) {
  push();
  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  fill(wall_RGB[0], wall_RGB[1], wall_RGB[2]);
  rect(wall_X, wall_Y, wall_W, wall_H);
}