// labyrinthp5

let game_title = "* labyrinthp5 * c6.1";
let game_title_X, game_title_Y;

let game_menu_X, game_menu_Y;

let canvas_W, canvas_H;
let is_init = 1;
let is_move_random = 1;
let background_RGB;

let [wall_X, wall_Y, wall_W, wall_H] = [[], [], [], []];
let wall_RGB = [];
let [floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4] = [[], [], [], [], [], [], [], []];
let floor_RGB = [];
let [ceil_X1, ceil_Y1, ceil_X2, ceil_Y2, ceil_X3, ceil_Y3, ceil_X4, ceil_Y4] = [[], [], [], [], [], [], [], []];
let ceil_RGB = [];
let is_corner_l = [];
let is_corner_r = [];
let is_touch = 0;

function setup() {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove",  function (event) { event.preventDefault(); }, { passive: false });
  set_val();
  createCanvas(canvas_W, canvas_H);
  rectMode(CENTER);
}

function draw() {
  background(background_RGB[0], background_RGB[1], background_RGB[2]);
  set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H);
  set_floor(floor_RGB, floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4);
  set_ceil(ceil_RGB, ceil_X1, ceil_Y1, ceil_X2, ceil_Y2, ceil_X3, ceil_Y3, ceil_X4, ceil_Y4);
  set_game_menu();
  set_game_title();
  if (1 == is_touch) {
    touched();
    is_touch = 0;
  }
  set_pointer();
}

function set_pointer() {
  push();
  noStroke();
  fill(255, 255, 0)
  circle(mouseX, mouseY, 4);
  pop();
}

function touchStarted() {
  is_touch = 1;
}

function touched() {
  mousePressed();
  is_touch = 0;
  console.log("touched at : " + mouseX + " , " + mouseY);
}

function touchEnded() {
  is_touch = 0;
}
  
function mousePressed() {
  move_random();
}

function set_game_title() {
  push();
  textSize(14);
  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(200);
  text(game_title, game_title_X, game_title_Y);
  pop();
}

function set_game_menu() {
  push();
  textSize(14);
  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);
  noStroke();
  fill(200);
  text("** menu **", game_menu_X, game_menu_Y * 1 / 10);
  if ((canvas_W - floor_X2[0]) > 150) {
    push();
    textSize(10);
      for (let i=0; i<2; i++) {
      text("No " + (i+1) + " is corner left  ? : " + is_corner_l[i], game_menu_X, game_menu_Y * (2+i) / 10);
      text("No " + (i+1) + " is corner right ? : " + is_corner_r[i], game_menu_X, game_menu_Y * (4+i) / 10);
    }
    text(" tap to random move", game_menu_X, game_menu_Y * 10 / 10);
    pop();
  }
  pop();
}

function set_val() {
  if (is_init) {
    background_RGB = [50, 50, 50];
    is_init = 0;
  }
  if (is_move_random) {
    for (let i=0; i<2; i++) {
      is_corner_l.push(random([1, 0]));
      is_corner_r.push(random([1, 0]));
      console.log("No " + (i+1) + " is corner left  ? : " + is_corner_l[i]);
      console.log("No " + (i+1) + " is corner right ? : " + is_corner_r[i]);
    }
    is_move_random = 0;
  }
  [canvas_W, canvas_H] = [windowWidth - 20, windowHeight - 20];
  if (canvas_W < canvas_H) {
    canvas_H = canvas_W;
  }
  [game_title_X, game_title_Y] = [canvas_W * 34 / 40, canvas_H * 29 / 30]

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
    if (is_corner_r[i]) {
      floor_X3.push(wall_X[i] + wall_W[i] / 2);
      floor_Y3.push(wall_Y[i+1] + wall_W[i+1] / 2);
    } else {
      floor_X3.push(wall_X[i+1] + wall_W[i+1] / 2);
      floor_Y3.push(wall_Y[i+1] + wall_W[i+1] / 2);
    }
    if (is_corner_l[i]) {
      floor_X4.push(wall_X[i] - wall_W[i] / 2);
      floor_Y4.push(wall_Y[i+1] + wall_W[i+1] / 2);
    } else {
      floor_X4.push(wall_X[i+1] - wall_W[i+1] / 2);
      floor_Y4.push(wall_Y[i+1] + wall_W[i+1] / 2);
    }
    floor_RGB.push([40 - 5 * i, 40 - 5 * i, 40 - 5 * i]);
  }

  for (let i=0; i<2; i++) {
    ceil_X1.push(wall_X[i] - wall_W[i] / 2);
    ceil_Y1.push(wall_Y[i] - wall_W[i] / 2);
    ceil_X2.push(wall_X[i] + wall_W[i] / 2);
    ceil_Y2.push(wall_Y[i] - wall_W[i] / 2);
    if (is_corner_r[i]) {
      ceil_X3.push(wall_X[i] + wall_W[i] / 2);
      ceil_Y3.push(wall_Y[i+1] - wall_W[i+1] / 2);
    } else {
      ceil_X3.push(wall_X[i+1] + wall_W[i+1] / 2);
      ceil_Y3.push(wall_Y[i+1] - wall_W[i+1] / 2);
    }
    if (is_corner_l[i]) {
      ceil_X4.push(wall_X[i] - wall_W[i] / 2);
      ceil_Y4.push(wall_Y[i+1] - wall_W[i+1] / 2);
    } else {
      ceil_X4.push(wall_X[i+1] - wall_W[i+1] / 2);
      ceil_Y4.push(wall_Y[i+1] - wall_W[i+1] / 2);
    }
    ceil_RGB.push([40 - 5 * i, 40 - 5 * i, 40 - 5 * i]);
  }
  game_menu_X = floor_X2[0] + (canvas_W - floor_X2[0]) / 2;
  game_menu_Y = canvas_H / 2;
}

