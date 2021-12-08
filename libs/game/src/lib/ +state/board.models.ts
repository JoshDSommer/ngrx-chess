export const columnLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const rowNumbers = [
  'row1',
  'row2',
  'row3',
  'row4',
  'row5',
  'row6',
  'row7',
  'row8',
] as const;
export type Column = typeof columnLetters[number];
export type Row = typeof rowNumbers[number];
export interface Square {
  column: Column;
  row: Row;
}

export type Squares = Square[];

export function emptySquare(): Square {
  return { row: 'row1', column: 'a' } as Square;
}

export enum SquareState {
  sameTeam = 'sameTeam',
  differentTeam = 'differentTeam',
  emptySquare = 'emptySquare',
  sameChessPiece = 'sameChessPiece',
  noChessPieceSelected = 'noChessPieceSelected',
}

export enum ChessPieceName {
  pawn = 'pawn',
  rook = 'rook',
  knight = 'knight',
  bishop = 'bishop',
  king = 'king',
  queen = 'queen',
}

export enum ChessColor {
  white = 'white',
  black = 'black',
}

export interface ChessPiece {
  color: ChessColor;
  name: ChessPieceName;
  moved: boolean;
  possibleMoves: Squares;
}

export type TakenPieces = ChessSquare[];

export interface ChessSquare {
  chessPiece?: ChessPiece;
  highlighted: boolean;
}

export type ChessRow = {
  a: ChessSquare;
  b: ChessSquare;
  c: ChessSquare;
  d: ChessSquare;
  e: ChessSquare;
  f: ChessSquare;
  g: ChessSquare;
  h: ChessSquare;
};
export type ChessBoard = {
  row8: ChessRow;
  row7: ChessRow;
  row6: ChessRow;
  row5: ChessRow;
  row4: ChessRow;
  row3: ChessRow;
  row2: ChessRow;
  row1: ChessRow;
};

export interface BoardState {
  board: ChessBoard;
  selectedSquare?: Square;
  selectedChessPiece?: Square;
  selectedEnemyChessPiece?: Square;
  teamInFocus: ChessColor;
  whitesTakenPieces: TakenPieces;
  blacksTakenPieces: TakenPieces;
  possibleMoves: Squares;
}
