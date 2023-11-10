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

function generateColorPallete() {
  for (let i = 0; i < 13; i++) {
    const pallete = document.querySelector('.pallete')
    const newColorItem = document.createElement('div')
    
    newColorItem.classList.add('grid-item', 'color')
    assignRandomColor(newColorItem)
    
    newColorItem.addEventListener("click", (e) => {
        const div = e.target;
        selectedColor = div.style.backgroundColor;
        
        previousColor.classList.remove("selectedColor");
        
        div.classList.add("selectedColor");
        
        previousColor = div;
    });

    pallete.append(newColorItem)
  }
}

function addCanvas() {
  const canvas = document.querySelector(".canvas");
  for (let i = 0; i < 256; i++) {
    let div = document.createElement("div");
    div.classList.add("grid-item");
    div.style.backgroundColor = "white";
    canvas.append(div);
  }
}

function wipeCanvas() {
  const canvas = document.querySelector(".canvas");
  for (let box of canvas.children) {
    box.style.backgroundColor = "white";
  }
}

function addListeners() {
  const canvasItems = document.querySelector(".canvas").children;
  const palleteItems = document.querySelector(".pallete").children;

  for (let item of canvasItems) {
    item.addEventListener("mousedown", (e) => {
      const div = e.target;
      div.style.backgroundColor = selectedColor;
    });
  }

  for (let item of canvasItems) {
    item.addEventListener("mouseover", (e) => {
      if (e.buttons) {
        const div = e.target;

        div.style.backgroundColor = selectedColor;
      }
    });
  }

  for (let item of palleteItems) {
    item.addEventListener("click", (e) => {
      const div = e.target;
      selectedColor = div.style.backgroundColor;

      previousColor.classList.remove("selectedColor");

      div.classList.add("selectedColor");

      previousColor = div;
    });
  }

  const resetButton = document.querySelector("#resetButton");
  const generateButton = document.querySelector("#generateColorButton");
  
  resetButton.addEventListener("click", (e) => {
    wipeCanvas();
  });
  generateButton.addEventListener("click", (e) => {
    generateColorPallete();
  });
}

addCanvas();
addListeners();
