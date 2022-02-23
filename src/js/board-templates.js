let classicBoards = [];

let emptyBoard = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
];

let easyClassicBoards = [[
	[8,7,0,5,4,9,0,0,0],
	[0,0,0,8,0,1,2,5,0],
	[0,1,3,0,0,0,9,0,0],
	[9,0,6,4,0,0,0,0,0],
	[0,0,8,7,6,3,4,0,9],
	[3,4,0,9,2,0,5,0,0],
	[0,0,9,1,5,0,8,0,2],
	[0,8,0,3,0,0,0,0,0],
	[7,3,0,2,8,0,0,0,6],
], [
	[9,0,2,4,1,5,0,0,0],
	[0,0,5,0,6,0,0,0,0],
	[3,7,0,0,0,0,0,6,0],
	[2,1,0,3,9,6,0,0,5],
	[4,0,6,0,0,0,0,0,2],
	[0,0,3,0,8,0,1,9,0],
	[6,4,9,0,3,1,0,5,7],
	[5,0,0,6,0,0,0,0,4],
	[8,0,7,5,0,9,0,0,0],
]];

let mediumClassicBoards = [[
	[7,1,2,0,2,6,0,0,0],
	[0,6,5,0,0,0,7,0,1],
	[0,0,0,0,0,7,4,6,0],
	[0,5,0,0,0,8,0,0,0],
	[0,7,2,0,4,0,8,0,0],
	[9,0,8,0,0,3,0,7,6],
	[0,0,0,3,8,0,0,0,4],
	[0,0,0,0,0,0,0,0,8],
	[4,8,3,0,0,0,2,1,7],
], [
	[0,6,8,1,0,9,0,0,0],
	[0,0,1,0,0,0,8,0,4],
	[0,0,0,0,3,8,0,9,1],
	[2,5,0,0,0,0,0,4,0],
	[0,0,0,0,0,0,0,5,0],
	[0,0,0,4,2,5,9,1,6],
	[0,4,0,0,6,1,0,0,5],
	[0,0,2,7,5,0,1,8,0],
	[0,0,5,0,0,3,0,0,0],
]];

let hardClassicBoards = [[
	[0,0,0,0,6,0,0,0,5],
	[0,0,9,0,0,0,0,0,3],
	[5,6,1,0,0,4,0,0,8],
	[8,0,0,4,0,0,0,0,0],
	[7,4,0,0,0,0,0,9,0],
	[0,0,0,0,5,3,0,0,0],
	[0,8,0,0,0,1,0,7,2],
	[0,0,0,0,4,9,0,0,0],
	[0,1,0,0,2,0,5,0,0],
], [
	[7,0,2,0,5,0,6,0,0],
	[0,0,0,0,0,3,0,0,0],
	[1,0,0,0,0,9,5,0,0],
	[8,0,0,0,0,0,0,9,0],
	[0,4,3,0,0,0,7,5,0],
	[0,9,0,0,0,0,0,0,8],
	[0,0,9,7,0,0,0,0,5],
	[0,0,0,2,0,0,0,0,0],
	[0,0,7,0,4,0,2,0,3],
]];

let expertClassicBoards = [[
	[0,0,0,7,5,0,4,0,0],
	[0,0,0,0,0,0,0,7,0],
	[0,2,0,0,9,0,0,5,0],
	[0,0,9,0,0,2,0,0,0],
	[0,0,0,0,0,8,1,0,6],
	[0,1,0,4,0,0,0,0,0],
	[5,9,7,0,0,0,0,0,0],
	[4,0,0,0,0,0,0,0,3],
	[2,0,0,0,0,0,0,8,4],
], [
	[0,8,0,1,0,0,0,2,0],
	[0,3,0,0,0,0,0,0,0],
	[4,0,0,0,0,0,3,8,0],
	[0,0,0,0,0,2,0,0,1],
	[0,0,0,5,0,0,4,0,0],
	[5,0,6,0,0,0,0,0,9],
	[0,0,7,0,4,0,0,0,0],
	[0,0,0,2,8,3,0,0,0],
	[0,9,4,0,1,0,0,0,0],
]];

let evilClassicBoards = [[
	[9,0,0,0,8,0,0,0,0],
	[0,6,0,1,0,0,7,3,0],
	[0,0,0,0,0,0,0,0,4],
	[0,0,0,4,0,0,0,0,6],
	[0,0,8,0,1,0,5,4,0],
	[0,5,0,0,0,0,0,0,2],
	[0,7,0,3,0,0,1,5,0],
	[0,0,6,0,0,7,0,0,0],
	[0,0,0,0,0,0,2,0,0],
], [
	[1,0,8,5,0,0,6,0,0],
	[0,2,0,0,0,1,0,0,0],
	[0,4,0,0,0,0,0,0,8],
	[8,0,5,0,0,3,0,0,9],
	[0,0,4,0,0,0,0,0,0],
	[0,0,0,0,9,0,2,0,0],
	[3,0,9,0,0,5,0,0,2],
	[0,0,0,6,0,0,0,7,0],
	[0,1,0,0,0,0,0,0,0],
]];

classicBoards.push(easyClassicBoards, mediumClassicBoards, hardClassicBoards, expertClassicBoards);
