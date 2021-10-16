import { createReducer, on, select } from '@ngrx/store';
import {
  gameStart,
  selectSquare,
  selectPiece,
  movePiece,
  takePiece,
  otherTeamsTurn,
  switchSelectedPiece,
  clearSelections, takeBlackPiece, takeWhitePiece, setSelectedPiece, highlightSquare, clearHighlightedSquares
} from './board.actions';
import { getSquareAtCoordinate, setChessSquareHighlightedState, setChessSquaresHighlightedState } from './board.functions';
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
    previousSelectedChessPiece: state.selectedChessPiece,
    selectedChessPiece: square
  })),
  on(switchSelectedPiece, (state, { square }) => ({
    ...state,
    previousSelectedChessPiece: state.selectedChessPiece,
    selectedChessPiece: square
  })),
  on(selectSquare, (state, { square }) => ({
    ...state,
    selectedSquare: square
  })),
  on(clearSelections, state => ({
    ...state,
    previousSelectedChessPiece: state.selectedChessPiece,
    selectedSquare: null,
    selectedChessPiece: null,
  })),
  on(highlightSquare, (state,{square})=>{
    const board = setChessSquareHighlightedState(state.board,square,true);
    return {...state, board, possibleMoves: [...state.possibleMoves, square] };
  }),
  on(clearHighlightedSquares,state=>({
    ...state,
    board: setChessSquaresHighlightedState(state.board,state.possibleMoves, false),
    possibleMoves:[],
  })),
  on(movePiece, (state, { to, from }) => {
    const currentChessSquare = getSquareAtCoordinate(state.board, from);
    const chessPiece = {...currentChessSquare.chessPiece, moved:true };

    const updatedBoardState = { ...state.board };
    updatedBoardState[from?.row] = {
      ...updatedBoardState[from?.row],
      [from?.column]: {}
    };

    updatedBoardState[to.row] = {
      ...updatedBoardState[to.row],
      [to.column]: { ... currentChessSquare, chessPiece }
    };

    return {
      ...state,
      board: updatedBoardState,
      selectedSquare: null,
      selectedChessPiece: null
    };
  }),
  on(takeBlackPiece, (state, { to, from }) => {
    const currentPiece = getSquareAtCoordinate(state.board, from);
    return {
      ...state,
      whitesTakenPieces: [...state.whitesTakenPieces, currentPiece]
    };
  }),
    on(takeWhitePiece, (state, { to, from }) => {
    const currentPiece = getSquareAtCoordinate(state.board, from);
    return {
      ...state,
      blacksTakenPieces: [...state.blacksTakenPieces, currentPiece]
    };
  }),
  on(otherTeamsTurn, state => {
    return {
      ...state,
      teamInFocus:
        state.teamInFocus === ChessColor.white
          ? ChessColor.black
          : ChessColor.white
    };
  })
);

export function reducer(state: BoardState | undefined, action) {
  return boardReducer(state, action);
}
