// Get canvas and context
let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

// Define the size of each square
let box = 32;
// Initialize the score
let score = 0;
// Initialize the snake as an array of squares
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };

// Initialize the obstacles as an array of squares
let obstacles = [
  { x: 5 * box, y: 7 * box },
  { x: 8 * box, y: 12 * box },
  { x: 13 * box, y: 10 * box },
  // Add more obstacles as needed
];

// Set the initial direction
let direction = "right";

// Create the food at a random position
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// Function to draw the background
function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Function to draw the obstacles
function createObstacles() {
  context.fillStyle = "red";
  for (let i = 0; i < obstacles.length; i++) {
    context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
  }
}
// Function to draw the food
function drawFood() {
  context.fillStyle = "blue";
  context.fillRect(food.x, food.y, box, box);
}

// Function to draw the score
function drawScore() {
  // context.fillStyle = "black";
  // context.font = "16px Arial";
  // context.fillText("Score: " + score, 2 * box, 1.6 * box);
  document.getElementById("score").innerHTML = "Score: " + score;
}

// Event listener for arrow keys to change direction
document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Main game loop
function startGame() {
  // Wrap the snake around to the other side of the canvas
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  // Check for collision with self
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert("Game Over :(");
    }
  }
  // Check for collision with obstacles
  for (let i = 0; i < obstacles.length; i++) {
    if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y) {
      clearInterval(game);
      alert("Game Over :(");
    }
  }

  // Draw the game objects
  createBG();
  createObstacles();
  createSnake();
  drawFood();
  drawScore();

  // Move the snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  // Check if the snake has eaten the food
  if (snakeX != food.x || snakeY != food.y) {
    // Remove the last square of the snake
    snake.pop();
  } else {
    // Generate new food and leave the tail (snake grows)
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    score++;
  }

  // Add a new head to the snake
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);
