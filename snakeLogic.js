//board which holds all game elements
const gameBoard = document.getElementById("game-board");
const instructions = document.getElementById("instructions");
const logo = document.getElementById("logo");

//game elements
let gridSize = 20;
let snake = [{x: 10, y: 10}]
let food = {};
let direction = 'down';
let gameInterval;
let gameSpeed = 200;
let gameStart = false;

//draw map, and game elements
function draw(){
    gameBoard.innerHTML = "";
    drawSnake();
    drawFood()
}

//used to create the snake segments, and placed
function drawSnake(){
    snake.forEach((segment)=>{
        const snakeElement = createGameElement('div', 
        'snake');
        setPosition(snakeElement, segment);
        gameBoard.appendChild(snakeElement);
    })
}

//create each game element container to later to placed in html
function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//set position of the game elements
function setPosition(element, pos){
    element.style.gridColumn = pos.x;
    element.style.gridRow = pos.y;
}
//to create food elements, and place them on the board
function drawFood(){
    const foodElement = createGameElement('div', 
    'food');
    setPosition(foodElement, food);
    gameBoard.appendChild(foodElement);
}

//check if there are food elements already, if there are remove it
//so html doesn't get bloated


//create food, if it overlaps the snake element, change positions
//clear food if there is any to avoid html bloat
function setFoodPosition(){
    do {
        const existingFood = document.getElementsByClassName("food");
        if(existingFood.length > 0){
            existingFood[0].remove();
        }
        food.x = Math.floor(Math.random() * gridSize) + 1
        food.y = Math.floor(Math.random() * gridSize) + 1
    } while (snake.forEach((segment)=>{
        return segment.x === food.x && segment.y === food.y
    }));
}

//snake movement
function movement(){
    const head = {...snake[0]};
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        //y-- for up, because grid starts at 1 from the top, and counts to 20 going down
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    //add new position to snake array
    snake.unshift(head);
    //if the snake gets the food, increase the size, and get new food position
    if(head.x === food.x && head.y === food.y){
        setFoodPosition();
        clearInterval();
        gameInterval = setInterval(()=>{
            movement();
            draw();
        }, gameSpeed)
    }
    else{
        snake.pop();
    }
}

function startGame(){
    gameStart = true;
    instructions.style.display= "none";
    logo.style.display="none";
    gameInterval = setInterval(()=>{
        movement();
        draw();
    }, gameSpeed)
}
