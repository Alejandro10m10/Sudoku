let btnGameMode = document.querySelector('#mode-game-dropdown'),
    btnLanguage = document.querySelector('#language-dropdown'),
    menuDropdownElement = document.querySelector('.mode-menu-dropdown'),
    languageDropdownElement = document.querySelector('.language-menu-dropdown'),
    arrowGameMode = document.querySelector('.mode-menu__arrowIcon'),
    arrowLanguage = document.querySelector('.language-menu__arrowIcon');

const classNameNoDisplay = 'no-display',
      classRotateElement = 'rotate';

btnLanguage.addEventListener('click', () => showDropdownList(languageDropdownElement, arrowLanguage, menuDropdownElement, arrowGameMode));
btnGameMode.addEventListener('click', () => showDropdownList(menuDropdownElement, arrowGameMode, languageDropdownElement, arrowLanguage));

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

/* 1. Se agrega un listener para el evento click de toda la ventana*/
/*2. Si el div con id clickbox contiene a e. target*/

/*
window.addEventListener('click', function(e) {
    if (document.querySelector('.mode-menu-dropdown').contains(e.target)) {
        showDropdownList(menuDropdownElement, arrowGameMode, languageDropdownElement, arrowLanguage);
    } else {
    }
  }) */
