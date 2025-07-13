function init(){
const colors = ["Red","Green","Yellow","Blue","Purple","Pink"]
const playBtn = document.querySelector('#play')
const roundElem = document.querySelector('#round')
const timerElem = document.querySelector('#timer')
const scoreElem = document.querySelector('#score')
const wordDisplay = document.querySelector('#words')
const colorsOptions = document.querySelector('#colors')
const redColor = document.querySelector('#red')
const startScreen = document.querySelector('#start-screen')
const gameScreen = document.querySelector('#game-screen')
const endScreen = document.querySelector('#end-screen')
const finalScore = document.querySelector('#final-score')
const playAgainBtn = document.querySelector('#play-again')

let round = 1
let timeLeft = 1.0
let score = 0
let curretColor
}
addEventListener('DOMContentLoaded', init)