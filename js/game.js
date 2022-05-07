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

const wait = async (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

const animateResults = async (comparisonResults, triedDiacritic) => {
    const firstIndex = (triedWords.length - 1) * 5
    for (var i = firstIndex; i < firstIndex + 5; i++) {
        const squareEl = document.getElementById(i);
        squareEl.classList.add("animate__flipInX");
        squareEl.style.backgroundColor = colors[comparisonResults[i - firstIndex]];
        squareEl.innerHTML = triedDiacritic[i - firstIndex];
        await wait(75);
    }
}

const colorKeyboard = (comparisonResults, triedWord) => {
    // We need to priorize the correct ones
    triedWord.split('').forEach((letter, index) => {
        const key = document.querySelector(`[data-key="${letter}"]`);
        const keyColor = key.style.backgroundColor
        if (keyColor === colors.correct) return
        if (comparisonResults[index] === 'correct') {
            key.style.backgroundColor = colors.correct;
            return
        }
        if (comparisonResults[index] === 'misplaced') {
            key.style.backgroundColor = colors.misplaced;
            return
        }
        if (keyColor === colors.misplaced) return
        key.style.backgroundColor = colors.wrong;
    })
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
    colorKeyboard(comparisonResults, triedWord);
    if (triedWord === word) {
        alert('You won!')
    }
    if (triedWords.length === 6) {
        alert(`Game over! The word was ${words.getDiacriticWord(word)}`)
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
    console.log(key)
    const keyValue = key.replace('Key', '').toLowerCase();
    if (keyValue === "backspace") { removeLastLetter(); return }
    if (keyValue === "enter") { processAnswer(); return }
    if (/[a-z]/.test(keyValue)) { insertLetter(keyValue.toUpperCase()); }
}

export default () => {
    const keys = document.querySelectorAll(".keyboard-row button");
    keys.forEach(key => {
        key.addEventListener("click", keyClick)
    })

    //Activate keyboard keys
    document.addEventListener('keyup', keyListener)
}