const outputDiv = document.getElementById("outputDiv");
const rainbowColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];
const selectedColors = [];
let testColors = [];
let intervalId; // Variable to store the interval ID

const updateSelectedColours = () => {
  selectedColors.length = 0;
  rainbowColors.forEach((colour) => {
    const checkbox = document.getElementById(`${colour}Checkbox`);
    if (checkbox.checked) selectedColors.push(colour);
  });
};

rainbowColors.forEach((colour) => {
  const checkbox = document.getElementById(`${colour}Checkbox`);
  checkbox.addEventListener("change", updateSelectedColours);
});

const inputField = document.getElementById("fpsInputField");
const testBtn = document.getElementById("testBtn");
const infoTag = document.getElementById("infoTag");

let changeSpeed = 1000 / 60;

testBtn.addEventListener("click", () => {
  const secondsDenominator = inputField.value;
  changeSpeed = Math.round(1000 / secondsDenominator);
  testColors = selectedColors;

  // Clear the existing interval
  clearInterval(intervalId);

  // Create a new interval with the updated speed
  intervalId = setInterval(changeColor, changeSpeed);
});

let i = 0;
const changeColor = () => {
  if (testColors.length == 0) {
    outputDiv.innerHTML = "<p>select colour</p>";
    outputDiv.style.backgroundColor = "white";
  } else {
    outputDiv.style.backgroundColor = testColors[i];
    i = (i + 1) % testColors.length;
    outputDiv.innerHTML = "";
    infoTag.innerHTML = `It is ${
      inputField.value
    }fps, which means one frame is taking about ${(
      1 / inputField.value
    ).toFixed(2)} seconds to change`;
  }
};

// Initial setup
intervalId = setInterval(changeColor, changeSpeed);

const toggleThemeBtn = document.getElementById("ToggleThemeBtn");
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
