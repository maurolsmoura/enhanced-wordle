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