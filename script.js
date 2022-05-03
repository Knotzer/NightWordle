
const WordLength = 5
const flipAnimeTime = 500
const danceAnimeTime = 500
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const rndNum = Math.random() * targetWords.length-1
const targetWord = targetWords[Math.floor(rndNum)]

startGame()
// starts Main Game
function startGame() {
  document.addEventListener("click", whenMouseClicked)
  document.addEventListener("keydown",whenKeyCLicked)
}
//stops main game
function stopGame() {
  document.removeEventListener("click", whenMouseClicked)
  document.removeEventListener("keydown",whenKeyCLicked)
}
//when player uses the mouse
function whenMouseClicked(e) {
  if (e.target.matches("[data-key]")) {
    keyPress(e.target.dataset.key)
    return
  }
  //if player clicks enter, using mouse, submits guesss
  if (e.target.matches("[data-enter]")) {
    submitGuess()
    return
  }
  //if player clicks delete, using mouse, deletes last pressed charecter
  if (e.target.matches("[data-delete]")) {
    keyRemove()
    return
  }
}
// creates functionwhenKeyCLicked
function whenKeyCLicked(e) {
  // if player presses enter on keyboard, submits guess
  if (e.key === "Enter") {
    submitGuess()
    return
  }
  // if backspace or delete is pressed on keybaord removes last charecter
  if (e.key === "Backspace" || e.key === "Delete") {
    keyRemove()
    return
  }
  //if charecter is a valid charecter adds it to the grid
  if (e.key.match(/^[a-z]$/)) {
    keyPress(e.key)
    return
  }
}
//if called, restarts game
function PlayAgain(){
//  const a = document.querySelector(".PlayAgain")
//  a.addEventListener("")
  
location.reload()
}
//if activated Boxs is not longer than word length place word in Box, else stop function
function keyPress(key) {
  const activeBoxs = getActiveBoxs()
  if (activeBoxs.length <= WordLength){ 
    const nextBox = guessGrid.querySelector(":not([data-letter])")
  nextBox.dataset.letter = key.toLowerCase()
  nextBox.textContent = key
  nextBox.dataset.state = "active"
    
  }
  return
}
//if you cant go backwords when delete, return, else remove content of last box
function keyRemove() {
  const activeBoxs = getActiveBoxs()
  const lastBox = activeBoxs[activeBoxs.length - 1]
  if (lastBox != null) {
    lastBox.textContent = ""
    delete lastBox.dataset.state
    delete lastBox.dataset.letter
  }
  return
  
}
//if all boxes in row contain a charecter, and all adds up to a valid word in the list than submits the guess, otherwise returns
function submitGuess() {
  const activeBoxs = [...getActiveBoxs()]
  if (activeBoxs.length !== WordLength) {
    showAlert("Not enough letters")
    shakeBoxs(activeBoxs)
    return
  }
 // makes box value the key that was enterd
  const guess = activeBoxs.reduce((word, Box) => {
    return word + Box.dataset.letter
  }, "")
  // alerts you if word enterd is not in the list
  if (!dictionary.includes(guess)) {
    showAlert("Not in word list")
    shakeBoxs(activeBoxs)
    return
  }
  
  stopGame()
  activeBoxs.forEach((...params) => flipBox(...params, guess))
}
// flips Boxs anime when valid word guessed
function flipBox(Box, index, array, guess) {
  const letter = Box.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    Box.classList.add("flip")
  }, (index * flipAnimeTime) / 2)
  // gives box's class depending on weither or not the guessed letter is correct, incorrect, or incorrect positon
  Box.addEventListener(
    "transitionend",
    () => {
      Box.classList.remove("flip")
      if (targetWord[index] === letter) {
        Box.dataset.state = "correct"
        key.classList.add("correct")
      } else if (targetWord.includes(letter)) {
        Box.dataset.state = "wrong-location"
        key.classList.add("wrong-location")
      } else {
        Box.dataset.state = "wrong"
        key.classList.add("wrong")
      }
      //checks if answer is correct or incorrect from the list
      if (index === array.length - 1) {
        Box.addEventListener(
          "transitionend",
          () => {
            startGame()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}
//gets the active Boxs from the Boxs
function getActiveBoxs() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}
//shows alert depending on if you win/lose/incorrect word/etc
function showAlert(message, duration = 1000) {
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  if (duration == null){
    return
  } 
  //removes alert after set amount of time
  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}
//shakes Boxs if invalid guess is sumbittedS
function shakeBoxs(Boxs) {
  Boxs.forEach(Box => {
    Box.classList.add("shake")
    Box.addEventListener(
      "animeend",
      () => {
        Box.classList.remove("shake")
      },
      { once: true }
    )
  })
}
//checks if you have won, if so, plays a dance anime on Boxs.
function checkWinLose(guess, Boxs) {
  if (guess === targetWord) {
    showAlert("You Win", 5000)
    danceBoxs(Boxs)
    stopGame()
    
    return
  }
  // checks how many words it took to guess or not guess it, than stops interaction
  const remainingBoxs = guessGrid.querySelectorAll(":not([data-letter])")
  if (remainingBoxs.length === 0) {
    showAlert(targetWord.toUpperCase(), null)
    stopGame()
  }
}
// if game won, plays anime dance Boxs
function danceBoxs(Boxs) {
  Boxs.forEach((Box, index) => {
    setTimeout(() => {
      Box.classList.add("dance")
      Box.addEventListener(
        "animeend",
        () => {
          Box.classList.remove("dance")
        },
        { once: true }
      )
    }, (index * danceAnimeTime) / 5)
  })
}
