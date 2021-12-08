/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getGetChessPiece, getSquareAtCoordinate } from './board.functions';
import { BoardState, ChessPiece, Column } from './board.models';
import { APP_FEATURE_KEY } from './board.reducer';
export const featureState = createFeatureSelector<BoardState>(APP_FEATURE_KEY);
export type ChessBoardViewSquare = {
  key: Column;
  chessPiece: ChessPiece;
  highlighted: boolean;
};
export type ChessBoardViewRow = { key: string; row: ChessBoardViewSquare[] };
export type ChessBoardView = ChessBoardViewRow[];
export const watchBoard = createSelector(featureState, ({ board }) => {
  return board;
});

export const selectTeam = createSelector(
  featureState,
  ({ teamInFocus }) => teamInFocus
);

export const selectBoard = createSelector(featureState, (state) => state.board);

export const getSelectedSquare = createSelector(
  featureState,
  (state) => state?.selectedSquare
);

export const getPossibleMoves = createSelector(
  featureState,
  (state) => state?.possibleMoves
);

export const getSelectedChessPieceSquare = createSelector(
  featureState,
  (state) => state?.selectedChessPiece
);

export const getSelectedEnemyChessPieceSquare = createSelector(
  featureState,
  (state) => state?.selectedEnemyChessPiece
);
export const getSelectedChessPiece = createSelector(
  selectBoard,
  getSelectedChessPieceSquare,
  (board, selectedChessPiece) => {
    if (!selectChessPiece) {
      return;
    }
    return getGetChessPiece(board, selectedChessPiece!);
  }
);

export const getSelectedEnemeyChessPiece = createSelector(
  selectBoard,
  getSelectedEnemyChessPieceSquare,
  (board, chessPiece) => {
    if (!chessPiece) {
      return;
    }
    return getGetChessPiece(board, chessPiece);
  }
);
export const getChessPieceAtSelectedSquare = createSelector(
  selectBoard,
  getSelectedSquare,
  (board, selectedSquare) => {
    if (!selectedSquare) {
      return;
    }
    return getGetChessPiece(board, selectedSquare);
  }
);

export const getSelectedChessPieceSquareAndBoard = createSelector(
  getChessPieceAtSelectedSquare,
  selectBoard,
  (piece, board) => ({ piece, board })
);

export const selectChessPiece = createSelector(
  selectBoard,
  getSelectedSquare,
  (board, selectedSquare) => {
    if (!selectedSquare) {
      return;
    }
    return getSquareAtCoordinate(board, selectedSquare);
  }
);

export const selectPossibleMovesFrom = createSelector(
  getPossibleMoves,
  getSelectedChessPieceSquare,
  getSelectedChessPiece,
  (moves, square, chessPiece) => ({ moves, chessPiece, from: square })
);
