
function createSquares() {
    const gameBoard = document.getElementById("board");
    for (let i = 0; i < 30; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", i);
        gameBoard.appendChild(square);
    }
}

function createKeyboard() {
    const keysRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]
    const container = document.getElementById("keyboard-container");
    for (let i = 0; i < keysRows.length; i++) {
        const row = document.createElement("div");
        row.classList.add("keyboard-row");
        container.appendChild(row);
        for (let j = 0; j < keysRows[i].length; j++) {
            const key = document.createElement("button");
            key.setAttribute("data-key", keysRows[i][j]);
            key.innerHTML = keysRows[i][j];
            container.children[i].appendChild(key);
        }
    }

    // add backspace
    const backspaceKey = document.createElement("button");
    backspaceKey.setAttribute("data-key", "backspace");
    backspaceKey.setAttribute("class", "wide-button")
    backspaceKey.innerHTML = '&#8592'
    container.children[1].appendChild(backspaceKey);
    //add enter
    const enterKey = document.createElement("button");
    enterKey.setAttribute("data-key", "enter");
    enterKey.setAttribute("class", "wide-button")
    enterKey.innerHTML = "Enter&#8626";
    container.children[2].appendChild(enterKey);
}

export default { createSquares, createKeyboard };