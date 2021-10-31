import { getGetChessPiece, getSquareAtCoordinate } from './board.functions';
import { initialState } from './board.intialState';
import { ChessBoard, ChessColor, ChessPieceName, Square } from './board.models';
describe('Board Function ', () => {
  let board: ChessBoard;
  beforeEach(() => {
    board = initialState.board;
  });

  describe('getSquareAtCoordinate', () => {
    it('should return a the square with the black queen piece', () => {
      const square: Square = {
        column: 'd',
        row: 8,
      };
      const result = getSquareAtCoordinate(board, square);

      expect(result?.chessPiece?.name).toBe(ChessPieceName.queen);
      expect(result?.chessPiece?.color).toBe(ChessColor.black);
    });
  });

  describe('getGetChessPiece', () => {
    it('should return a the black queen piece', () => {
      const square: Square = {
        column: 'd',
        row: 8,
      };
      const result = getGetChessPiece(board, square);
      expect(result?.name).toBe(ChessPieceName.queen);
      expect(result?.color).toBe(ChessColor.black);
    });
  });
});
