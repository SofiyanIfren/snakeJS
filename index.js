const canvas = document.getElementById("canvas")
const gridSize = 10
let ctx = canvas.getContext("2d")
let currentPosition = [50, 50] // position de depart
let snakeLength = 3 // longueur de depart
let direction = "right" // direction de depart
let snakeBody = [] // tableau contenant les points du corps du serpent
let randomApple = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize]
let score = 0

function initGame(){
    document.getElementById("#score").innerHTML = score
    randomApple = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize]
    ctx.fillStyle = "rgb(200, 0, 0)" // Initialisation du jeu en rouge
    setInterval(moveSnake, 70) // Démarrage du serpent
}
function launchGame (){
    snakeBody = [] // tableau contenant les points du corps du serpent
    snakeLength = 3 // longueur de depart
    currentPosition = [50, 50] // position de depart
    direction = "right" // direction de depart
    ctx.clearRect(50, 50, gridSize, gridSize) // suppression du point de départ
    ctx.clearRect(randomApple[0], randomApple[1], gridSize, gridSize); // suppression de la pomme du tour précédent
    ctx.fillRect(randomApple[0], randomApple[1], gridSize, gridSize) // génération de la premiere pomme
    window.onkeydown = (event) => { // Gestion des touches de direction
        let keyCode = event.which || event.keyCode; //  récupération du code de la touche
        switch (keyCode) {
            case 37: // left
                direction = "left"
                currentPosition[0] = currentPosition[0] - gridSize
                drawSnake()
                break
            case 38: // up
                direction = "up"
                currentPosition[1] = currentPosition[1] - gridSize
                drawSnake() 
                break
            case 39: // right
                direction = "right"
                currentPosition[0] = currentPosition [0] + gridSize
                drawSnake()
                break
            case 40: // bottom
                direction = "bottom"
                currentPosition[1] = currentPosition[1] + gridSize
                drawSnake()
                break
            default: // avoid bugs
                break
        } 
    }
}
initGame()
launchGame() // Lancement du jeu

function moveSnake (){ // fonction appelée toutes les 100 ms (cf setInterval)
    switch (direction) {
        case "left": // left
            if ((currentPosition[0] - gridSize) >= 0){ // On vérifie qu'on est pas au bord du mur
                direction = "left" 
                currentPosition[0] = currentPosition[0] - gridSize
                drawSnake()
            } else {
                alert("perdu !")
                delSnake()
                launchGame()
            }
            break
        case "up": // up
            if((currentPosition[1] - gridSize) >= 0){  // On vérifie qu'on est pas au bord du mur
                direction = "up"
                currentPosition[1] = currentPosition[1] - gridSize
                drawSnake() 
            } else {
                alert("perdu !")
                delSnake()
                launchGame()
            }
            break
        case "right": // right
            if ((currentPosition[0] + gridSize) < canvas.width){  // On vérifie qu'on est pas au bord du mur
                direction = "right"
                currentPosition[0] = currentPosition [0] + gridSize
                drawSnake()
            } else {
                alert("perdu !")
                delSnake()
                launchGame()
            }
            break
        case "bottom": // bottom
            if ((currentPosition[1] - gridSize) < canvas.height){  // On vérifie qu'on est pas au bord du mur
                direction = "bottom"
                currentPosition[1] = currentPosition[1] + gridSize
                drawSnake()    
            } else {
                alert("perdu !")
                delSnake()
                launchGame()
            }
            break
    }
}
function drawSnake(){
    // Gestion de touché de son propre corps
    for (let part in snakeBody){
        if (currentPosition[0] == snakeBody[part][0] && currentPosition[1] == snakeBody[part][1]){
            alert("perdu !")
            delSnake()
            launchGame()
        }
    }
    // On redessine le serpent 
    snakeBody.push([currentPosition[0], currentPosition[1]]) // on rajoute un carré en tete de serpent
    ctx.fillRect(currentPosition[0], currentPosition[1], gridSize, gridSize) // on dessine le carré de tête 
    if (snakeBody.length > snakeLength){  // On vérifie la longueur du serpent
        let itemRemove = snakeBody.shift() // on prend sa queue (premier element) et on la supprime du tableau
        ctx.clearRect(itemRemove[0], itemRemove[1], gridSize, gridSize) // on la supprime du canvas
    }
    // Le serpent a mangé la pomme
    if (currentPosition[0] == randomApple[0] && currentPosition[1] == randomApple[1]){ 
        score += 1
        document.getElementById("#score").innerHTML = score
        snakeLength += 1 // le serpent grandit
        randomApple = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize]
        ctx.fillRect(randomApple[0], randomApple[1], gridSize, gridSize) // on regenere une nouvelle pomme
    }
}
function delSnake(){
    for (let part in snakeBody){ 
        ctx.clearRect(snakeBody[part][0], snakeBody[part][1], gridSize, gridSize)
        score = 0
        document.getElementById("#score").innerHTML = score
    }
}