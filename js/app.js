function init(){
const colors = ["Red","Green","Yellow","Blue","Purple","Pink"]
let round = 1
let timeLeft = 1.0
let score = 0
let curretColor

//DOM elements
const startScreen = document.querySelector('#start-screen')
const gameScreen = document.querySelector('#game-screen')
const endScreen = document.querySelector('#end-screen')

const playBtn = document.querySelector('#play')
const playAgainBtn = document.querySelector('#play-again')

const roundElem = document.querySelector('#round')
const timerElem = document.querySelector('#timer')
const scoreElem = document.querySelector('#score')
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
}

}
addEventListener('DOMContentLoaded', init)