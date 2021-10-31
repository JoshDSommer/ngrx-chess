import { Action, createReducer, on } from '@ngrx/store';
import {
  clearHighlightedSquares,
  clearSelections,
  highlightSquare,
  movePiece,
  otherTeamsTurn,
  selectEnemyChessPiece,
  selectSquare,
  setSelectedPiece,
  switchSelectedPiece,
  takeBlackPiece,
  takeWhitePiece,
} from './board.actions';
import {
  getSquareAtCoordinate,
  removeHighlightOnSquares,
  setChessSquareHighlightedState,
} from './board.functions';
import { initialState } from './board.intialState';
import { BoardState, ChessColor } from './board.models';
export const APP_FEATURE_KEY = 'board';

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: BoardState;
}

const boardReducer = createReducer(
  initialState,
  on(setSelectedPiece, (state, { square }) => ({
    ...state,
    selectedChessPiece: square,
    selectedEnemyChessPiece: undefined,
  })),
  on(switchSelectedPiece, (state, { square }) => ({
    ...state,
    selectedEnemyChessPiece: undefined,
    selectedChessPiece: square,
  })),
  on(selectSquare, (state, { square }) => ({
    ...state,
    selectedSquare: square,
  })),
  on(clearSelections, (state) => ({
    ...state,
    selectedEnemyChessPiece: undefined,
    selectedSquare: undefined,
    selectedChessPiece: undefined,
  })),
  on(highlightSquare, (state, { square }) => {
    const board = setChessSquareHighlightedState(state.board, square, true);
    return { ...state, board, possibleMoves: [...state.possibleMoves, square] };
  }),
  on(clearHighlightedSquares, (state) => ({
    ...state,
    board: removeHighlightOnSquares(state.board, state.possibleMoves),
    possibleMoves: [],
  })),
  on(movePiece, (state, { to, from }) => {
    const currentChessSquare = getSquareAtCoordinate(state.board, from);
    const chessPiece = { ...currentChessSquare?.chessPiece, moved: true };

    const updatedBoardState = { ...state.board };
    updatedBoardState[from?.row] = {
      ...updatedBoardState[from?.row],
      [from?.column]: {},
    };

    updatedBoardState[to.row] = {
      ...updatedBoardState[to.row],
      [to.column]: { ...currentChessSquare, chessPiece },
    };

    return {
      ...state,
      board: updatedBoardState,
      selectedSquare: undefined,
      selectedChessPiece: undefined,
    } as BoardState;
  }),
  on(takeBlackPiece, (state, { from }) => {
    const currentPiece = getSquareAtCoordinate(state.board, from);
    return {
      ...state,
      whitesTakenPieces: [...state.whitesTakenPieces, currentPiece],
    } as BoardState;
  }),
  on(takeWhitePiece, (state, { from }) => {
    const currentPiece = getSquareAtCoordinate(state.board, from);
    return {
      ...state,
      blacksTakenPieces: [...state.blacksTakenPieces, currentPiece],
    } as BoardState;
  }),
  on(selectEnemyChessPiece, (state, { square }) => ({
    ...state,
    selectedEnemyChessPiece: state.selectedChessPiece,
  })),
  on(otherTeamsTurn, (state) => {
    return {
      ...state,
      teamInFocus:
        state.teamInFocus === ChessColor.white
          ? ChessColor.black
          : ChessColor.white,
    };
  })
);

export function reducer(state: BoardState | undefined, action: Action) {
  return boardReducer(state, action);
}
