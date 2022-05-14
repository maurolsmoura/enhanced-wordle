import words from "./words.js";
import popUps from "./popUps.js";
import utils from "./utils.js";

const clearGame = () => {
    window.triedWords = ['']
    window.word = words.getWord();
}

/*TODO: Fácil -> Deixar mais tentativas e pintar o teclado e palavras mais fáceis
Médio: só pintar o teclado e palavras mais fáceis
Difícil: não pintar o teclado
Super difícil: não pintar o teclado e não deixar mais tentativas
Ou melhor: fazer uma configuração para o nível de dificuldade
*/


const animateResults = async (comparisonResults, triedDiacritic) => {
    const firstIndex = (triedWords.length - 1) * 5
    for (var i = firstIndex; i < firstIndex + 5; i++) {
        const squareEl = document.getElementById(i);
        squareEl.classList.add("animate__flipInX");
        squareEl.setAttribute("result", comparisonResults[i - firstIndex])
        squareEl.innerHTML = triedDiacritic[i - firstIndex];
        await utils.wait(75);
    }
}

const colorKeyboard = (comparisonResults, triedWord) => {
    // We need to priorize the correct ones
    triedWord.split('').forEach((letter, index) => {
        const key = document.querySelector(`[data-key="${letter}"]`);
        const keyStatus = key.getAttribute('result')
        if (keyStatus === "correct") return
        if (comparisonResults[index] === 'correct') {
            key.setAttribute("result", "correct");
            return
        }
        if (comparisonResults[index] === 'misplaced') {
            key.setAttribute("result", "misplaced");
            return
        }
        if (keyStatus === "misplaced") return
        key.setAttribute("result", "wrong");
    })
}

const processAnswer = async () => {
    const triedWord = triedWords[triedWords.length - 1];
    if (triedWord.length < 5) return
    const triedDiacritic = words.getDiacriticWord(triedWord);
    if (!triedDiacritic) {
        popUps.toastAlert(triedWord)
        return
    }

    const comparisonResults = words.getLettersComparison(triedWord, word)
    await animateResults(comparisonResults, triedDiacritic);
    colorKeyboard(comparisonResults, triedWord);
    if (triedWord === word) {
        popUps.endgamePopUp(true)
        return
    }
    if (triedWords.length === 6) {
        popUps.endgamePopUp(false)
    }
    triedWords.push('')
}

const updateLastWord = () => {
    const lastWord = triedWords[triedWords.length - 1]
    const firstIndex = (triedWords.length - 1) * 5
    for (var i = firstIndex; i < firstIndex + 5; i++) {
        const squareEl = document.getElementById(i);
        squareEl.innerHTML = lastWord[i - firstIndex] || '';
    }
}

const insertLetter = (letter) => {
    if (triedWords[triedWords.length - 1].length >= 5) return
    triedWords[triedWords.length - 1] = triedWords[triedWords.length - 1].concat(letter);
    updateLastWord()
}

const removeLastLetter = () => {
    if (triedWords[triedWords.length - 1].length === 0) return
    triedWords[triedWords.length - 1] = triedWords[triedWords.length - 1].slice(0, -1);
    updateLastWord()
}

const keyClick = (keyElement) => {
    const key = keyElement.target;
    const keyValue = key.getAttribute("data-key");
    if (keyValue === "backspace") { removeLastLetter(); return }
    if (keyValue === "enter") { processAnswer(); return }
    insertLetter(keyValue);
}

const keyListener = (keyPressed) => {
    const key = keyPressed.code;
    const keyValue = key.replace('Key', '').toLowerCase();
    if (keyValue === "backspace") { removeLastLetter(); return }
    if (keyValue === "enter") { processAnswer(); return }
    if (/^[a-z]$/.test(keyValue)) { insertLetter(keyValue.toUpperCase()); }
}

const activateGame = () => {
    const keys = document.querySelectorAll(".keyboard-row button");
    keys.forEach(key => {
        key.addEventListener("click", keyClick)
    })

    //Activate keyboard keys
    document.addEventListener('keyup', keyListener)
}

export default { activateGame, clearGame }