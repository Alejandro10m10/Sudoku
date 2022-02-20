let btnGameMode = document.querySelector('#mode-game-dropdown'),
    btnLanguage = document.querySelector('#language-dropdown'),
    menuDropdownElement = document.querySelector('.mode-menu-dropdown'),
    languageDropdownElement = document.querySelector('.language-menu-dropdown'),
    arrowGameMode = document.querySelector('.mode-menu__arrowIcon'),
    arrowLanguage = document.querySelector('.language-menu__arrowIcon'),
    btnClassicMode = document.querySelector('#btnClassicMode'),
    btnKillerMode = document.querySelector('#btnKillerMode'),
    classicModeDropdownElement = document.querySelector('.new-game-menu__classicOptions'),
    killerModeDropdownElement = document.querySelector('.new-game-menu__killerOptions');
    


const classNameNoDisplay = 'no-display',
      classRotateElement = 'rotate';

btnLanguage.addEventListener('click', () => showDropdownList(languageDropdownElement, arrowLanguage, menuDropdownElement, arrowGameMode));
btnGameMode.addEventListener('click', () => showDropdownList(menuDropdownElement, arrowGameMode, languageDropdownElement, arrowLanguage));
btnClassicMode.addEventListener('click', selectMode); //Value true -> Classic
btnKillerMode.addEventListener('click', selectMode); //Value false -> Killer

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


function selectMode(){
    if(killerModeDropdownElement.classList.contains('no-display')){
        killerModeDropdownElement.classList.remove('no-display');
        btnKillerMode.classList.add('new-game-menu__buttons--selected');
    } else{
        killerModeDropdownElement.classList.add('no-display');
        btnKillerMode.classList.remove('new-game-menu__buttons--selected');
    }

    if(classicModeDropdownElement.classList.contains('no-display')){
        classicModeDropdownElement.classList.remove('no-display');
        btnClassicMode.classList.add('new-game-menu__buttons--selected');
    } else{
        classicModeDropdownElement.classList.add('no-display');
        btnClassicMode.classList.remove('new-game-menu__buttons--selected');
    }

}