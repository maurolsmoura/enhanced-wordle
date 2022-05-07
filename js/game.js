import words from "./words.js";

const triedWords = ['']
const word = words.getWord();
const colors = {
    correct: '#3aa394',
    misplaced: '#d3ad69',
    wrong: '#312a2c'
}

/*TODO: Fácil -> Deixar mais tentativas e pintar o teclado e palavras mais fáceis
Médio: só pintar o teclado e palavras mais fáceis
Difícil: não pintar o teclado
Super difícil: não pintar o teclado e não deixar mais tentativas
Ou melhor: fazer uma configuração para o nível de dificuldade
*/

const animateResults = (comparisonResults, triedDiacritic) => {
    const firstIndex = (triedWords.length - 1) * 5
    for (var i = firstIndex; i < firstIndex + 5; i++) {
        const squareEl = document.getElementById(i);
        squareEl.classList.add("animate__flipInX");
        squareEl.style.backgroundColor = colors[comparisonResults[i - firstIndex]];
    }
}

const processAnswer = () => {

    const triedWord = triedWords[triedWords.length - 1];
    const triedDiacritic = words.getDiacriticWord(triedWord);
    if (!triedDiacritic) {
        alert("Not a word!")
        return
    }

    const comparisonResults = words.getLettersComparison(triedWord, word)
    animateResults(comparisonResults, triedDiacritic);
    if (triedWord === word) {
        alert('You won!')
    }
    if (triedWords.length === 6) {
        alert(`Game over! The word was ${words.getDiacriticWord(word)}`)
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