export interface Square {
  column: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
  row: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
export const rowLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export type Squares = Square[];

function emptySquare(): Square {
  return { row: 1, column: 'a' } as Square;
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
  8: ChessRow;
  7: ChessRow;
  6: ChessRow;
  5: ChessRow;
  4: ChessRow;
  3: ChessRow;
  2: ChessRow;
  1: ChessRow;
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
