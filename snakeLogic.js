//board which holds all game elements
const gameBoard = document.getElementById("game-board");

//game elements
let snake = [{x: 10, y: 10}]

//draw map, and game elements
function draw(){
    gameBoard.innerHTML = "";
    drawSnake();
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
