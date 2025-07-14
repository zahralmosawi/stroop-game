function init(){
const colors = ["Red","Green","Yellow","Blue","Purple","Pink"]
let round = 1
let timeLeft = 1.0
let score = 0
let curretColor
const totalRounds = 10

//DOM elements
const startScreen = document.querySelector('#start-screen')
const gameScreen = document.querySelector('#game-screen')
const endScreen = document.querySelector('#end-screen')

const playBtn = document.querySelector('#play')
const playAgainBtn = document.querySelector('#play-again')

const roundDisplay = document.querySelector('#round')
const timerDisplay = document.querySelector('#timer')
const scoreDisplay = document.querySelector('#score')
const wordDisplay = document.querySelector('#words')
const finalScore = document.querySelector('#final-score')

const colorsBtns = document.querySelectorAll('.circle-btn')

//start the game buttons
playBtn.addEventListener('click', startGame)
playAgainBtn.addEventListener('click', startGame)

//when a user clicks a color 
colorsBtns.forEach(button => {
    button.addEventListener('click', () => {
        const selectdColor = button.getAttribute('data-color');
        handleUserGuess(selectdColor)
    })
})

function startGame(){
    //reset game state
    score = 0
    round = 1

    startScreen.classList.remove("show") //hide the main screen 
    endScreen.classList.remove("show") //hide the end screen if the user play again
    gameScreen.classList.add("show") //show the game screen

    nextRound()
}

function nextRound(){
    if(round > totalRounds){
        endGame()
        return
    }
    //display the word
    const word = getRandomColor()
    curretColor = getRandomColor() //get a roundom color for the word
    wordDisplay.textContent = word

    if(curretColor === "Red"){
        wordDisplay.style.color = 'red'
    }else if (curretColor === "Green"){
        wordDisplay.style.color = "green"
    }else if (curretColor === "Yellow"){
        wordDisplay.style.color = "yellow"
    }else if (curretColor === "Blue"){
        wordDisplay.style.color = "blue"
    }else if (curretColor === "Purple"){
        wordDisplay.style.color = "purple"
    }else if (curretColor === "Pink"){
        wordDisplay.style.color = "pink"
    }
}

function handleUserGuess(selectdColor){
    const feedback = document.querySelector('#feedback')
    if(selectdColor === curretColor){
        score += 10
        feedback.textContent = 'correct' 
        feedback.style.color = 'green'
        feedback.className('feedback-message')
    }else{
        score -= 10
        feedback.textContent = 'wrong'
        feedback.style.color = 'red'
        feedback.className('feedback-message')
    }
    round++
    updateTopBar()
}

function updateTopBar(){
    roundDisplay.textContent = `${round}/ ${totalRound}`
    scoreDisplay.textContent = `${score}`
}

function getRandomColor(){
    //get a random color from colors array
    return colors[Math.floor(Math.random()*colors.length)]
}

function endGame(){
    //hide game screen and show the end screen
    gameScreen.classList.remove("show")
    endScreen.classList.add("show")

    let message
    if(score >= 80){
        message = "WOW! You're a Stroop Master!"
    }else if(score >= 50){
        message = "Not bad! Getting better!"
    }else if(score >= 10){
        message = "Keep practicing! You'll get there!"
    }

    finalScore.textContent = `${message} Your Score: ${score}`
}

}
addEventListener('DOMContentLoaded', init)