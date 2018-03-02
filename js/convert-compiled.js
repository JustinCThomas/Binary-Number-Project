"use strict";

var numbers = document.getElementsByClassName("number");
var numberBoxes = document.getElementsByClassName("number-box");
var format = document.getElementById("format");
var value = document.getElementById("value");
var swap = document.getElementById("swap");
var correctness = document.getElementById("correctness");
var newProblem = document.getElementById("new-problem");
var convertToBinary = true;

init();

function init() {
  gameLogic();
  newProblemEvent();
  swapFormatEvent();
}

function gameLogic() {
  setupGame();
  addBoxEvents();
}

function getRandomNum() {
  var randomNum = Math.floor(Math.random() * 256);
  return randomNum;
}

function setupGame() {
  var x = Math.floor(Math.random() * numbers.length);

  if (convertToBinary) {
    for (var i = 0; i < numbers.length; i++) {
      var randomNum = getRandomNum();
      numbers[i].textContent = randomNum.toString(2);
      if (x === i) {
        chooseEquation(randomNum);
      }
    }
  } else {
    for (var _i = 0; _i < numbers.length; _i++) {
      var _randomNum = getRandomNum();
      numbers[_i].textContent = _randomNum;
      if (x === _i) {
        chooseEquation(_randomNum.toString(2));
      }
    }
  }
}

function chooseEquation(selectedNum) {
  value.textContent = selectedNum;
}

function addBoxEvents() {
  for (var i = 0; i < numberBoxes.length; i++) {
    numberBoxes[i].addEventListener('click', check);
  }
}

function check() {
  if (convertToBinary ? parseInt(this.textContent, 2) === parseInt(value.textContent, 10) : parseInt(this.textContent, 10) === parseInt(value.textContent, 2)) {
    correctness.textContent = "Correct!";
    this.style.backgroundColor = "gold";
    removeBoxEvents();
  } else {
    this.style.backgroundColor = "red";
    correctness.textContent = "Incorrect!";
  }
}

function removeBoxEvents() {
  for (var i = 0; i < numberBoxes.length; i++) {
    numberBoxes[i].removeEventListener('click', check);
  }
}

function swapFormatEvent() {
  swap.addEventListener('click', function () {
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
  newProblem.addEventListener('click', function () {
    correctness.textContent = "";
    for (var i = 0; i < numberBoxes.length; i++) {
      numberBoxes[i].style.backgroundColor = "rgb(40, 200, 40)";
    }
    gameLogic();
  });
}
