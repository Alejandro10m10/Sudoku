let arrayBoxRowInvolved = [], arrayBoxColumnInvolved=[];
let btnUndoMovement = document.querySelector('#btnUndoMovement'),
	btnEraseMovement = document.querySelector('#btnEraseMovement'),
	btnCheckBox = document.querySelector('#checkMistakes');
let checkMistakesSelected = true; // Variable que nos permite conocer si el usuario activo o no activo la casilla

// Variables to control the last movement on the board
let arrayMovements = [];

btnUndoMovement.addEventListener('click', () => undoMovement(arrayMovements));
btnEraseMovement.addEventListener('click', eraseMovement);
btnCheckBox.addEventListener('click', checkMistakes);


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

function addSelectBox(box, boxArray, className){
	removeSelectBox(box, className);
	boxArray.classList.add(className);
}

function addSelectMiniBox(box, boxArray, className){
	let allMiniBoxex = box,
		numberInMiniBox,
		paragraphElement = boxArray.children[0];

	removeSelectBox(box, className);
	boxArray.classList.add(className);
	
	numberInMiniBox = parseInt(paragraphElement.textContent);

	getRowMiniBoxesInvolved(boxArray);
	getAllSameNumbersSelected(numberInMiniBox, allMiniBoxex, boxArray);
}

function getAllSameNumbersSelected(numberInMiniBox, allMiniBoxex, boxSelected){
	if(!isNaN(numberInMiniBox)){
		for(let i = 0; i < allMiniBoxex.length; i++){
			numbersInMiniBoxes = parseInt(allMiniBoxex[i].children[0].textContent);
			allMiniBoxex[i].classList.remove('sameNumberSelected');
			
			if(!isNaN(numbersInMiniBoxes) && boxSelected != allMiniBoxex[i]){
				if(numberInMiniBox == numbersInMiniBoxes){
					allMiniBoxex[i].classList.add('sameNumberSelected');
				}
			}
		}
	} else{
		for(let i = 0; i < allMiniBoxex.length; i++){
			numbersInMiniBoxes = parseInt(allMiniBoxex[i].children[0].textContent);
			allMiniBoxex[i].classList.remove('sameNumberSelected');
		}
	}
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
	let actualBoard = getActualBoard(0);
	let boxSelected = document.querySelector('.box-inside-selected');
	let boxParagraphNumber = boxSelected.childNodes[0];
	let numberBefore = parseInt(boxParagraphNumber.textContent);

	if(numberBefore === number){
		eraseMovement();
		evaluateAllWrongNumbers(getActualBoard(0));
		return;
	}

	boxParagraphNumber.innerHTML = number;

	if(!isThereAlreadyANumberInBox(board, getActualBoard(0))){
		boxParagraphNumber.innerHTML = numberBefore;
	} else{
		boxParagraphNumber.classList.add('selectedNumber');
		let allMiniBoxex = document.querySelectorAll('.game__box__inside');
		getAllSameNumbersSelected(number, allMiniBoxex, boxSelected);
		arrayMovements.push([boxSelected.parentElement, boxSelected, boxParagraphNumber, number]);

		if(isValidMovement(actualBoard, boxSelected, number)){
			boxParagraphNumber.classList.remove('wrongMovement');
		} else{
			boxParagraphNumber.classList.add('wrongMovement');
		}
	}

	evaluateAllWrongNumbers(getActualBoard(0));
	
}

function isThereAlreadyANumberInBox(originalBoard, userBoard){
	let positionNumers = getPositionInitialNumbers(originalBoard);

	for(let i = 0; i < positionNumers.length ; i++){
		let row = positionNumers[i][0];
		let column = positionNumers[i][1];

		let numberBefore = originalBoard[row][column];
		let numberAfter = userBoard[row][column];

		if(numberBefore !== numberAfter) {
			return false;
		}
	}

	return true;
}

function getPositionInitialNumbers(originalBoard){
	let positionNumers = [];
	for(let row = 0; row < BOARD_SIZE; row++){
		for(let column = 0; column < BOARD_SIZE ; column++){
			let number = originalBoard[row][column];
			if(number !== 0){
				positionNumers.push([row, column]);
			}
		}
	}
	return positionNumers;
}

