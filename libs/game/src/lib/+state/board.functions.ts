import { ChessBoard, ChessColor, ChessPiece, ChessPieceName, ChessSquare, Square, Squares } from "./board.models";

export function getSquareAtCoordinate(board:ChessBoard, coordinates:Square){
  if(!coordinates){
      return
    }
    return  board[coordinates?.row][coordinates?.column] as ChessSquare
}

export function getGetChessPiece(board:ChessBoard, coordinates:Square){
  return getSquareAtCoordinate(board,coordinates)?.chessPiece
}

export function sameCoordinates(coordinate1:Square, coordinate2:Square){
  return  +coordinate1?.row === +coordinate2?.row && coordinate1?.column === coordinate2?.column;
}

export const moves = {
  [ChessPieceName.pawn] : calculatePawnMoves
}

export function setChessSquaresHighlightedState(board:ChessBoard, squares:Square[], highlighted) : ChessBoard{
  let updatedBoard = {...board};
   for (let square of squares){
      updatedBoard = setChessSquareHighlightedState(updatedBoard,square, highlighted);
   }
  return updatedBoard
}

export function isValidMove(possibleMoves:Squares, move:Square){
  return !!possibleMoves.find(square=>sameCoordinates(square,move));
}

export function setChessSquareHighlightedState(board:ChessBoard, square:Square, highlighted) : ChessBoard{
  return {... board, [square.row]: { ...board[square.row], [square.column]: { ...board[square.row][square.column], highlighted } }}
}


export function calculateMove(chessPiece: ChessPiece, square:Square, board:ChessBoard): Squares {
  {
    const move = moves[`${chessPiece.name}`];
    return move(square, board, chessPiece);
  }
}

export function pawnStartingMoves(chessPiece: ChessPiece, square:Square){
  const rows = chessPiece.color === ChessColor.black? [6,5] : [3,4];
  return rows.map(row=>({ row, column:square.column})) as Squares  
}

export function pawnMoves(chessPiece: ChessPiece, square:Square){
  const rowMovement = chessPiece.color === ChessColor.black? -1 : + 1;
  const row = +square.row + +rowMovement;
  return [{row, column: square.column }]
}

function calculatePawnMoves(square, board, chessPiece){
    if(!chessPiece.moved){
      return pawnStartingMoves(chessPiece, square);
    }
    return  pawnMoves(chessPiece, square);
}