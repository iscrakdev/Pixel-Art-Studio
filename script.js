let selectedColor = 'red'

function addListeners() {
    const gridItems = document.querySelector('.canvas').children

    for (let item of gridItems) {
        item.addEventListener('click', e => {
            const div = e.target
            div.style.backgroundColor = selectedColor
        })
    }
}

addListeners()