import {
  BoardState,
  ChessColor,
  ChessPiece,
  ChessPieceName,
  ChessRow,
  ChessSquare,
  rowLetters
} from './board.models';

const emptyRow = () => ({
  a: { highlighted: false },
  b: { highlighted: false },
  c: { highlighted: false },
  d: { highlighted: false },
  e: { highlighted: false },
  f: { highlighted: false },
  g: { highlighted: false },
  h: { highlighted: false }
});

const rowSeven = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  }
];
const rowEight = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.queen,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.king,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.black,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false
    }
  }
];

const rowTwo = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.pawn,
      possibleMoves: [],
      moved: false
    }
  }
];

const rowOne = [
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.queen,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.king,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.bishop,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.knight,
      possibleMoves: [],
      moved: false
    }
  },
  {
    highlighted: false,
    chessPiece: {
      color: ChessColor.white,
      name: ChessPieceName.rook,
      possibleMoves: [],
      moved: false
    }
  }
];

const mapRow = (rowToMap: ChessSquare[]) => {
  return rowToMap.reduce(
    (prev, curr, index) => ({ ...prev, [rowLetters[index]]: curr }),
    {}
  ) as ChessRow;
};

export const initialState: BoardState = {
  board: {
    8: mapRow(rowEight),
    7: mapRow(rowSeven),
    6: emptyRow(),
    5: emptyRow(),
    4: emptyRow(),
    3: emptyRow(),
    2: mapRow(rowTwo),
    1: mapRow(rowOne)
  },
  selectedSquare: null,
  selectedChessPiece: null,
  previousSelectedChessPiece: null,
  teamInFocus: ChessColor.white,
  whitesTakenPieces: [],
  blacksTakenPieces: [],
  possibleMoves: []
};
