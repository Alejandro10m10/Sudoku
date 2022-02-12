let arrayBoxRowInvolved = [], arrayBoxColumnInvolved=[];
/* Init the game */
init();

function init(){
	setButtonsEvent();
	addEventBoxListener(boxes);
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
		box.addEventListener('click', () => addSelectBox(boxes, box, 'box-selected') );
	}
}

function addEventMiniBoxListener(miniBoxes){
	for(let i = 0; i < miniBoxes.length ; i++){
		let miniBox = miniBoxes[i];
		miniBox.addEventListener('click', () => addSelectMiniBox(miniBoxes, miniBox, 'box-inside-selected') );
	}
}

function addSelectBox(box, boxArray, className, KindOfBoxSelected){
	removeSelectBox(box, className);
	boxArray.classList.add(className);
}

function addSelectMiniBox(box, boxArray, className){
	let miniBoxSelected = boxArray;
	removeSelectBox(box, className);
	boxArray.classList.add(className);

	getRowMiniBoxesInvolved(boxArray);
}

function getRowMiniBoxesInvolved(miniBox){

	removeSelectBoxInvolved();

	let box = miniBox.parentElement,
		boxes = box.children,
		positionMiniBox;

	let startRowBox,
        finishRowBox;
	

	for(let i = 0; i < boxes.length ; i++){
        if(boxes[i] === miniBox){
            positionMiniBox = i;
        }
    }

	let arrayBoxRowInvolved = getRowBoxesInvolved(box); //Cuando presionamos sobre un elemento cambiamos el color de las filas de las miniBoxes
	let arrayBoxColumnInvolved = getColumnsBoxesInvolved(box); //Cuando presionamos sobre un elemento cambiamos el color de las columnas de las miniBoxes
	
	startRowBox = (positionMiniBox - positionMiniBox % 3);
    finishRowBox = startRowBox + 2;

	for(let i = 0 ; i < arrayBoxRowInvolved.length ; i++){
		let boxInvolvedChildren = arrayBoxRowInvolved[i].children;
		for(let j = startRowBox; j <= finishRowBox ; j++){
			addSelectBoxInvolved(boxInvolvedChildren[j], 'row-selected');
		}
	}

    if(positionMiniBox > 5 ){
        startColumnBox = positionMiniBox - 3;
        finishColumnBox = positionMiniBox - 6;
    } else if(positionMiniBox > 2){
        startColumnBox = positionMiniBox + 3;
        finishColumnBox = positionMiniBox - 3;
    } else{
        startColumnBox = positionMiniBox + 3;
        finishColumnBox = positionMiniBox + 6;
    }

	for(let i = 0 ; i < arrayBoxColumnInvolved.length ; i++){
		let boxInvolvedChildren = arrayBoxColumnInvolved[i].children;

		addSelectBoxInvolved(boxInvolvedChildren[startColumnBox], 'column-selected');
		addSelectBoxInvolved(boxInvolvedChildren[positionMiniBox], 'column-selected');
		addSelectBoxInvolved(boxInvolvedChildren[finishColumnBox], 'column-selected');	
	}
}

function addSelectBoxInvolved(element, className){
	element.classList.add(className);
}

function removeSelectBoxInvolved(){
	let allRowsSelected = document.querySelectorAll('.row-selected');
	let allColumnsSelected = document.querySelectorAll('.column-selected');

	for(let i = 0 ; i < allRowsSelected.length ; i++){
		allRowsSelected[i].classList.remove('row-selected');
	}

	for(let i = 0 ; i < allColumnsSelected.length ; i++){
		allColumnsSelected[i].classList.remove('column-selected');
	}

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