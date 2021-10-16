import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getGetChessPiece, getSquareAtCoordinate } from './board.functions';
import { BoardState } from './board.models';
import { APP_FEATURE_KEY } from './board.reducer';
export const featureState = createFeatureSelector<BoardState>(APP_FEATURE_KEY);

export const watchBoard = createSelector(featureState, ({ board }) => {
  const rows = Object.entries(board)
    .map(([key, row]) => ({
      key: key,
      row: Object.entries(row).map(([key, row]) => ({
        key,
        chessPiece: row.chessPiece,
        highlighted: row.highlighted,
      })),
    }))
    .reverse();
  return rows;
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
  (board, selectedChessPiece) => getGetChessPiece(board, selectedChessPiece)
);

export const getSelectedEnemeyChessPiece = createSelector(
  selectBoard,
  getSelectedEnemyChessPieceSquare,
  (board, chessPiece) => getGetChessPiece(board, chessPiece)
);
export const getChessPieceAtSelectedSquare = createSelector(
  selectBoard,
  getSelectedSquare,
  (board, selectedSquare) => getGetChessPiece(board, selectedSquare)
);

export const getSelectedChessPieceSquareAndBoard = createSelector(
  getChessPieceAtSelectedSquare,
  selectBoard,
  (piece, board) => ({ piece, board })
);

export const selectChessPiece = createSelector(
  selectBoard,
  getSelectedSquare,
  getSquareAtCoordinate
);

export const selectPossibleMovesFrom = createSelector(
  getPossibleMoves,
  getSelectedChessPieceSquare,
  getSelectedChessPiece,
  (moves, square, chessPiece) => ({ moves, chessPiece, from: square })
);
