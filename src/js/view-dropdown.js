let btnGameMode = document.querySelector('#mode-game-dropdown'),
    btnLanguage = document.querySelector('#language-dropdown'),
    menuDropdownElement = document.querySelector('.mode-menu-dropdown'),
    languageDropdownElement = document.querySelector('.language-menu-dropdown');

const classNameNoDisplay = 'no-display';

btnLanguage.addEventListener('click', () => showDropdownList(languageDropdownElement));
btnGameMode.addEventListener('click', () => showDropdownList(menuDropdownElement));

function showDropdownList(element, arrow){
    if(element.classList.contains(classNameNoDisplay)){
        element.classList.remove(classNameNoDisplay);
    } else{
        element.classList.add(classNameNoDisplay);
    }
}
