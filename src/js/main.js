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
