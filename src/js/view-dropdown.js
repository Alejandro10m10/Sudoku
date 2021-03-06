let btnGameMode = document.querySelector('#mode-game-dropdown'),
    btnLanguage = document.querySelector('#language-dropdown'),
    menuDropdownElement = document.querySelector('.mode-menu-dropdown'),
    languageDropdownElement = document.querySelector('.language-menu-dropdown'),
    arrowGameMode = document.querySelector('.mode-menu__arrowIcon'),
    arrowLanguage = document.querySelector('.language-menu__arrowIcon');

let selectGameModeMenu = document.querySelector('.new-game-menu'),
    selectTooltipArrow =  document.querySelector('.tooltip-arrow'),
    showGameModeMenuDropdownList = false,
    btnClassicMode = document.querySelector('#btnClassicMode'),
    btnKillerMode = document.querySelector('#btnKillerMode'),
    classicModeDropdownElement = document.querySelector('.new-game-menu__classicOptions'),
    killerModeDropdownElement = document.querySelector('.new-game-menu__killerOptions');
    
const classNameNoDisplay = 'no-display',
      classRotateElement = 'rotate';

btnLanguage.addEventListener('click', () => showDropdownList(languageDropdownElement, arrowLanguage, menuDropdownElement, arrowGameMode));
btnGameMode.addEventListener('click', () => showDropdownList(menuDropdownElement, arrowGameMode, languageDropdownElement, arrowLanguage));
btnClassicMode.addEventListener('click', () => showModeDropdownList(btnClassicMode, classicModeDropdownElement, btnKillerMode, killerModeDropdownElement)); //Value true -> Classic
btnKillerMode.addEventListener('click', () => showModeDropdownList(btnKillerMode, killerModeDropdownElement, btnClassicMode, classicModeDropdownElement)); //Value false -> Killer

function showDropdownList(firstElement, firstArrow, secondElement, secondArrow){
    if(firstElement.classList.contains(classNameNoDisplay)){
        firstElement.classList.remove(classNameNoDisplay);
        secondElement.classList.add(classNameNoDisplay);
        firstArrow.classList.add(classRotateElement);
        secondArrow.classList.remove(classRotateElement);
    } else{
        firstElement.classList.add(classNameNoDisplay);
        firstArrow.classList.remove(classRotateElement);
    }
}

function showModeDropdownList(showElement, showDropDownList, hideElement, hideDropDownList){
    showElement.classList.add('new-game-menu__buttons--selected');
    showDropDownList.classList.remove(classNameNoDisplay);

    hideElement.classList.remove('new-game-menu__buttons--selected');
    hideDropDownList.classList.add(classNameNoDisplay);
}

function showGameModeMenu(){
    showGameModeMenuDropdownList = !showGameModeMenuDropdownList;

    if(showGameModeMenuDropdownList){
        selectGameModeMenu.classList.remove(classNameNoDisplay);
        selectTooltipArrow.classList.remove(classNameNoDisplay);
    } else{
        selectGameModeMenu.classList.add(classNameNoDisplay);
        selectTooltipArrow.classList.add(classNameNoDisplay);
    }
}

/* Event to close the gamemode selection menu if pressed outside of this element */
window.addEventListener('click', function(e) {
    if(!selectGameModeMenu.classList.contains(classNameNoDisplay)){
        if((e.target) === document.querySelector('#btnNewGame')){
            return;
        } else{
            if (selectGameModeMenu.contains(e.target)) {
            } else {
                selectGameModeMenu.classList.add(classNameNoDisplay);
                selectTooltipArrow.classList.add(classNameNoDisplay);
                showGameModeMenuDropdownList = false;
            }
        }
    } 
})