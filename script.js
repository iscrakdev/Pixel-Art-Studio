let selectedColor = "red";
let previousColor = document.querySelector("#defaultColor");

const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);
const invertColor = (colorHex) =>
  (Number(`0x1${colorHex}`) ^ 0xffffff).toString(16).substr(0, 6);

// Sets the background and text color of an DOM node
const assignRandomColor = function (node) {
  const color = generateRandomColor();
  node.style.backgroundColor = "#" + color;
};

function doesColorExist(color) {
  const allColorBoxes = document.querySelectorAll(".color");
  for (let box of allColorBoxes) {
    if (color === box.style.backgroundColor) {
      console.log("color exists");
      return true;
    }
  }
  return false;
}

function isColorWhite(color) {
  if (color.style.backgroundColor === "") {
    return true;
  }
  return false;
}

function generateColorPallete() {
  for (let i = 0; i < 13; i++) {
    const pallete = document.querySelector(".pallete");
    const newColorItem = document.createElement("div");

    newColorItem.classList.add("grid-item", "color");

    assignRandomColor(newColorItem);
    while (isColorWhite(newColorItem) || doesColorExist(newColorItem)) {
      assignRandomColor(newColorItem);
    }

    newColorItem.addEventListener("click", (e) => {
      const div = e.target;
      selectedColor = div.style.backgroundColor;

      previousColor.classList.remove("selectedColor");

      div.classList.add("selectedColor");

      previousColor = div;
    });

    pallete.append(newColorItem);
  }
}

function addCanvas(x = 16, y = 16) {
  const canvas = document.querySelector(".canvas");
  canvas.style.gridTemplateColumns = `repeat(${x}, auto)`;

  for (let i = canvas.children.length - 1; i >= 0; i--) {
    canvas.removeChild(canvas.children[i]);
  }

  for (let i = 0; i < x * y; i++) {
    let div = document.createElement("div");
    div.classList.add("grid-item");
    div.style.backgroundColor = "white";
    canvas.append(div);
  }

  addCanvasListeners();
}

function wipeCanvas() {
  const canvas = document.querySelector(".canvas");
  for (let box of canvas.children) {
    box.style.backgroundColor = "white";
  }
}

function addCanvasListeners() {
  const canvasItems = document.querySelector(".canvas").children;
  for (let item of canvasItems) {
    item.addEventListener("mousedown", (e) => {
      const div = e.target;
      div.style.backgroundColor = selectedColor;
    });
  }

  for (let item of canvasItems) {
    item.addEventListener("mouseenter", (e) => {
      if (e.buttons) {
        const div = e.target;

        div.style.backgroundColor = selectedColor;
      }
    });
  }
}

function addPalleteListeners() {
  const palleteItems = document.querySelector(".pallete").children;
  for (let item of palleteItems) {
    item.addEventListener("click", (e) => {
      const div = e.target;
      selectedColor = div.style.backgroundColor;

      previousColor.classList.remove("selectedColor");

      div.classList.add("selectedColor");

      previousColor = div;
    });
  }
}

function addButtonListeners() {
  const resetButton = document.querySelector("#resetButton");
  resetButton.addEventListener("click", (e) => {
    wipeCanvas();
  });

  const generateButton = document.querySelector("#generateColorButton");
  generateButton.addEventListener("click", (e) => {
    generateColorPallete();
  });

  const customColor = document.querySelector("#customColor");
  customColor.addEventListener("change", (e) => {
    selectedColor = customColor.value;
    previousColor.classList.remove("selectedColor");
    customColor.classList.add("selectedColor");
    previousColor = customColor;
  });
  customColor.addEventListener("click", (e) => {
    selectedColor = customColor.value;
    previousColor.classList.remove("selectedColor");
    customColor.classList.add("selectedColor");
    previousColor = customColor;
  });
}

function addSizeListeners() {
  const sizeInputs = document.querySelectorAll("#size > div > input");
  for (let input of sizeInputs) {
    input.addEventListener("change", (e) => {
      addCanvas(sizeInputs[0].value, sizeInputs[1].value);
    });
  }
}

function addListeners() {
  addCanvasListeners();
  addPalleteListeners();
  addButtonListeners();
  addSizeListeners();
}

addCanvas();
addListeners();
