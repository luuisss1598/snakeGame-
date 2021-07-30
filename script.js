//select the grid so we can create the individuals squares
const grid = document.querySelector('.grid');

//get the start and restart buttons
let startBtn = document.querySelector('.start');
let restartBtn = document.querySelector('.restart');

//create an array where we are going to store all the individual squares
let squares = [];

//create another array where we are going to store the body of the snake
let snakeBody = [2, 1, 0]; //we start with 2 because the tail will be the first number of the array

//number that will store the direction of the snake
let direction = 1;

//create a variable that will store the number of squares inside the grid
const width = 10;

//create a variable that will store the location where the apples will appear
let appleIndex = 0;

//keep track of the score
let score = 0;

//display score
let scoreDisplay = document.querySelector('#score')

//set an interval time speed in order to make the snake go faster
let intervalTimer = 1000; //the value is stored in milliseconds

//set a speed for how fast the snake will go
let speed = 0.9;

//set a timer id
let timerId = 0

//create a function where will create the grid for the game
function createGrid() {
    //use for loop to create squares(divs)
    for(let i = 0; i < (width*width); i++) {
        //create an element stored in square
        const square = document.createElement('div')
        
        //add the .squares style into the new element
        square.classList.add('squares')

        //append each element created into the grid
        grid.appendChild(square);

        //push the new elements(square) into the squares array
        squares.push(square);
    }
}

createGrid();

//pass the snakes body into the grid using a forEach loop then
//add the snake class into the squares being passed into the squares
snakeBody.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //first we have to remove the snake
    snakeBody.forEach(index => squares[index].classList.remove('snake'))

    //remove apples
    squares[appleIndex].classList.remove('apple');

    clearInterval(timerId);
    snakeBody = [2, 1, 0];
    score = 0;
    scoreDisplay.textContent = score;

    direction = 1;
    intervalTimer = 1000;
    generateApples();

    //re-add the snake class into snake
    snakeBody.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTimer);
}

function move() {
    if(
        (snakeBody[0]+ width >= width*width && direction === 10) ||
        (snakeBody[0] % width === width-1 && direction === 1) || 
        (snakeBody[0] % width === 0 && direction === -1) ||
        (snakeBody[0] - width < 0  && direction === -10) ||
        squares[snakeBody[0] + direction].classList.contains('snake')
    ) {
        return clearInterval(timerId)
    }
    //we have to remove the tail from the snake and also the classlist snake
    const tail = snakeBody.pop();
    squares[tail].classList.remove('snake');

    //add a square into the head of the snake
    snakeBody.unshift(snakeBody[0] + direction);

    if(snakeBody[0].classList.contains('apple')) {
        //remove the apple class
        squares[snakeBody[0]].classList.remove('apple');

        //grow our snake by adding class snake into it 
        squares[tail].classList.add('snake');

        //grow the snake array
        snakeBody.push(tail);

        //generate apples
        generateApples();

        //increment score
        score++;

        //dispaly score
        scoreDisplay.textContent = score;

        //clear the interval
        clearInterval(timerId);

        //speed up the snake
        intervalTimer *= speed;
        
        //set timerId
        timerId = setInterval(move, intervalTimer);
    }
    
    squares[snakeBody[0]].classList.add('snake');
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple')
}
generateApples();

function control(e) {
    if(e.keyCode === 39) {
        direction = 1;
    } else if(e.keyCode === 38) {
        direction = -width;
    } else if(e.keyCode === 37) {
        direction = -1;
    } else if(e.keyCode === 40) {
        direction = +width;
    }
}
document.addEventListener('keyup', control)

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

