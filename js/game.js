import words from "./words.js";

const triedWords = ['']
const { word, diacritic } = words.getWord();

const processAnswer = () => {

    const triedWord = triedWords[triedWords.length - 1];
    if (!words.checkExistingWord(triedWord)) {
        alert("Not a word!")
        return
    }

    words.getLettersComparison(triedWord, word)
    if (triedWord === word) {
        alert('You won!')
    }
    if (triedWords.length === 6) {
        alert('Game over!')
    }
    triedWords.push('')
}

const updateWords = () => {
    const lettersList = triedWords.join('').split('')
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.innerHTML = lettersList[index] || '';
    })
}

const insertLetter = (letter) => {
    if (triedWords[triedWords.length - 1].length >= 5) return
    triedWords[triedWords.length - 1] = triedWords[triedWords.length - 1].concat(letter);
    updateWords()
}

const removeLastLetter = () => {
    if (triedWords[triedWords.length - 1].length === 0) return
    triedWords[triedWords.length - 1] = triedWords[triedWords.length - 1].slice(0, -1);
    updateWords()
}

const keyListener = (keyElement) => {
    const key = keyElement.target;
    const keyValue = key.getAttribute("data-key");
    if (keyValue === "backspace") { removeLastLetter(); return }
    if (keyValue === "enter") { processAnswer(); return }
    insertLetter(keyValue);
}

export default () => {
    const keys = document.querySelectorAll(".keyboard-row button");
    keys.forEach(key => {
        key.addEventListener("click", keyListener)
    })
}