const board = document.querySelector('.board')
let speed = 10
let lastPaint = 2
let LeftPaddle = [
    {x: 1, y: 5},
    {x: 1, y: 6},
    {x: 1, y: 7},
    {x: 1, y: 8},
    {x: 1, y: 9}
]
let RightPaddle = [
    {x: 21, y: 5},
    {x: 21, y: 6},
    {x: 21, y: 7},
    {x: 21, y: 8},
    {x: 21, y: 9}
]

let Ball = {x: 10, y: 10}

let direction = {x: 1, y: -1}

function main(ctime) {

    requestAnimationFrame(main)

    if((ctime - lastPaint)/1000 < 1/speed) {
        return
    }
    lastPaint = ctime
    gameLoop()
}

function gameLoop() {
    board.innerHTML = ""


    // bounce ball right paddle
    RightPaddle.forEach((each) => {
        if(each.x-1 == Ball.x && each.y == Ball.y) {
            if(direction.x == 1 && direction.y == -1) { // down to up
                direction.x = -1
                direction.y = -1
            }
            else if (direction.x == 1 && direction.y == 1) { // up to down
                direction.x = -1
                direction.y = 1
            }
            // speed++
        }
    })

    // bounce ball left paddle
    LeftPaddle.forEach((each) => {
        if(each.x+1 == Ball.x && each.y == Ball.y) {
            if(direction.x == -1 && direction.y == 1) { // up to down
                direction.x = 1
                direction.y = 1
            }
            else if (direction.x == -1 && direction.y == -1) { // down to up
                direction.x = 1
                direction.y = -1
            }
            // speed++
        }
    })


    // wall bounce
    if(Ball.y == 1 || Ball.y == 21) {
        if(direction.x == 1 && direction.y == -1) { // top left to right
            direction.x = 1
            direction.y = 1
        }
        else if(direction.x == -1 && direction.y == -1) { // top right to left
            direction.x = -1
            direction.y = 1
        }
        else if(direction.x == -1 && direction.y == 1) { // bottom left to right
            direction.x = -1
            direction.y = -1
        }
        else if(direction.x == 1 && direction.y == 1) { // bottom right to left
            direction.x = 1
            direction.y = -1
        }
    }


    // create left paddle
    LeftPaddle.forEach((each) => {
        let leftpaddle = document.createElement('div')
        leftpaddle.style.gridColumnStart = each.x
        leftpaddle.style.gridRowStart = each.y
        board.appendChild(leftpaddle)
        leftpaddle.classList.add("paddle-left")
    })

    // create right paddle
    RightPaddle.forEach((each) => {
        let rightPaddle = document.createElement('div')
        rightPaddle.style.gridColumnStart = each.x
        rightPaddle.style.gridRowStart = each.y
        board.appendChild(rightPaddle)
        rightPaddle.classList.add("paddle-right")
    })

    // create ball
    let ball = document.createElement('div')
    ball.classList.add("ball")
    ball.style.gridColumnStart = Ball.x
    ball.style.gridRowStart = Ball.y
    board.appendChild(ball)


    // move ball
    Ball.x += direction.x
    Ball.y += direction.y
}

requestAnimationFrame(main)

document.addEventListener('keydown', (e) => {
    // right paddle
    if(e.keyCode == 38) { // up
        if (RightPaddle[0].y > 1) {
            RightPaddle.forEach((each) => {
                each.y -= 1
            })
        }
    }
    if(e.keyCode == 40) { // down
        if (RightPaddle[RightPaddle.length-1].y < 21) {
            RightPaddle.forEach((each) => {
                each.y += 1
            })
        }
    }

    // left paddle
    if(e.keyCode == 87) { // up
        if (LeftPaddle[0].y > 1) {
            LeftPaddle.forEach((each) => {
                each.y -= 1
            })
        }
    }
    if(e.keyCode == 83) { // down
        if (LeftPaddle[LeftPaddle.length-1].y < 21) {
            LeftPaddle.forEach((each) => {
                each.y += 1
            })
        }
    }
})
