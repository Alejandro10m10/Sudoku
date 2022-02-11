/* Init the game */
init();

function init(){
	setButtonsEvent();

    addEventsToBoxes(boxes, miniBoxes, addEventMiniBoxListener);
	fillBoard(board);
}

function addEventsToBoxes(boxes, miniBoxes, myCallback){
    addEventBoxListener(boxes);
    myCallback(miniBoxes);
}

/* Change the color of the box or mini-box which was selected */
function addEventBoxListener(boxes){
	for(let i = 0; i < boxes.length ; i++){
		let box = boxes[i];
		box.addEventListener('click', () => addSelectBox(boxes, box, 'box-selected', true) );
	}
}

function addEventMiniBoxListener(miniBoxes){
	for(let i = 0; i < miniBoxes.length ; i++){
		let miniBox = miniBoxes[i];
		miniBox.addEventListener('click', () => addSelectBox(miniBoxes, miniBox, 'box-inside-selected', false) );
	}
}

function addSelectBox(box, boxArray, className, KindOfBoxSelected){
	removeSelectBox(box, className);
	boxArray.classList.add(className);
    let boxSelected,
        miniBoxSelected;

    let arrayBoxRowInvolved = [],
        arrayBoxColumnInvolved = [];

    if(KindOfBoxSelected){ // Si se selecciono una caja completa 9x9 obtenemos la caja que se ha seleccionado
        boxSelected = boxArray;
        arrayBoxRowInvolved = getRowBoxesInvolved(boxSelected); //Cuando presionamos sobre un elemento cambiamos el color de las filas de las miniBoxes
        arrayBoxColumnInvolved = getColumnsBoxesInvolved(boxSelected); //Cuando presionamos sobre un elemento cambiamos el color de las columnas de las miniBoxes
        console.log(arrayBoxRowInvolved);
        console.log(arrayBoxColumnInvolved);
    } else{  // Si se selecciono una mini caja 1x1 obtenemos la minicaja que se ha seleccionado
        miniBoxSelected  = boxArray;
    }
}

function getRowMiniBoxesInvolved(miniBoxSelected, boxSelected){
    console.log(miniBoxSelected);
    console.log(boxSelected);
}

function getRowBoxesInvolved(boxSelected){
    let gameBoardContent = document.querySelector('.game__content').children,
        positionBox;
    
    let arrayBoxRowInvolved = [];
    let startRowBox,
        finishRowBox;

    for(let i = 0; i < gameBoardContent.length ; i++){
        if(gameBoardContent[i] === boxSelected){
            positionBox = i;
        }
    }

    startRowBox = (positionBox - positionBox % 3);
    finishRowBox = startRowBox + 2;

    for(let i = startRowBox; i <= finishRowBox ; i++){
        if(i != positionBox){
            arrayBoxRowInvolved.push(gameBoardContent[i]);
        }
    }

    return arrayBoxRowInvolved;

}

function getColumnsBoxesInvolved(boxSelected){
    let gameBoardContent = document.querySelector('.game__content').children,
        positionBox;

    for(let i = 0; i < gameBoardContent.length ; i++){
        if(gameBoardContent[i] === boxSelected){
            positionBox = i;
        }
    }

    let arrayBoxColumnInvolved = [];
    let columnBox =  (positionBox - positionBox % 3),
        startColumnBox = 0,
        finishColumnBox = 0;

    if(columnBox > 5 ){
        startColumnBox = positionBox - 3;
        finishColumnBox = positionBox - 6;
    } else if(columnBox > 2){
        startColumnBox = positionBox + 3;
        finishColumnBox = positionBox - 3;
    } else{
        startColumnBox = positionBox + 3;
        finishColumnBox = positionBox + 6;
    }

    arrayBoxColumnInvolved.push(gameBoardContent[startColumnBox],gameBoardContent[finishColumnBox] );

    return arrayBoxColumnInvolved;
}

function addColorRowSelectBox(){
}

function removeSelectBox(boxArray, className){
	for(let i = 0; i < boxArray.length ; i++){
		let box = boxArray[i];
		if(box.classList.contains(className)){
			box.classList.remove(className);
		}
	}
}

/* Get the number which was selected by the user */
function setButtonsEvent(){
	for(number of numbers){
		let numberId = number.id;
		let numberElement = document.querySelector('#' + numberId);
		numberElement.addEventListener('click', () => putNumberInBoard(parseInt(numberElement.value)));
	}
}

function putNumberInBoard(number){
	let boxSelected = document.querySelector('.box-inside-selected');
	let boxParagraphNumber = boxSelected.childNodes[0];
	boxParagraphNumber.innerHTML = number;
}


/* Fill the board */ 
function fillBoard(board){
	coverBoxRow(0, 0, 3);
	coverBoxRow(3, 3, 6);
	coverBoxRow(6, 6, 9);
}

function coverBoxRow(row, start, finish){
	let i = 0;
	let iteration = 0;
	let limit = 3;

	boxesArray = [];

	while(i < 9){
		let box = boxes[row].children;
		iterationRowBoard(iteration, limit, box);
		row++;

		if(row == finish){
			row = start;
			iteration += 3;
			limit+=3;
		} 
		i++;
	}
	putNumberInBox(boxesArray, start, finish);
}

function iterationRowBoard(iteration, limit, box){
	for(iteration; iteration < limit ; iteration++){
		let element = box[iteration];
		boxesArray.push(element);
	}
}

function putNumberInBox(array, start, finish){
	let boardArrayNumbers = []
	for(let j = start; j < finish ; j++){
		for(let k = 0 ; k < BOARD_SIZE ; k++){
			boardArrayNumbers.push(board[j][k]);
		}
	}
	
	for(let i = 0; i < array.length ; i++){
		let paragraph = array[i].childNodes[0];
		if(boardArrayNumbers[i] !== 0){
			paragraph.innerHTML = boardArrayNumbers[i];
		} else{
			paragraph.innerHTML = "";
		}
	}

}