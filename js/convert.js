let numbers = document.getElementsByClassName("number");
let numberBoxes = document.getElementsByClassName("number-box");
let value = document.getElementById("value");
let correctness = document.querySelector("#correctness");
let newProblem = document.getElementById("new-problem");

init();

function init() {
  gameLogic()
  newProblemEvent();
}

function gameLogic() {
  setupGame();
  addBoxEvents();
}

function getRandomNum() {
  let randomNum = Math.floor(Math.random() * 256);
  return randomNum;
}

function setupGame() {
  let x = Math.floor(Math.random() * numbers.length);

  for (let i = 0; i < numbers.length; i++) {
    let randomNum = getRandomNum();
    numbers[i].textContent = randomNum;
    if (x === i) {
      chooseEquation(randomNum);
    }
  }
}

function chooseEquation(selectedNum) {
  value.textContent = selectedNum;
}

function addBoxEvents() {
  for (let i = 0; i < numberBoxes.length; i++) {
    numberBoxes[i].addEventListener('click', check);
  }
}

function check(){
  if ( (Number(this.textContent)) === (Number(value.textContent)) ) {
    correctness.textContent = "Correct!";
    this.style.backgroundColor = "gold";
    removeBoxEvents();
  } else {
    this.style.backgroundColor = "red";
    correctness.textContent = "Incorrect!";
  }
}

function removeBoxEvents() {
  for (let i = 0; i < numberBoxes.length; i++) {
    numberBoxes[i].removeEventListener('click', check);
  }
}

function newProblemEvent() {
  newProblem.addEventListener('click', function() {
    correctness.textContent = "";
    for (let i = 0; i < numberBoxes.length; i++) {
      numberBoxes[i].style.backgroundColor = "rgb(40, 200, 40)";
    }
    gameLogic();
  });
}
