let selectedColor = "red";
let previousColor = document.querySelector("#defaultColor");

function addCanvas() {
  const canvas = document.querySelector(".canvas");
  for (let i = 0; i < 256; i++) {
    let div = document.createElement("div");
    div.classList.add("grid-item");
    div.style.backgroundColor = "white";
    canvas.append(div);
  }
}

function addListeners() {
  const canvasItems = document.querySelector(".canvas").children;
  const palleteItems = document.querySelector(".pallete").children;

  for (let item of canvasItems) {
    item.addEventListener("click", (e) => {
      const div = e.target;
      div.style.backgroundColor = selectedColor;
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
}

addCanvas();
addListeners();
