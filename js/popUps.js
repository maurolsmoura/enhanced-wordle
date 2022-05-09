import words from "./words.js"

const endgamePopUp = (success) => {
    const word = window.word
    const diacritic = words.getDiacriticWord(word)
    const wordArr = diacritic.split('')
    const popUp = document.createElement("div")
    popUp.classList.add("pop-up")

    // create header
    const popUpHeader = document.createElement("div")
    popUpHeader.classList.add("pop-up-header")
    popUpHeader.innerHTML = success ? "VOCÊ GANHOU!" : "A PALAVRA ERA:"
    popUp.appendChild(popUpHeader)

    //create words squares
    const wordsSquaresContainer = document.createElement("div")
    wordsSquaresContainer.classList.add("word-squares-container")
    for (var i = 0; i < wordArr.length; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("result");
        square.classList.add('animate__animated')
        square.classList.add("animate__flipInX");
        square.innerHTML = wordArr[i]
        wordsSquaresContainer.appendChild(square);
    }
    popUp.appendChild(wordsSquaresContainer)

    // create footer
    const popUpFooter = document.createElement("div")
    popUpFooter.classList.add("pop-up-footer")
    popUpFooter.innerHTML = "Clique para jogar novamente"
    popUp.appendChild(popUpFooter)

    document.body.appendChild(popUp)

    //create overlay
    const popUpOverlay = document.createElement("div")
    popUpOverlay.setAttribute("id", "overlay")
    document.body.appendChild(popUpOverlay)

    document.addEventListener("click", (target) => {
        document.location.reload(true);
    })
    document.addEventListener("keypress", (target) => {
        document.location.reload(true);
    })
}

const removeToasts = () => {
    const toasts = document.querySelectorAll(".toast-container")
    toasts.forEach(toast => {
        toast.remove()
    })
}

const toastAlert = (triedWord) => {
    removeToasts()
    const upperToast = document.createElement("div")
    upperToast.classList.add("toast-container")
    const toastBody = document.createElement("div")
    toastBody.classList.add("toast-body")
    toastBody.innerHTML = `Não conheço a palavra ${triedWord}`
    upperToast.appendChild(toastBody)
    upperToast.classList.add('animate__animated')
    upperToast.classList.add("animate__slideInDown");
    const game = document.getElementById("game")
    game.appendChild(upperToast)

    setTimeout(() => {
        upperToast.classList.remove("animate__slideInDown");
        upperToast.classList.add("animate__fadeOutUp");
    }, 2000)
}

const settingsPopUp = () => {

    const popUp = document.createElement("div")
    popUp.classList.add("pop-up")

    // create header
    const popUpHeader = document.createElement("div")
    popUpHeader.classList.add("pop-up-header")
    popUpHeader.innerHTML = "SELECIONE A DIFICULDADE"
    popUp.appendChild(popUpHeader)

    //create levels buttons
    const levelsContainer = document.createElement("div")
    levelsContainer.classList.add("levels-container")
    const easy = document.createElement("button");
    easy.classList.add("level");
    easy.innerHTML = "FÁCIL"
    levelsContainer.appendChild(easy);
    const medium = document.createElement("button");
    medium.classList.add("level");
    medium.classList.add("selected");
    medium.innerHTML = "MÉDIO"
    levelsContainer.appendChild(medium);
    const hard = document.createElement("button");
    hard.classList.add("level");
    hard.innerHTML = "DIFÍCIL"
    levelsContainer.appendChild(hard);
    popUp.appendChild(levelsContainer)

    // create footer
    const popUpFooter = document.createElement("button")
    popUpFooter.classList.add("settings-button")
    popUpFooter.innerHTML = "OK"
    popUp.appendChild(popUpFooter)

    document.body.appendChild(popUp)

    //create overlay
    const popUpOverlay = document.createElement("div")
    popUpOverlay.setAttribute("id", "overlay")
    document.body.appendChild(popUpOverlay)

    document.addEventListener("click", (target) => {
        document.location.reload(true);
    })
    document.addEventListener("keypress", (target) => {
        document.location.reload(true);
    })
}


export default { endgamePopUp, toastAlert, settingsPopUp }