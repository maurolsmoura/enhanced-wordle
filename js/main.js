import game from "./game.js";
import board from "./board.js";
import popUps from "./popUps.js";


document.addEventListener("DOMContentLoaded", function () {
    board.createSquares()
    board.createKeyboard()
    // popUps.settingsPopUp()
    game.clearGame()
    game.activateGame()
})