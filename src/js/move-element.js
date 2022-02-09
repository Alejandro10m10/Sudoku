let pageWidth,
    elementWasChange = false,
    gameControllsDiv = document.querySelector('.game__controlls'),
    navigationDiv = document.querySelectorAll('.navigation__list')[2]; //Accedemos al ultimo elemento hijo del elemento padre

window.addEventListener('resize', reportWindowSize);

initElement();

function reportWindowSize(){
    pageWidth = document.documentElement.scrollWidth;
    if(pageWidth >= 980 && !elementWasChange){
        changePlaceElement(btnNewGame, navigationDiv, gameControllsDiv, true);
    } 
    
    if(pageWidth < 980 && elementWasChange){
        changePlaceElement(btnNewGame, gameControllsDiv, navigationDiv, false);
    }
}

function changePlaceElement(element, moveFrom, moveTo, value){
    elementWasChange = value;
    let clone = element.cloneNode(true);
    moveTo.prepend(clone);
    moveFrom.removeChild(element);
}


function initElement(){ //Si la pageWidth es >= 980 el elemento no se muestra en la barra de navegación
    pageWidth = document.documentElement.scrollWidth;
    if(pageWidth >= 980 && !elementWasChange){
        changePlaceElement(btnNewGame, navigationDiv, gameControllsDiv, true);
    }
}