import words from "./words.js"
import localStorage from "./localStorage.js"

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

    const resultsStats = localStorage.getResults()
    console.log(resultsStats)

    // create text
    const popUpText = document.createElement("div")
    popUpText.classList.add("pop-up-text")
    popUpText.innerHTML = "Clique na tela para jogar novamente"
    popUp.appendChild(popUpText)

    //create buttons
    const buttonsDiv = document.createElement("div")
    buttonsDiv.id = "popUp-buttons-div"

    const helpDiv = document.createElement("div")
    const helpText = document.createElement("p")
    helpText.innerHTML = `Ajuda`
    const helpIcon = document.createElement("i")
    helpIcon.classList.add("fa-regular", "fa-circle-question")
    helpDiv.addEventListener("click", () => {
        // helpPopUp(word)
    })
    helpDiv.appendChild(helpIcon)
    helpDiv.appendChild(helpText)
    buttonsDiv.appendChild(helpDiv)

    const statsDiv = document.createElement("div")
    const statsText = document.createElement("p")
    statsText.innerHTML = 'Estatísticas'
    const statsIcon = document.createElement("i")
    statsIcon.classList.add("fa-solid", "fa-chart-bar")
    statsDiv.addEventListener("click", () => {
        // statsPopUp(resultsStats)
    })
    statsDiv.appendChild(statsIcon)
    statsDiv.appendChild(statsText)
    buttonsDiv.appendChild(statsDiv)

    const levelDiv = document.createElement("div")
    const levelText = document.createElement("p")
    levelText.innerHTML = `Dificuldade`
    const levelIcon = document.createElement("i")
    levelIcon.classList.add("fa-solid", "fa-gears")
    levelDiv.addEventListener("click", () => {
        // levelPopUp(word)
    })
    levelDiv.appendChild(levelIcon)
    levelDiv.appendChild(levelText)
    buttonsDiv.appendChild(levelDiv)
    popUp.appendChild(buttonsDiv)

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
    Swal.fire({
        title: `Não conheço a palavra ${triedWord}`,
        position: 'top',
        showClass: {
            popup: 'animate__animated animate__fadeInDown toast-container',
        },
        background: '#2f2f6e',
        color: '#fff',
        showConfirmButton: false,
        heightAuto: false,
        grow: 'row',
        timer: 2000,
    })
}



export default { endgamePopUp, toastAlert }