let timerElement = document.querySelector('#gameTime'),
    pauseGame = document.querySelector('#btnPauseGame'),
    playGame = document.querySelector('#btnPlayGame'),
    newGame = document.querySelector('#btnNewGame');

let isGameInPaused = false;
    overlayElement = createOverlayElement(),
    gameContent = document.querySelector('.game__content');

pauseGame.addEventListener('click', pauseTimer);
playGame.addEventListener('click', playTimer);
newGameEventListener(newGame);

function newGameEventListener(element){
    element.addEventListener('click', showGameModeMenu);
    /* element.addEventListener('click', resetTimer); */
}

let sec = 0,
    min = 0,
    hrs = 0,
    t;

let hrsAndMin;

initClock();

function initClock(){
    timer();
}

function clock(){
    sec++;
    if(sec >= 60){
        sec = 0;
        min++;
        if(min >= 60){
            min = 0;
            hrs++;
        }
    }
}

function showClock(){
    clock();

    hrsAndMin = (min > 9 ? min : "0" + min)
                + ":" + (sec > 9 ? sec : "0" + sec);

    (hrs == 0) 
        ?  timerElement.textContent = hrsAndMin
        : timerElement.textContent = (hrs > 9 ? hrs : "0" + hrs) 
                                    + ":" + hrsAndMin;

    timer();
}

function timer(){
    t = setTimeout(showClock, 1000);
}

function pauseTimer(){
    clearTimeout(t);
    showPlayPauseButtons(true, false);
    showPauseOverlay(true);
    removeElementsInBoardTemporally();
}

function resetTimer(){
    timerElement.textContent = "00:00";
    sec = 0; min = 0; hrs = 0;
}

function playTimer(){
    timer();
    showPlayPauseButtons(false, true);
    showPauseOverlay(false);
    putBackTemporallyElementsInBoard();
}

function showPlayPauseButtons(playValue, pauseValue){
    displayElement(playGame, playValue);
    displayElement(pauseGame, pauseValue);
}

function displayElement(element, value){
    (value) 
        ? element.classList.remove('no-display') 
        : element.classList.add('no-display');
}

function createOverlayElement(){
    let overlayElement = document.createElement("div");
    overlayElement.className = "game__content__pause-overlay";
    let pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="icon-play-big game__content__pause-overlay--icon" viewBox="0 0 60 60"><g fill="none" fill-rule="evenodd"><circle cx="30" cy="30" r="30" fill="#0072E3"></circle><path fill="#FFF" d="M39.12 31.98l-12.56 8.64a2.4 2.4 0 01-3.76-1.98V21.36a2.4 2.4 0 013.76-1.97l12.56 8.63a2.4 2.4 0 010 3.96z"></path></g></svg>'
    overlayElement.innerHTML = pauseIcon;
    overlayElement.addEventListener('click', playTimer);

    return overlayElement;
}

function showPauseOverlay(value){
    if(value){
        gameContent.appendChild(overlayElement);
        isGameInPaused = true;
    } else{
        gameContent.removeChild(overlayElement);
        isGameInPaused = false;
    }
}