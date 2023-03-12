const board = document.querySelector('.board')
let scoreBoard = document.querySelector('#score')
let direction = {x: 0, y: 0}
let snakeArr = [{x: 5, y: 5}, {x: 4, y: 5}]
let speed = 120
let food = {x: Math.round(Math.random() * 20 + 1),y: Math.round(Math.random() * 20 + 1)}
let score = 0
let gameOver = document.createElement('div')
gameOver.classList.add("gameover")
document.body.appendChild(gameOver)

let snakeElements = []

let headElement = document.createElement('div')
headElement.classList.add("head")

let IntervalID = setInterval(gameloop, speed)
function gameloop() {
    gameOver.innerText = ""
    board.innerHTML = ""

    // collision with food
    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        food = {x: Math.round(Math.random() * 20 + 1), y: Math.round(Math.random() * 20 + 1)}
        snakeArr.push({x: snakeArr[snakeArr.length-1].x, y: snakeArr[snakeArr.length-1].y})
        
        // update score board
        ++score
        scoreBoard.innerText = score
    }
    
    // if food spawn on the snake body
    snakeArr.forEach((segment => { 
        while(food.x == segment.x && food.y == segment.y) {
            food = {x: Math.round(Math.random() * 20 + 1),y: Math.round(Math.random() * 20 + 1)}
        }
    }))

    // create food
    let foodElement = document.createElement('div')
    foodElement.style.gridColumnStart = food.x
    foodElement.style.gridRowStart = food.y
    foodElement.classList.add("food")
    board.appendChild(foodElement)

    // head
    headElement.style.gridColumnStart = snakeArr[0].x
    headElement.style.gridRowStart = snakeArr[0].y
    board.appendChild(headElement)

    // create snake body
    for(let i = 1; i <= snakeArr.length-1; i++) {
        var snakebody = document.createElement('div')
        snakebody.style.gridColumnStart = snakeArr[i].x
        snakebody.style.gridRowStart = snakeArr[i].y
        snakeElements.push(snakebody)
        board.appendChild(snakebody)
        // rotating img as per its direction
        if(snakeArr[i-1].x == snakeArr[i].x) {
            snakebody.classList = "snake vertical"
        } else if(snakeArr[i-1].y == snakeArr[i].y){
            snakebody.classList = "snake horizontal"
        }
        
    }

    // move snake body
    if(direction.x !== 0 || direction.y !== 0) {
        for(let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i+1] = {...snakeArr[i]}
            
        }
    
    }
    
    // move head
    snakeArr[0].x += direction.x
    snakeArr[0].y += direction.y


    // wall collision
    if(snakeArr[0].x < 1 || snakeArr[0].x > 21 || snakeArr[0].y < 1 || snakeArr[0].y > 21) {
        document.removeEventListener('keydown', controlSnake)
        clearInterval(IntervalID)
        gameOver.innerText = "GAME OVER !"
    }

    // collision with body
    for(let i = 1; i < snakeArr.length - 1; i++) {
        if(snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
            document.removeEventListener('keydown', controlSnake)
            clearInterval(IntervalID)
            gameOver.innerText = "GAME OVER !"
        }
    }

}


function controlSnake(e) {
    if(e.keyCode == 40) { // down
        if(direction.y !== -1) { // not going up
            headElement.classList = "head down"
            direction.x = 0;
            direction.y = 1;
        }
    }
    if(e.keyCode == 38) { // up
        if(direction.y !== 1) { // not going down
            headElement.classList = "head up"
            direction.x = 0;
            direction.y = -1;
        }
    }
    if(e.keyCode == 37) { // left
        if(direction.x !== 1) { // not going right
            headElement.classList = "head left"
            direction.x = -1;
            direction.y = 0;
        }
    }
    if(e.keyCode == 39) { // right
        if(direction.x !== -1) { // not going left
            headElement.classList = "head right"
            direction.x = 1;
            direction.y = 0;
        }
    }
}



document.addEventListener('keydown', controlSnake)
