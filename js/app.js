function init(){
const colors = ["Red","Green","Yellow","Blue","Purple","Pink"]
const totalRounds = 30 

let round = 0
let timerInterval
let timeLeft = 2.0
let score = 0
let currentColor
let currentWord
let isFirstPhase  = true
let isSecondPhase = false
let isthirdPhase = false
let isGamePaused = false

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
const finalFeedback = document.querySelector('#final-feedback')
const popupContent = document.querySelector('#popup-content') 

const colorsBtns = document.querySelectorAll('.circle-btn')

//start the game buttons
playBtn.addEventListener('click', startGame)
playAgainBtn.addEventListener('click', startGame)

//when a user clicks a color 
colorsBtns.forEach(button => {
    button.addEventListener('click', () => {
        const selectedColor = button.getAttribute('data-color');
        handleUserGuess(selectedColor)
    })
})

function startGame(){
    //reset game state
    wordDisplay.style.visibility = "visible"
    score = 0
    round = 0

    isFirstPhase = true
    isSecondPhase = false
    isthirdPhase = false
    isGamePaused = false

    startScreen.classList.remove("show") //hide the main screen 
    endScreen.classList.remove("show") //hide the end screen if the user play again
    gameScreen.classList.add("show") //show the game screen

    nextRound()
}

function handleUserGuess(selectedColor){
    //Sound Effects
    const correctAnsSound = document.querySelector("#rightanswer")
    const wrongAnsSound = document.querySelector("#wronganswer")

    let isCorrect = false

    if(isFirstPhase){
        isCorrect = selectedColor === currentColor
    }else if(isSecondPhase){
        isCorrect = selectedColor === currentWord
    }else if(isthirdPhase){
        isCorrect = selectedColor === currentColor
    }

    if(isCorrect){
        score += 10
        correctAnsSound.play()
    }else{
        wrongAnsSound.play()
    }

    nextRound();
    updateTopBar();
}

function nextRound(){
    if(round >= totalRounds){
        endGame()
        return
    }
    //second phase
    if(round === 10  && isFirstPhase){
        isFirstPhase = false
        isSecondPhase = true
        isGamePaused = true
        showPopup()
        return 
    }
    //third phase 
    if(round === 20 && isSecondPhase){
        isSecondPhase = false
        isthirdPhase = true
        isGamePaused = true
        showPopup()
        return
    }

    currentWord = getRandomColor()
    currentColor = getRandomColor() //get a roundom color for the word
    wordDisplay.textContent = currentWord

    if(currentColor === "Red"){
        wordDisplay.style.color = "red"
    }else if (currentColor === "Green"){
        wordDisplay.style.color = "green"
    }else if (currentColor === "Yellow"){
        wordDisplay.style.color = "yellow"
    }else if (currentColor === "Blue"){
        wordDisplay.style.color = "blue"
    }else if (currentColor === "Purple"){
        wordDisplay.style.color = "purple"
    }else if (currentColor === "Pink"){
        wordDisplay.style.color = "pink"
    }

    timeLeft = 1.0
    clearInterval(timerInterval) //clear the timer
    updateTopBar()

    if(isthirdPhase){
        wordDisplay.style.visibility = "visible"
        disableColorButtons()
        setTimeout(() => {
            wordDisplay.style.visibility = 'hidden'
            enableColorButtons()
        },500) //DO NOT CHANGE IT
    }else{
        enableColorButtons()
    }

    timerInterval = setInterval(() => {
        if(!isGamePaused){
            timeLeft -= 0.1
            updateTopBar()
            if(timeLeft <= 0){
                clearInterval(timerInterval)
                handleUserGuess(null)
            }
        }
    }, 200) //DO NOT CHANGE IT

    round++
    updateTopBar()
    getRandomColorPosition()
}

function updateTopBar(){
    roundDisplay.textContent = `${round}/${totalRounds}`
    scoreDisplay.textContent = `${score}`
    timerDisplay.textContent = `${timeLeft.toFixed(1)}s`
}

function endGame(){
    //hide game screen and show the end screen
    gameScreen.classList.remove("show")
    endScreen.classList.add("show")

    let message
    if(score >= 180){
        message = "WOW! You're a Stroop Master!"
    }else if(score >= 150){
        message = "Not bad! Getting better!"
    }else if(score <= 110){
        message = "Keep practicing! You'll get there!"
    }else{
        message = ''
    }

    finalScore.textContent = `Your Score is: ${score}`
    finalFeedback.textContent = `${message}`
}

function getRandomColor(){
    //get a random color from colors array
    return colors[Math.floor(Math.random()*colors.length)]
}

function getRandomColorPosition(){
    const colorsContainer = document.querySelector("#colors")
    const buttons = Array.from(colorsContainer.children) //get button elements from the DOM in a array
    const shuffled = buttons.sort(() => Math.random() - 0.5 ) //random sort

    shuffled.forEach(btn => colorsContainer.appendChild(btn))
}

function showPopup(){
    const popup = document.querySelector("#popup-1")
    const closeBtn = document.querySelector("#close-popup")

    isGamePaused = true
    popup.style.display = "flex"

    if(isSecondPhase){
        popupContent.textContent = 'Now select the WORD, not its color!'
    }else if(isthirdPhase){
        popupContent.textContent = 'Now you just have to REMEMBER the color'
    }

    function handleClose(){
        popup.style.display = "none"
        isGamePaused = false
        nextRound()
    }

    closeBtn.addEventListener('click', handleClose, { once: true })
}
//ENABLE/ DISABLE
function disableColorButtons(){
    colorsBtns.forEach(btn => btn.disabled = true)
}
function enableColorButtons(){
    colorsBtns.forEach(btn => btn.disabled = false)
}

}
addEventListener('DOMContentLoaded', init)