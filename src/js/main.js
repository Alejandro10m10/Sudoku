const BOARD_SIZE = 9;

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
	for(let row = 0; row < BOARD_SIZE ; row++){
		for(let column = 0; column < BOARD_SIZE ; column++){
			let box = boxes[row].children;
			let element = box[column];
			let number = board[row][column];
			let paragraph = element.childNodes[0];
			if(number !== 0){
				paragraph.innerHTML = board[row][column];
			} else{
				paragraph.innerHTML = "";
			}
		}
	}
}

/* Change the color of the box or mini-box which was selected */
let boxes = document.querySelectorAll('.game__box');
let miniBoxes = document.querySelectorAll('.game__box__inside');

init();

function init(){
	addEventBoxListener(boxes);
	addEventMiniBoxListener(miniBoxes);
	fillBoard(board);
}

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