function windowResized() {
  reset_wall();
  set_val();
  resizeCanvas(canvas_W, canvas_H);
  console.log("resize(w, h) : " + canvas_W + ", " + canvas_H);
  set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H);
  set_floor(floor_RGB, floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4);
  set_ceil(ceil_RGB, ceil_X1, ceil_Y1, ceil_X2, ceil_Y2, ceil_X3, ceil_Y3, ceil_X4, ceil_Y4);
}

function reset_wall() {
  [wall_X, wall_Y, wall_W, wall_H] = [[], [], [], []];
  wall_RGB = [];
  [floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4] = [[], [], [], [], [], [], [], []];
  floor_RGB = [];
  [ceil_X1, ceil_Y1, ceil_X2, ceil_Y2, ceil_X3, ceil_Y3, ceil_X4, ceil_Y4] = [[], [], [], [], [], [], [], []];
  ceil_RGB = [];
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
  pop();
}

function set_floor(floor_RGB, floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4) {
  push();
  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  for (let i=0; i < floor_X1.length; i++) {
    fill(floor_RGB[i][0], floor_RGB[i][1], floor_RGB[i][2]);
    quad(floor_X1[i], floor_Y1[i], floor_X2[i], floor_Y2[i], floor_X3[i], floor_Y3[i], floor_X4[i], floor_Y4[i]);
    push();
      stroke(background_RGB[0], background_RGB[1], background_RGB[2]);
      line(floor_X1[i], floor_Y1[i], floor_X2[i], floor_Y2[i]);
 //     line(floor_X3[i], floor_Y3[i], floor_X4[i], floor_Y4[i]);
    pop();
  }
  pop();
}

function set_ceil(ceil_RGB, ceil_X1, ceil_Y1, ceil_X2, ceil_Y2, ceil_X3, ceil_Y3, ceil_X4, ceil_Y4) {
  push();
//  noStroke();
  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  for (let i=0; i < ceil_X1.length; i++) {
    fill(ceil_RGB[i][0], ceil_RGB[i][1], ceil_RGB[i][2]);
    quad(ceil_X1[i], ceil_Y1[i], ceil_X2[i], ceil_Y2[i], ceil_X3[i], ceil_Y3[i], ceil_X4[i], ceil_Y4[i]);
    push();
      stroke(background_RGB[0], background_RGB[1], background_RGB[2]);
      line(ceil_X1[i], ceil_Y1[i], ceil_X2[i], ceil_Y2[i]);
//      line(ceil_X3[i], ceil_Y3[i], ceil_X4[i], ceil_Y4[i]);
    pop();
  }
  pop();
}

function move_random() {
  is_move_random = 1;
  is_corner_l = [];
  is_corner_r = [];
  console.log("random move");
  reset_wall();
  set_val();
  set_wall(wall_RGB, wall_X, wall_Y, wall_W, wall_H);
  set_floor(floor_RGB, floor_X1, floor_Y1, floor_X2, floor_Y2, floor_X3, floor_Y3, floor_X4, floor_Y4);
  set_ceil(ceil_RGB, ceil_X1, ceil_Y1, ceil_X2, ceil_Y2, ceil_X3, ceil_Y3, ceil_X4, ceil_Y4);
}