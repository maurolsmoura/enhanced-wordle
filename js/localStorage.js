const saveResults = () => {
    const results = {
        tries: window.currentWord + 1,
        triedWords: window.triedWords,
        word: window.diacritic,
        win: window.triedWords.includes(window.word.toUpperCase()),
        startTime: window.startTime,
        endTime: new Date(),
        elapsedTime: new Date() - window.startTime
    }

    const resultsListStr = window.localStorage.getItem('results') ?? null
    const resultsList = resultsListStr ? JSON.parse(resultsListStr) : []
    resultsList.push(results)
    window.localStorage.setItem('results', JSON.stringify(resultsList))
}

const getResults = () => {
    const resultsList = JSON.parse(window.localStorage.getItem('results')) ?? []
    const totalTime = resultsList.reduce((acc, cur) => acc + cur.elapsedTime, 0)
    const firstPlay = resultsList[0]?.startTime
    const totalGames = resultsList.length
    const totalWordsList = resultsList.reduce((acc, cur) => acc.concat(cur.triedWords), [])
    const totalWords = totalWordsList.length
    const totalWins = resultsList.filter(r => r.win).length
    const winsStats = [1, 2, 3, 4, 5].map(i => {
        const wins = resultsList.filter(r => r.tries === i).filter(r => r.win).length
        return { tries: i, wins }
    })
    const mostTriedWord = totalWordsList.sort((a, b) =>
        totalWordsList.filter(v => v === a).length
        - totalWordsList.filter(v => v === b).length
    ).pop();

    return {
        totalTime,
        firstPlay,
        totalGames,
        totalWords,
        totalWins,
        winsStats,
        mostTriedWord
    }
}

export default { saveResults, getResults }