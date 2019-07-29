//Array of Cards
let cards = ["images/monkfish.jpg","images/monkfish.jpg","images/swordfish.jpg","images/swordfish.jpg","images/starfish.jpeg","images/starfish.jpeg","images/bluefintuna.jpg","images/bluefintuna.jpg","images/lobster.jpg","images/lobster.jpg"]

//Shuffle cards
knuthShuffle(cards)
// console.log(cards)
//Fisher–Yates Shuffle OR knuth shuffle (same)
// https://www.npmjs.com/package/knuth-shuffle

// counts
let turnCount = 0
let matchedCount = 0
let scoreboardScore = 0

function checkWin(matchedCount){
  return matchedCount >= 10 ? true:false
}

function checkEvenB4CheckMatch(){
  return turnCount%2 === 0 ? true:false
}

function removeClassSelected(elements){
  elements.forEach((element) => {
    element.classList.remove("selected")
  })
}

// @onclick of each card:
// 1) change innerText to array's index, 2) increase turnCount, 3) add classList "selected", 4) run checkEvenB4CheckMatch()
let deck = document.querySelectorAll('.card')
deck.forEach((element, i) => {
  element.onclick = function(){
    //"guard" - to shortcircuit
    if (element.classList.contains("selected")) return
    //guardEnds
    element.src = cards[i]
    turnCount += 1
    console.log(turnCount)
    element.classList.add("selected")
    if (checkEvenB4CheckMatch()){
      checkMatch()
    }
    if (checkWin(matchedCount)){
      document.querySelector(".title").classList.add("matched")
      scoreboardScore += 1
      console.log("scoreboardScore",scoreboardScore)
      alert("You Won!!! Add your TROPHY to the Scoreboard!")
    }
  }
})

//if match, then 1) classList add "matched", 2) no longer onclicka-able, and 3) removeClassSelected()
//if not match, then setTimeout in 1 sec do... 1) flip card back and 2) removeClassSelected()
function checkMatch(){
  let selected = document.querySelectorAll(".selected")
  //querySelectorAll returns array, need LOOP (ex.forEach) to do stuff
  if (selected[0].src === selected[1].src){
    selected.forEach((element) => {
      element.classList.add("matched")
      //prevent click b/c turnCount gets wrong
      element.onclick = null
    })
    matchedCount += 2
    console.log("matchedCount", matchedCount)
    removeClassSelected(selected)
  } else {
    setTimeout(() =>{
      //flip card back
      selected.forEach((element) => {
        element.src = "images/water.jpg"
      })
      removeClassSelected(selected)
    }, 500)
    //setTimeout(function(){}, time)
  }
}

// CURRENT PLAYER - DISPLAY/UPDATE NAME
let button = document.querySelector("button")
button.addEventListener("click", () => {
  let input = document.querySelector("input").value
  console.log(input)
  document.querySelector(".currentPlayerName").innerHTML = input
})

var addOneToScore = document.getElementsByClassName("fa-trophy");
Array.from(addOneToScore).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        console.log("name",name)
        const score = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        console.log("score",score)
        fetch('scoreIncrease', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          //changing to JSON format to send from client to server
          body: JSON.stringify({
            'addedplayer':name,
            'score':score
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

let trash = document.getElementsByClassName("fa-ban")
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        console.log("name",name)


        // messages end point
        fetch('removePlayerData', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'addedplayer': name,
            // 'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
