import words from "./words.js";
import popUps from "./popUps.js";
import utils from "./utils.js";
import localStorage from "./localStorage.js";

const clearGame = () => {
    window.triedWords = ['']
    window.word = words.getWord();
    window.currentWord = 0
}

/*TODO: Fácil -> Deixar mais tentativas e pintar o teclado e palavras mais fáceis
Médio: só pintar o teclado e palavras mais fáceis
Difícil: não pintar o teclado
Super difícil: não pintar o teclado e não deixar mais tentativas
Ou melhor: fazer uma configuração para o nível de dificuldade
*/
const getLetterRow = (letterId) => Math.floor(letterId / 5)

const animateResults = async (comparisonResults, triedDiacritic) => {
    const firstIndex = (window.currentWord) * 5
    for (var i = firstIndex; i < firstIndex + 5; i++) {
        const squareEl = document.getElementById(i);
        squareEl.classList.add("animate__flipInX");
        squareEl.classList.remove("selected");
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
    const triedWord = window.triedWords[window.currentWord];
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
        localStorage.saveResults()
        popUps.endgamePopUp(true)
        return
    }
    if (window.currentWord === 5) {
        localStorage.saveResults()
        popUps.endgamePopUp(false)
        return
    }
    window.currentWord += 1
    const nextSquare = document.getElementById(window.currentWord * 5);
    if (nextSquare) {
        selectSquare(nextSquare)
    }
}

const updateTriedWords = () => {
    const triedWords = []
    for (var i = 0; i <= window.currentWord; i++) {
        const letters = []
        for (var j = 0; j < 5; j++) {
            const id = i * 5 + j
            const letter = document.getElementById(id).innerHTML
            if (letter) letters.push(letter)
        }
        triedWords.push(letters.join(''))
    }
    window.triedWords = triedWords
}

const selectSquare = (squareEl) => {
    if (squareEl.currentTarget) squareEl = squareEl.currentTarget;
    const squareId = squareEl.id

    const minIndex = window.currentWord * 5
    const maxIndex = minIndex + 5
    if (squareId < minIndex || squareId >= maxIndex) return

    if (squareEl.classList.contains("selected")) return
    document.querySelectorAll(".square.selected").forEach(square => {
        square.classList.remove("selected");
    })
    squareEl.classList.add("selected");
}

const insertLetter = (letter) => {
    const selectedSquare = document.querySelector(".square.selected");
    if (!selectedSquare) return
    if (!selectedSquare.innerHTML && window.triedWords[window.currentWord]?.length === 5) return
    selectedSquare.innerHTML = letter;
    updateTriedWords()

    if (getLetterRow(parseInt(selectedSquare.id) + 1) > window.currentWord) {
        // If it's gonna change the row, look for empty letters in same row
        const emptySquare = Array.from(document.querySelectorAll('.square')).find(el => {
            return el.innerHTML === '' && getLetterRow(el.id) === getLetterRow(selectedSquare.id)
        });
        if (emptySquare) {
            selectSquare(emptySquare)
            return
        }
    }
    if ((parseInt(selectedSquare.id) + 1) % 5 === 0) {// If it's the last square, don't select the next
        return
    }
    let nextSquare = document.getElementById(parseInt(selectedSquare.id) + 1);
    selectSquare(nextSquare)
}

const removeSelectedLetter = () => {
    if (!window.triedWords[window.currentWord]?.length) return
    let selectedSquare = document.querySelector(".square.selected");
    if (!selectedSquare) {
        const lastSquare = document.getElementById((window.currentWord) * 5);
        selectedSquare = lastSquare
    }
    if (selectedSquare.getAttribute('result')) return
    if (selectedSquare.innerHTML) {
        selectedSquare.innerHTML = ''
        updateTriedWords()
        return
    }
    const previousSquare = document.getElementById(parseInt(selectedSquare.id) - 1);
    if (!previousSquare) return
    previousSquare.innerHTML = '';
    updateTriedWords()
    selectSquare(previousSquare)
}

const keyClick = (keyElement) => {
    const key = keyElement.target;
    const keyValue = key.getAttribute("data-key");
    if (keyValue === "backspace") { removeSelectedLetter(); return }
    if (keyValue === "enter") { processAnswer(); return }
    insertLetter(keyValue);
}

const keyListener = (keyPressed) => {
    const key = keyPressed.code;
    const keyValue = key.replace('Key', '').toLowerCase();
    if (keyValue === "backspace") { removeSelectedLetter(); return }
    if (keyValue === "enter") { processAnswer(); return }
    if (/^[a-z]$/.test(keyValue)) { insertLetter(keyValue.toUpperCase()); }
}

const activateGame = () => {
    window.startTime = new Date()
    const keys = document.querySelectorAll(".keyboard-row button");
    keys.forEach(key => {
        key.addEventListener("click", keyClick)
    })
    //Activate squares selectors
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("click", selectSquare)
    })
    selectSquare(document.getElementById('0'))

    //Activate keyboard keys
    document.addEventListener('keyup', keyListener)
}

export default { activateGame, clearGame }