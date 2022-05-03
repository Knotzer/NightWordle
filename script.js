
const WordLength = 5
const flipAnimeTime = 500
const danceAnimeTime = 500
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const rndNum = Math.random() * targetWords.length-1
const targetWord = targetWords[Math.floor(rndNum)]

startInteraction()
// starts Main Game
function startInteraction() {
  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}
//stops main game
function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}
//when player uses the mouse
function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key)
    return
  }
  //if player clicks enter, using mouse, submits guesss
  if (e.target.matches("[data-enter]")) {
    submitGuess()
    return
  }
  //if player clicks delete, using mouse, deletes last pressed charecter
  if (e.target.matches("[data-delete]")) {
    deleteKey()
    return
  }
}
// creates function HandleKeyPress
function handleKeyPress(e) {
  // if player presses enter on keyboard, submits guess
  if (e.key === "Enter") {
    submitGuess()
    return
  }
  // if backspace or delete is pressed on keybaord removes last charecter
  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey()
    return
  }
  //if charecter is a valid charecter adds it to the grid
  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
    return
  }
}
//if called, restarts game
function PlayAgain(){
  if(GameState!= GameState.playing){

  }
}
//if activated tiles is not longer than word length place word in tile, else stop function
function pressKey(key) {
  const activeTiles = getActiveTiles()
  if (activeTiles.length <= WordLength){ 
    const nextTile = guessGrid.querySelector(":not([data-letter])")
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.textContent = key
  nextTile.dataset.state = "active"
    
  }
  return
}
//if you cant go backwords when delete, return, else remove content of last box
function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile != null) {
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
  }
  return
  
}
//if all boxes in row contain a charecter, and all adds up to a valid word in the list than submits the guess, otherwise returns
function submitGuess() {
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WordLength) {
    showAlert("Not enough letters")
    shakeTiles(activeTiles)
    return
  }
 // makes box value the key that was enterd
  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")
  // alerts you if word enterd is not in the list
  if (!dictionary.includes(guess)) {
    showAlert("Not in word list")
    shakeTiles(activeTiles)
    return
  }
  
  stopInteraction()
  activeTiles.forEach((...params) => flipTile(...params, guess))
}
// flips tiles animation when valid word guessed
function flipTile(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add("flip")
  }, (index * flipAnimeTime) / 2)
  // gives box's class depending on weither or not the guessed letter is correct, incorrect, or incorrect positon
  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip")
      if (targetWord[index] === letter) {
        tile.dataset.state = "correct"
        key.classList.add("correct")
      } else if (targetWord.includes(letter)) {
        tile.dataset.state = "wrong-location"
        key.classList.add("wrong-location")
      } else {
        tile.dataset.state = "wrong"
        key.classList.add("wrong")
      }
      //checks if answer is correct or incorrect from the list
      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}
//gets the active tiles from the tiles
function getActiveTiles() {
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
//shakes tiles if invalid guess is sumbittedS
function shakeTiles(tiles) {
  tiles.forEach(tile => {
    tile.classList.add("shake")
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake")
      },
      { once: true }
    )
  })
}
//checks if you have won, if so, plays a dance animation on tiles.
function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    showAlert("You Win", 5000)
    danceTiles(tiles)
    stopInteraction()
    
    return
  }
  // checks how many words it took to guess or not guess it, than stops interaction
  const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
  if (remainingTiles.length === 0) {
    showAlert(targetWord.toUpperCase(), null)
    stopInteraction()
  }
}
// if game won, plays animation dance tiles
function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance")
        },
        { once: true }
      )
    }, (index * danceAnimeTime) / 5)
  })
}
