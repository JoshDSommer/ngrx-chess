import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getGetChessPiece,
  getSquareAtCoordinate,
  isValidMove,
  sameCoordinates
} from './board.functions';
import { BoardState, ChessColor } from './board.models';
import { APP_FEATURE_KEY } from './board.reducer';
export const featureState = createFeatureSelector<BoardState>(APP_FEATURE_KEY);

export const watchBoard = createSelector(
  featureState,
  ({ board }) => {
    const rows = Object.entries(board)
      .map(([key, row]) => ({
        key: key,
        row: Object.entries(row).map(([key, row]) => ({
          key,
          chessPiece: row.chessPiece,
          highlighted: row.highlighted
        }))
      }))
      .reverse();
    return rows;
  }
);

export const selectTeam = createSelector(
  featureState,
  ({ teamInFocus }) => teamInFocus
);

export const selectBoard = createSelector(
  featureState,
  state => state.board
);

export const getSelectedSquare = createSelector(
  featureState,
  state => state.selectedSquare
);

export const getPossilbleMoves = createSelector(
  featureState,
  state => state.possibleMoves
);

export const getSelectedChessPieceSquare = createSelector(
  featureState,
  state => state.selectedChessPiece
);

export const getPreviousSelectedChessPieceSquare = createSelector(
  featureState,
  state => state.previousSelectedChessPiece
);
export const getSelectedChessPiece = createSelector(
  selectBoard,
  getSelectedChessPieceSquare,
  (board, selectedChessPiece) => getGetChessPiece(board, selectedChessPiece)
);

export const getPreviousSelectedChessPiece = createSelector(
  selectBoard,
  getPreviousSelectedChessPieceSquare,
  (board, previousSelectedChessPiece) =>
    getGetChessPiece(board, previousSelectedChessPiece)
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

export const selectedPieceIsTheSameTeamAsPrevious = createSelector(
  getPreviousSelectedChessPiece,
  getSelectedChessPiece,
  (previousChessPiece, currentChessPiece) =>
    !!previousChessPiece &&
    !!currentChessPiece &&
    previousChessPiece.color === currentChessPiece.color
);

export const switchToSelectedPiece = createSelector(
  getSelectedChessPieceSquare,
  selectedPieceIsTheSameTeamAsPrevious,
  (selectedChessPieceSquare, canSwitch) => ({
    canSwitch,
    selectedChessPieceSquare
  })
);

export enum ChessPieceAction {
  CanMove = 'canMove',
  CanTakeSelectedPiece = 'canTakeSelectedPiece',
  None = 'none',
  SwitchSelectedPiece = 'SwitchSelectedPiece'
}

export const clearSelectedChessPiece = createSelector(
  getPreviousSelectedChessPieceSquare,
  getSelectedChessPieceSquare,
  (previousChessPiece, selectedChessPieceSquare) => {
    return (
      !!selectedChessPieceSquare &&
      !!previousChessPiece &&
      sameCoordinates(selectedChessPieceSquare, previousChessPiece)
    );
  }
);

export const selectedChessPieceCanMoveToSelectedSquare = createSelector(
  getSelectedChessPieceSquare,
  getSelectedSquare,
  (selectedChessPieceSquare, selectedSquare) =>
    !!selectedSquare &&
    !!selectedChessPieceSquare &&
    !sameCoordinates(selectedSquare, selectedChessPieceSquare)
);

export const previousChessPieceCanTakeSelectedPiece = createSelector(
  getPreviousSelectedChessPiece,
  getSelectedChessPiece,
  getSelectedSquare,
  (previousChessPiece, currentChessPiece, selectedSquare) =>
    !previousChessPiece && !!currentChessPiece && !selectedSquare
);

export const selectedPieceInformation = createSelector(
  getSelectedChessPieceSquare,
  getSelectedSquare,
  getSelectedChessPiece,
  selectedChessPieceCanMoveToSelectedSquare,
  previousChessPieceCanTakeSelectedPiece,
  getPossilbleMoves,
  (
    selectedChessPieceSquare,
    selectedSquare,
    chessPiece,
    canMove,
    canTakeSelectedPiece,
    possibleMoves
  ) => {
    if (
      canTakeSelectedPiece &&
      isValidMove(possibleMoves, selectedChessPieceSquare)
    ) {
      return {
        chessPieceAction: ChessPieceAction.CanTakeSelectedPiece,
        move: {
          to: selectedChessPieceSquare,
          from: selectedChessPieceSquare
        },
        chessPiece
      };
    }
    if (canMove && isValidMove(possibleMoves, selectedSquare)) {
      return {
        chessPieceAction: ChessPieceAction.CanMove,
        move: { to: selectedSquare, from: selectedChessPieceSquare }
      };
    }
    return {
      chessPieceAction: ChessPieceAction.None,
      chessPiece,
      move: null
    };
  }
);