function getActualBoard(value){ // 0 - Numbers   1 - Divs
	let boxes = document.querySelectorAll('.game__box');

	let inicio = 0;
	let final = 3;

	let m = 0;
	let k = 0;

	let array = [];
	let rowArray = [];

	for(let i = 0; i < 27 ; i++){
		let miniBoxes = boxes[m].children;

		for(let j = inicio; j < final ; j++){ //Entramos a los primeros 3 elementos de la caja
			let number = parseInt(miniBoxes[j].children[0].textContent);
			let element;
			if(isNaN(number)){ number = 0}
			(value === 0) 
				? element = number
				: element = miniBoxes[j];
			rowArray.push(element);		
		}

		k++;
		m++;

		if(k%3 == 0){
			array.push(rowArray);
			rowArray=[];
		}

		if(k == 3){
			m=0;
			inicio += 3;
			final += 3;
		} else if(k == 6){
			m=0;
			inicio += 3;
			final += 3;
		} else if(k == 9){
			m=3;
			inicio = 0;
			final = 3;
		} else if(k == 12){
			m=3;
			inicio += 3;
			final += 3;
		} else if(k == 15){
			m=3;
			inicio += 3;
			final += 3;
		} else if(k == 18){
			m=6;
			inicio = 0;
			final = 3;
		} else if(k == 21){
			m=6;
			inicio += 3;
			final += 3;
		} else if(k == 24){
			m=6;
			inicio += 3;
			final += 3;
		}
	}

	return array;
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

/* Buttons controll the game */
function undoMovement(arrayMovements){
	let arryMovementsLength = arrayMovements.length;

	let lastMiniBox,
		lastItem = arryMovementsLength -1,
		lastBox,
		lastParagraph,
		lastNumber;
	
	if(arryMovementsLength !== 0){
		lastBox = arrayMovements[lastItem][0];
		lastMiniBox = arrayMovements[lastItem][1];
		lastParagraph = arrayMovements[lastItem][2];
		lastNumber = arrayMovements[lastItem][3];

		let miniBox = document.querySelector('.box-inside-selected');
		miniBox.classList.remove('box-inside-selected');
		removeSelectBox(boxes, 'box-selected');
		removeSelectBoxInvolved();

		lastBox.classList.add('box-selected');
		lastMiniBox.classList.add('box-inside-selected');
		getRowMiniBoxesInvolved(lastMiniBox);

		removeColorInAllSameNumbers();

		lastParagraph.innerHTML = "";
	}

	if(arryMovementsLength !== 1){ 
		arrayMovements.pop();		
	}
}

function removeColorInAllSameNumbers(){
	let allSameNumbers = document.querySelectorAll('.sameNumberSelected');
	for(let allSameNumber of allSameNumbers){
		allSameNumber.classList.remove('sameNumberSelected');
	}
}

function eraseMovement(){
	let miniBoxNumberSelected = document.querySelector('.box-inside-selected')
	let actualBoard = getActualBoard(1);
	let positionMiniBoxNumber = getMiniBoxPositionInBoard(actualBoard, miniBoxNumberSelected);
	let positionNumers = getPositionInitialNumbers(board);
	
	if(!canErase(positionNumers, positionMiniBoxNumber)){
		let paragraphNumberSelected = miniBoxNumberSelected.children[0];
		paragraphNumberSelected.innerHTML = "";
		arrayMovements.pop();
		removeColorInAllSameNumbers();	
	}
}

function getMiniBoxPositionInBoard(actualBoard, miniBox){
	let miniBoxPosition = [];
	for(let row = 0; row < BOARD_SIZE ; row++){
		for(column = 0; column < BOARD_SIZE ; column++){
			if(actualBoard[row][column] === miniBox){
				miniBoxPosition.push([row, column]);
			}
		}
	}
	return miniBoxPosition;
}

function canErase(positionNumers, positionMiniBoxNumber){
	let compareNumber = positionMiniBoxNumber[0];
	let rowNumberSelected =  compareNumber[0];
	let columnNumberSelected = compareNumber[1];

	for(let i = 0; i < positionNumers.length ; i++){
		let number = positionNumers[i];

		if(number.length != compareNumber.length) return false;

		let row = number[0];
		let column = number[1];

		if(rowNumberSelected === row && columnNumberSelected === column) return true;
	} 
	return false;
}

function checkMistakes(){
	checkMistakesSelected = (!checkMistakesSelected);	
}

function isValidMovement(actualBoard, boxSelected, posibleNumber){
	let positionMovement = getMiniBoxPositionInBoard(getActualBoard(1), boxSelected)[0];
	let rowMovement = positionMovement[0];
	let columnMovement = positionMovement[1];

	return isValidNumberPlacement(actualBoard, rowMovement, columnMovement, posibleNumber);	
}

function evaluateAllWrongNumbers(actualBoard){
	let positions = [];
	let wrongNumbers = document.querySelectorAll('.wrongMovement');

	if(wrongNumbers.length === 0) return;

	let userBoard = getActualBoard(1);

	for(let i = 0; i < wrongNumbers.length ; i++){
		let paragraphElement = (wrongNumbers[i]);
		let number = parseInt(paragraphElement.textContent);
		let miniBoxWrong = wrongNumbers[i].parentElement;
		let dataWrong = getMiniBoxPositionInBoard(userBoard, miniBoxWrong);
		dataWrong.push(number, paragraphElement);
		positions.push(dataWrong);
	}
	
	for(let i = 0; i < positions.length ; i++){
		let rowMovement = positions[i][0][0];
		let columnMovement =  positions[i][0][1];
		let number = positions[i][1];
		let paragraphElement = positions[i][2];

		let arrayRow = isOneNumberInRow(actualBoard, rowMovement, number);
		let arrayColumn = isOneNumberInColumn(actualBoard, columnMovement, number);
		let arrayBox = isOneNumberInBox(actualBoard, rowMovement, columnMovement, number);

		if(arrayColumn[0] === 1 && arrayRow[0] === 1){
			(arrayBox[0] > 1 )
				? paragraphElement.classList.add('wrongMovement')
				: paragraphElement.classList.remove('wrongMovement');	
		}
		drawMiniBoxCollision(arrayRow[1], arrayColumn[1], arrayBox[1], userBoard);
	}
	
}

function drawMiniBoxCollision(rowCollisions, columnCollision, boxCollisions, actualBoard){
	//console.log(rowCollisions);
	//console.log(columnCollision);
	// Box Collisions
	//console.log(actualBoard);
	
	for(let row = 0 ; row < BOARD_SIZE ; row ++){
		for(let column = 0 ; column < BOARD_SIZE ; column++){
			let miniBox = actualBoard[row][column];

			for(let i = 0; i < boxCollisions.length ; i++){
				let rowCollision = boxCollisions[i][0];
				let columnCollision = boxCollisions[i][1];

				if(rowCollision === row && columnCollision === column){
					miniBox.classList.add('boxWrongColor');
				}
			}
		}
	}
}

function isOneNumberInColumn(board, column, number){
	let numbersInvolved = [];
	let columnNumbers = 0;
	for(let i = 0; i < BOARD_SIZE ; i++){
		if( board[i][column] === number){
			numbersInvolved.push([i, column]);
			columnNumbers++;
		}
	}
	return [columnNumbers, numbersInvolved];
}

function isOneNumberInRow(board, row, number){
	let numbersInvolved = [];
	let rowNumbers = 0;
	for(let i = 0; i < BOARD_SIZE ; i++){
		if( board[row][i] === number){
			numbersInvolved.push([row, i]);
			rowNumbers++;
		}
	}
	return [rowNumbers, numbersInvolved];
}

function isOneNumberInBox(board, row, column, number){
	let boxRow = row - row % 3;
	let boxColumn = column - column % 3;
	let boxNumber = 0;
	let numbersInvolved = [];
	
	for(let i = boxRow ; i < boxRow + 3 ; i++){
	    for(let j = boxColumn ; j < boxColumn + 3 ; j++){
	    	if(board[i][j] === number){
				numbersInvolved.push([i, j]);
	    	    boxNumber++;
	    	}
	    }
	}
	return [boxNumber, numbersInvolved];
}