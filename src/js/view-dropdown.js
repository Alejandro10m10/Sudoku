let btnGameMode = document.querySelector('#mode-game-dropdown'),
    btnLanguage = document.querySelector('#language-dropdown'),
    menuDropdownElement = document.querySelector('.mode-menu-dropdown'),
    languageDropdownElement = document.querySelector('.language-menu-dropdown'),
    arrowGameMode = document.querySelector('.mode-menu__arrowIcon'),
    arrowLanguage = document.querySelector('.language-menu__arrowIcon');

const classNameNoDisplay = 'no-display',
      classRotateElement = 'rotate';

btnLanguage.addEventListener('click', () => showDropdownList(languageDropdownElement, arrowLanguage));
btnGameMode.addEventListener('click', () => showDropdownList(menuDropdownElement, arrowGameMode));

function showDropdownList(element, arrow){
    if(element.classList.contains(classNameNoDisplay)){
        element.classList.remove(classNameNoDisplay);
        arrow.classList.add(classRotateElement);
    } else{
        element.classList.add(classNameNoDisplay);
        arrow.classList.remove(classRotateElement);
    }

}
