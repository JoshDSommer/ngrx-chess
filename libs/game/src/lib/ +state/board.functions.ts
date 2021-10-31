import { ChessBoard, ChessSquare, Square, Squares } from './board.models';

export function getSquareAtCoordinate(board: ChessBoard, coordinates: Square) {
  if (!coordinates) {
    return;
  }
  return board[coordinates?.row][coordinates?.column] as ChessSquare;
}

export function getGetChessPiece(board: ChessBoard, coordinates: Square) {
  const chessPiece = getSquareAtCoordinate(board, coordinates);
  return chessPiece?.chessPiece;
}

export function sameCoordinates(coordinate1: Square, coordinate2?: Square) {
  if (!coordinate2) {
    return false;
  }
  return (
    +coordinate1?.row === +coordinate2?.row &&
    coordinate1?.column === coordinate2?.column
  );
}

export function removeHighlightOnSquares(
  board: ChessBoard,
  squares: Square[]
): ChessBoard {
  const highlighted = false;
  let updatedBoard = { ...board };
  for (const square of squares) {
    updatedBoard = setChessSquareHighlightedState(
      updatedBoard,
      square,
      highlighted
    );
  }
  return updatedBoard;
}

export function isValidMove(possibleMoves: Squares, move: Square) {
  return !!possibleMoves.find((square) => sameCoordinates(square, move));
}

export function setChessSquareHighlightedState(
  board: ChessBoard,
  square: Square,
  highlighted: boolean
): ChessBoard {
  return {
    ...board,
    [square.row]: {
      ...board[square.row],
      [square.column]: { ...board[square.row][square.column], highlighted },
    },
  };
}
