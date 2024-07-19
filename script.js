const playBoard = document.querySelector(".play-board");
let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;

const changeFoodPosition = () => {
  //passing a random 0-30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  //clearing the timer and reloading the page on game over
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay...");
  location.reload();
};

const changeDirection = (e) => {
  //change velocity value on key press
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
};

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style= "grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //pushing food position to snake body array
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    //shifting forward the values of the elements in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; //setting first element of the snake body to current snake position
  //updating the snakes head position based on the current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  //checking if the snakes head is out of the wall,if so setting gameOver to true
  if (snakeX <= 0 || snakeX > 30 || snakeX <= 0 || snakeY > 30) {
    gameOver = true;
  }
``
  for (let i = 0; i < snakeBody.length; i++) {
    //adding a div for each part of snake body
    htmlMarkup += `<div class="head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
  }

  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
