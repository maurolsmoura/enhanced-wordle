import wordsList from "./wordsList.js";

const getWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const [word, diacritic] = wordsList[randomIndex];
    return { word: word.toUpperCase(), diacritic: diacritic.toUpperCase() };
}

const checkExistingWord = (word) => {
    return wordsList.some(el => el[0] === word.toLowerCase());
}

const getLettersComparison = (triedWord, word) => {
    const wordArr = word.split('');
    const triedWordArr = triedWord.split('');
    const lettersCount = wordArr.reduce((acc, letter) => {
        acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
        return acc;
    }, {});

    const results = []
    for (var i = 0; i < triedWordArr.length; i++) {

        if (!wordArr.includes(triedWordArr[i])) {
            results.push("wrong");
            continue
        }
        if (lettersCount[triedWordArr[i]]) {
            lettersCount[triedWordArr[i]]--;
            if (triedWordArr[i] === wordArr[i]) {
                results.push("correct");
            } else {
                results.push("misplaced");
            }
            continue
        }
        results.push("wrong");
    }
    return results;
}

export default { getWord, checkExistingWord, getLettersComparison };
