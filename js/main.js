import activateGame from "./game.js";
import board from "./board.js";

document.addEventListener("DOMContentLoaded", function () {
    board.createSquares()
    board.createKeyboard()
    activateGame()
})