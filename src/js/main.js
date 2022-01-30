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

let board2 = [
   [7,0,2],
   [0,0,0],
   [1,0,0]
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
    if(row < 3 && column < 3){
       for(let i = 0; i < 3 ; i++){
        	if( isNumberInRow(board, i, number) ){
            	return true;
        	}
    	}
    	return false;
    }
}

console.log(isNumberInRow(board, 0, 3));
console.log(isNumberInColumn(board, 1, 3));
console.log(isNumberInBox(board2, 1, 0, 8));

