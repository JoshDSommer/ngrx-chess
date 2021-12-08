import {
  BoardState,
  ChessColor,
  ChessPieceName,
  ChessRow,
  ChessSquare,
  columnLetters,
} from './board.models';

export const emptyRow = () => ({
  a: { highlighted: false },
  b: { highlighted: false },
  c: { highlighted: false },
  d: { highlighted: false },
  e: { highlighted: false },
  f: { highlighted: false },
  g: { highlighted: false },
  h: { highlighted: false },
});

const rowSeven = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
];
const rowEight = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.queen,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.king,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false,
    },
  },
];

const rowTwo = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false,
    },
  },
];

const rowOne = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.queen,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.king,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false,
    },
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false,
    },
  },
];

const mapRow = (rowToMap: ChessSquare[]) => {
  return rowToMap.reduce(
    (prev, curr, index) => ({ ...prev, [columnLetters[index]]: curr }),
    {}
  ) as ChessRow;
};

export const initialState: BoardState = {
  board: {
    row8: mapRow(rowEight),
    row7: mapRow(rowSeven),
    row6: emptyRow(),
    row5: emptyRow(),
    row4: emptyRow(),
    row3: emptyRow(),
    row2: mapRow(rowTwo),
    row1: mapRow(rowOne),
  },
  selectedSquare: undefined,
  selectedChessPiece: undefined,
  selectedEnemyChessPiece: undefined,
  teamInFocus: ChessColor.white,
  whitesTakenPieces: [],
  blacksTakenPieces: [],
  possibleMoves: [],
};
