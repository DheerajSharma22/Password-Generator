const password = document.querySelector(".password");
const copyBtn = document.getElementById("copy-btn");
const copyTooltip = document.getElementById("copy-tooltip");
const passwordLength = document.getElementById("passwordLength");
const slider = document.getElementById("slider");
const upperCaseCheck = document.getElementById("upperCase");
const lowerCaseCheck = document.getElementById("lowerCase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll('input[type="checkbox"]');

let lengthOfPassword = 10;
let generatedPassword = "";
let checkCount = 0;

handleSlider();

// To handle the slider.
function handleSlider() {
  slider.value = lengthOfPassword;
  passwordLength.innerHTML = lengthOfPassword;
}

// Generate all the random values.
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNum() {
  return generateRandomInt(0, 9);
}

function generateRandomUpperCase() {
  return String.fromCharCode(generateRandomInt(65, 91));
}

function generateRandomLowerCase() {
  return String.fromCharCode(generateRandomInt(97, 123));
}

function generateRandomSymbol() {
  let symbols = "{}[]()-+/*=|&^%$#@!~.,?<>";
  return symbols[generateRandomInt(0, symbols.length)];
}

// Copy content handler.
async function copyContent() {
  try {
    await navigator.clipboard.writeText(password.value);
    copyTooltip.innerText = "Copied";
  } catch (error) {
    copyTooltip.innerText = "Failed";
  }
  copyTooltip.classList.add("active");

  setTimeout(() => {
    copyTooltip.classList.remove("active");
  }, 2000);
}

// Handling the slider change.
slider.addEventListener("input", (e) => {
  lengthOfPassword = e.target.value;
  handleSlider();
});

// Handling copy btn
copyBtn.addEventListener("click", (e) => {
  if (password.value) copyContent();
  else alert("First generate a password.");
});

// Handling CheckBoxes.
const handleCheckBoxes = () => {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  if (checkCount > lengthOfPassword) {
    lengthOfPassword = checkCount;
    handleSlider();
  }
};

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxes);
});

// Function to suffle the password.
const shufflePassword = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * i + 1);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  let str = "";
  arr.forEach((el) => (str += el));
  return str;
};

// Handling generate password btn.
generateBtn.addEventListener("click", (e) => {
  if (checkCount <= 0) return;

  if (lengthOfPassword < checkCount) {
    lengthOfPassword = checkCount;
    handleSlider();
  }

  generatedPassword = "";

  let funcArr = [];

  if (upperCaseCheck.checked) {
    funcArr.push(generateRandomUpperCase);
  }
  if (lowerCaseCheck.checked) {
    funcArr.push(generateRandomLowerCase);
  }
  if (numbersCheck.checked) {
    funcArr.push(generateRandomNum);
  }
  if (symbolsCheck.checked) {
    funcArr.push(generateRandomSymbol);
  }

  for (let i = 0; i < lengthOfPassword; i++) {
    let getRandomFunc = funcArr[generateRandomInt(0, funcArr.length)];
    generatedPassword += getRandomFunc();
  }

  shufflePassword(Array.from(generatedPassword));
  password.value = generatedPassword;
});
