import wordsList from "./wordsList.js";

const getWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const [word] = wordsList[randomIndex];
    return word.toUpperCase();
}

const getDiacriticWord = (word) => {
    const wordComponent = wordsList.find(el => el[0] === word.toLowerCase());
    return wordComponent ? wordComponent[1].toUpperCase() : null;
}

const getLettersComparison = (triedWord, word) => {
    const wordArr = word.split('');
    const triedWordArr = triedWord.split('');
    const lettersCount = wordArr.reduce((acc, letter) => {
        acc[letter] = acc[letter] ? acc[letter] + 1 : 1;
        return acc;
    }, {});

    const results = []
    const correctIndexes = triedWordArr.map((letter, index, arr) => {
        if (wordArr[index] === letter) {
            lettersCount[arr[index]]--
            return index
        }
    }).filter(el => el !== undefined);


    for (var i = 0; i < triedWordArr.length; i++) {

        if (correctIndexes.includes(i)) {
            results.push('correct');
            continue
        }
        if (!wordArr.includes(triedWordArr[i])) {
            results.push("wrong");
            continue
        }
        if (lettersCount[triedWordArr[i]]) {
            lettersCount[triedWordArr[i]]--;
            results.push("misplaced");
            continue
        }
        results.push("wrong");
    }
    return results;
}

export default { getWord, getDiacriticWord, getLettersComparison };
