const BOARD_SIZE = 9;
let boxes = document.querySelectorAll('.game__box');
let miniBoxes = document.querySelectorAll('.game__box__inside');
let numbers = document.querySelectorAll('.btnNumbers');
let boxesArray = [];

let board = [
	[7,0,2,0,5,0,6,0,0],
	[0,0,0,0,0,3,0,0,0],
	[1,0,0,0,0,9,5,0,0],
	[8,0,0,0,0,0,0,9,0],
	[0,4,3,0,0,0,7,5,0],
	[0,9,0,0,0,0,0,0,8],
	[0,0,9,7,0,0,0,0,5],
	[0,0,0,2,0,0,0,0,0],
	[0,0,7,0,4,0,2,0,3],
];

/* Init the game */
init();

function init(){
	setButtonsEvent();
	addEventBoxListener(boxes);
	addEventMiniBoxListener(miniBoxes);
	fillBoard(board);
}

/* Solve the sudoku board */

function isNumberInRow(board, row, number){
	for(let i = 0; i < BOARD_SIZE ; i++){
		if( board[row][i] === number){
			return true;
		}
	}
	return false;
}

function isNumberInColumn(board, column, number){
	for(let i = 0; i < BOARD_SIZE ; i++){
		if( board[i][column] === number){
			return true;
		}
	}
	return false;
}

function isNumberInBox(board, row, column, number){
	let boxRow = row - row % 3;
	let boxColumn = column - column % 3;
	
	for(let i = boxRow ; i < boxRow + 3 ; i++){
	    for(let j = boxColumn ; j < boxColumn + 3 ; j++){
	    	if(board[i][j] === number){
	    	    return true;
	    	}
	    }
	}
	return false;
}

function isValidNumberPlacement(board, row, column, number){
    return !isNumberInRow(board, row, number) &&
           !isNumberInColumn(board, column, number) &&
           !isNumberInBox(board, row, column, number);
}

function solveBoard(board){
	for(let row = 0; row < BOARD_SIZE ; row++){
		for(let column = 0; column < BOARD_SIZE ; column++){
			if(board[row][column] === 0){
				 for(let candidateNumber = 1 ; candidateNumber <= BOARD_SIZE ; candidateNumber++){
					 if(isValidNumberPlacement(board, row, column, candidateNumber)){
						  board[row][column] = candidateNumber;
						  
						 if(solveBoard(board)){
							  return true;
						 }else{
						 		board[row][column] = 0;
					 	  }	
					 }
				 }
				 return false;
			}
		}
	}
	return true;
}


//solveBoard(board);
//console.log(board);

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
		miniBox.addEventListener('click', () => addSelectBox(miniBoxes, miniBox, 'box-inside-selected') );
	}
}

function addSelectBox(box, boxArray, className){
	removeSelectBox(box, className);
	boxArray.classList.add(className);
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
	console.log(number);
}
