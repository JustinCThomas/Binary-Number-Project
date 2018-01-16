let numbers = document.getElementsByClassName("number");
let numberBoxes = document.getElementsByClassName("number-box");
let value1 = document.getElementById("value1");
let value2 = document.getElementById("value2");
let correctness = document.querySelector("#correctness");
let newProblem = document.getElementById("new-problem");
let factorOneMax = document.querySelector("input[name='firstFactorMax']");
let factorTwoMax = document.querySelector("input[name='secondFactorMax']");

init();

function init() {
  gameLogic()
  newProblemEvent();
}

function gameLogic() {
  setupGame();
  addBoxEvents();
}

function getRandomNum1() {
  if ( (parseInt(factorOneMax.value) >= 0 && parseInt(factorOneMax.value) <= 100)
  && (parseInt(factorTwoMax.value) >= 0 && parseInt(factorTwoMax.value) <= 100) ) {
    let randomNum1 = Math.floor(Math.random() * (parseInt(factorOneMax.value) + 1));
    return randomNum1;
  } else {
    let randomNum1 = Math.floor(Math.random() * 101);
    return randomNum1;
  }
}

function getRandomNum2() {
  if ( (parseInt(factorOneMax.value) >= 0 && parseInt(factorOneMax.value) <= 100)
  && (parseInt(factorTwoMax.value) >= 0 && parseInt(factorTwoMax.value) <= 100) ) {
    let randomNum2 = Math.floor(Math.random() * (parseInt(factorTwoMax.value) + 1));
    return randomNum2;
  } else {
    let randomNum2 = Math.floor(Math.random() * 101);
    return randomNum2;
  }
}

function multiply(num1, num2) {
  let answer = num1 * num2;
  let variables = [answer, num1, num2];
  return variables;
}

function setupGame() {
  let x = Math.floor(Math.random() * numbers.length)

  for (let i = 0; i < numbers.length; i++) {
    let arr = multiply(getRandomNum1(), getRandomNum2());
    numbers[i].textContent = arr[0];
    if (x === i) {
      chooseEquation(arr);
    }
  }
}

function chooseEquation(arr) {
  value1.textContent = arr[1];
  value2.textContent = arr[2];
}

function addBoxEvents() {
  for (let i = 0; i < numberBoxes.length; i++) {
    numberBoxes[i].addEventListener('click', check);
  }
}

function check(){
  if ( (Number(this.textContent)) === (Number(value1.textContent) * Number(value2.textContent)) ) {
    correctness.textContent = "Correct!";
    this.style.backgroundColor = "#11d011";
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
