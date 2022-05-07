const endgamePopUp = (success) => {
    const word = window.word
    const wordArr = word.split('')
    const popUp = document.createElement("div")
    popUp.classList.add("pop-up")

    // create header
    const popUpHeader = document.createElement("div")
    popUpHeader.classList.add("pop-up-header")
    popUpHeader.innerHTML = success ? "VOCÊ GANHOU!" : "VOCÊ PERDEU!"
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



export default { endgamePopUp }