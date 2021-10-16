import { createAction, props } from '@ngrx/store';
import { ChessPiece, Square } from './board.models';

export const gameStart = createAction('[Board State] create');

export const movePiece = createAction(
  '[Board State] move chess piece',
  props<{ from: Square; to: Square }>()
);

export const highlightSquare = createAction(
  '[Board State] highlight square',
  props<{ square: Square }>()
);

export const clearHighlightedSquares = createAction(
  '[Board State] clear highlighted squares'
);

export const takeWhitePiece = createAction(
  '[Board State] take white chess piece',
  props<{ from: Square; to: Square }>()
);

export const takeBlackPiece = createAction(
  '[Board State] take black chess piece',
  props<{ from: Square; to: Square }>()
);

export const takePiece = createAction(
  '[Board State] take chess piece',
  props<{ from: Square; to: Square }>()
);

export const selectSquare = createAction(
  '[Board State] select square',
  props<{ square: Square }>()
);

export const selectPiece = createAction(
  '[Board State] select chess piece',
  props<{ square: Square; chessPiece: ChessPiece }>()
);

export const selectEnemyChessPiece = createAction(
  '[Board State] select enemy chess piece',
  props<{ square: Square; chessPiece: ChessPiece }>()
);

export const setSelectedPiece = createAction(
  '[Board State] set selected chess piece',
  props<{ square: Square }>()
);

export const switchSelectedPiece = createAction(
  '[Board State] switch selected chess piece',
  props<{ square: Square }>()
);

export const clearSelections = createAction(
  '[Board State] clear selected piece and square'
);

export const otherTeamsTurn = createAction('[Board State] other teams turn');
