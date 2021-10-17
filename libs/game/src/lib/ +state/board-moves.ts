import { getSquareAtCoordinate } from './board.functions';
import {
  ChessBoard,
  ChessColor,
  ChessPiece,
  ChessPieceName,
  columnLetters,
  Square,
  Squares,
} from './board.models';

const movementDirection = (chessPiece: ChessPiece) =>
  chessPiece.color === ChessColor.black ? -1 : +1;
export interface MovePiece {
  [ChessPieceName.pawn]: (
    square: Square,
    board: ChessBoard,
    chessPiece: ChessPiece
  ) => Squares;
  [ChessPieceName.knight]: () => Squares;
  [ChessPieceName.rook]: () => Squares;
  [ChessPieceName.king]: () => Squares;
  [ChessPieceName.queen]: () => Squares;
  [ChessPieceName.bishop]: () => Squares;
}
export const moves = {
  [ChessPieceName.pawn]: calculatePawnMoves,
  [ChessPieceName.knight]: calculateKnightMoves,
  [ChessPieceName.rook]: calculateRookMoves,
  [ChessPieceName.king]: () => [] as Squares,
  [ChessPieceName.queen]: () => [] as Squares,
  [ChessPieceName.bishop]: () => [] as Squares,
} as MovePiece;

const filterInvalidMoves = (square: Square) => {
  if (square.row > 8 || square.row < 1) {
    return false;
  }
  if (square.column == null) {
    return false;
  }
  return true;
};

const filterMovesToTeamMateSpaces = (
  board: ChessBoard,
  selectedPieceColor: ChessColor
) => {
  return (square: Square) => {
    const chessSquare = getSquareAtCoordinate(board, square);
    const chessPiece = chessSquare?.chessPiece;
    return !chessPiece || chessPiece.color !== selectedPieceColor;
  };
};

const filterPotentialPawnCaptures = (
  board: ChessBoard,
  selectedPieceColor: ChessColor
) => {
  return (square: Square) => {
    const chessSquare = getSquareAtCoordinate(board, square);
    const chessPiece = chessSquare?.chessPiece;
    return chessPiece?.color === selectedPieceColor;
  };
};

export function calculateMove(
  chessPiece: ChessPiece | undefined,
  square: Square,
  board: ChessBoard
): Squares {
  {
    if (!chessPiece) {
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    const move = moves[chessPiece.name];
    const availableMoves = move(square, board, chessPiece) as Squares;
    return availableMoves
      .filter(filterInvalidMoves)
      .filter(filterMovesToTeamMateSpaces(board, chessPiece.color));
  }
}

export function pawnStartingMoves(
  board: ChessBoard,
  chessPiece: ChessPiece,
  square: Square
) {
  const rows = chessPiece.color === ChessColor.black ? [6, 5] : [3, 4];
  const direction = movementDirection(chessPiece);
  const columnIndex = columnLetters.findIndex(
    (value) => value === square.column
  );
  const potentialCaptures = [
    {
      row: +square.row + direction,
      column: columnLetters[columnIndex - direction],
    },
    {
      row: +square.row + direction,
      column: columnLetters[columnIndex + direction],
    },
  ] as Squares;
  const filterCaptures = filterPotentialPawnCaptures(board, chessPiece?.color);
  const prefilteredrows = rows.map((row) => ({ row, column: square.column }));
  const moves = prefilteredrows.filter((move) => {
    const chessPiece = getSquareAtCoordinate(board, move as Square)?.chessPiece;
    return !chessPiece;
  });

  const whiteDirection = (row: number) => row <= square.row + direction;
  const blackDirection = (row: number) => row >= square.row + direction;

  const availableMoves =
    prefilteredrows.length != moves.length
      ? moves.filter((move) =>
          direction > 0 ? whiteDirection(move.row) : blackDirection(move.row)
        )
      : moves;
  return [
    ...availableMoves,
    ...potentialCaptures.filter(filterCaptures),
  ] as Squares;
}

export function pawnMoves(
  board: ChessBoard,
  chessPiece: ChessPiece,
  square: Square
) {
  const direction = movementDirection(chessPiece);
  const columnIndex = columnLetters.findIndex(
    (value) => value === square.column
  );
  const row = +square.row + +direction;
  const filterCaptures = filterPotentialPawnCaptures(board, chessPiece?.color);
  const blockedMoves = (square: Square) =>
    !filterPotentialPawnCaptures(board, chessPiece?.color)(square);
  const potentialCaptures = [
    { row, column: columnLetters[columnIndex - 1] },
    { row, column: columnLetters[columnIndex + 1] },
  ] as Squares;
  const moves = [{ row, column: square.column }] as Squares;

  const availableMoves = moves.filter((move) => blockedMoves(move));
  return [...availableMoves, ...potentialCaptures.filter(filterCaptures)];
}

function calculatePawnMoves(
  square: Square,
  board: ChessBoard,
  chessPiece: ChessPiece
) {
  if (!chessPiece.moved) {
    return pawnStartingMoves(board, chessPiece, square);
  }
  return pawnMoves(board, chessPiece, square);
}

function calculateKnightMoves(
  square: Square,
  board: ChessBoard,
  chessPiece: ChessPiece
): Squares {
  const columnIndex = columnLetters.findIndex(
    (value) => value === square.column
  );
  const upMoves = [
    { row: +square.row + 2, column: columnLetters[columnIndex - 1] },
    { row: +square.row + 2, column: columnLetters[columnIndex + 1] },
  ] as Squares;
  const downMoves = [
    { row: +square.row - 2, column: columnLetters[columnIndex - 1] },
    { row: +square.row - 2, column: columnLetters[columnIndex + 1] },
  ] as Squares;
  const leftMoves = [
    { row: +square.row - 1, column: columnLetters[columnIndex - 2] },
    { row: +square.row + 1, column: columnLetters[columnIndex - 2] },
  ] as Squares;
  const rightMoves = [
    { row: +square.row - 1, column: columnLetters[columnIndex + 2] },
    { row: +square.row + 1, column: columnLetters[columnIndex + 2] },
  ] as Squares;

  const possibleMoves = [...upMoves, ...downMoves, ...leftMoves, ...rightMoves];
  return possibleMoves;
}

function calculateRookMoves(
  square: Square,
  board: ChessBoard,
  chessPiece: ChessPiece
): Squares {
  const columnIndex = columnLetters.findIndex(
    (value) => value === square.column
  );
  const leftMoves = columnLetters
    .filter((value, index) => index < columnIndex)
    .map((column) => ({ column, row: square.row }));
  const rightMoves = columnLetters
    .filter((value, index) => index > columnIndex)
    .map((column) => ({ column, row: square.row } as Square));

  const upMoves = [];

  const possibleMoves = [...leftMoves, ...rightMoves] as Squares;
  return possibleMoves;
}
