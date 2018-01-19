let numbers = document.getElementsByClassName("number");
let numberBoxes = document.getElementsByClassName("number-box");
let format = document.getElementById("format");
let value = document.getElementById("value");
let swap = document.getElementById("swap");
let correctness = document.getElementById("correctness");
let newProblem = document.getElementById("new-problem");
let convertToBinary = true;

init();

function init() {
  gameLogic()
  newProblemEvent();
  swapFormatEvent();
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

  if (convertToBinary) {
    for (let i = 0; i < numbers.length; i++) {
      let randomNum = getRandomNum();
      numbers[i].textContent = randomNum.toString(2);
      if (x === i) {
        chooseEquation(randomNum);
      }
    }
  } else {
    for (let i = 0; i < numbers.length; i++) {
      let randomNum = getRandomNum();
      numbers[i].textContent = randomNum;
      if (x === i) {
        chooseEquation(randomNum.toString(2));
      }
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
  if (convertToBinary ?
    ( (parseInt(this.textContent, 2)) === (parseInt(value.textContent, 10)) )
    :( (parseInt(this.textContent, 10)) === (parseInt(value.textContent, 2)) )  )
   {
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

function swapFormatEvent() {
  swap.addEventListener('click', function() {
    if (convertToBinary) {
      convertToBinary = false;
      format.innerText = "base 10?";
    } else {
      convertToBinary = true;
      format.innerText = "binary?";
    }
    newProblem.click();
  });
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
