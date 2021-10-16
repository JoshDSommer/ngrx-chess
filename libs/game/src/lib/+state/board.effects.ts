import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import {
  clearSelections,
  movePiece,
  selectSquare,
  switchSelectedPiece,
  takeBlackPiece,
  takeWhitePiece,
  selectPiece,
  setSelectedPiece,
  otherTeamsTurn,
  highlightSquare,
  clearHighlightedSquares
} from './board.actions';
import { calculateMove, getGetChessPiece } from './board.functions';
import { ChessColor, ChessPiece } from './board.models';

import {
  selectedPieceInformation,
  ChessPieceAction,
  clearSelectedChessPiece,
  switchToSelectedPiece,
  selectTeam,
  getSelectedChessPieceSquareAndBoard,
  selectBoard
} from './board.selectors';

function takeChessPieceByColor(chessPiece: ChessPiece) {
  if (chessPiece.color === ChessColor.black) {
    return takeBlackPiece;
  }
  return takeWhitePiece;
}

@Injectable()
export class BoardEffects {
  setSelectedChessPiece$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log('action', action)),
      ofType(selectPiece),
      concatLatestFrom(() => this.store.select(selectTeam)),
      filter(([{ chessPiece }, team]) => chessPiece.color === team),
      switchMap(([{ square }]) => [
        setSelectedPiece({ square }),
        clearHighlightedSquares()
      ])
    )
  );

  highlightPossibleMoves = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedPiece),
      concatLatestFrom(() => this.store.select(selectBoard)),
      map(([{ square }, board]) =>
        calculateMove(getGetChessPiece(board, square), square, board)
      ),
      switchMap(possibleMoves =>
        possibleMoves.map(square => highlightSquare({ square }))
      )
    )
  );

  selectAnotherChessPiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedPiece),
      map(action => action.square),
      concatLatestFrom(() => this.store.select(switchToSelectedPiece)),
      map(([, info]) => info),
      filter(({ canSwitch }) => canSwitch),
      map(({ selectedChessPieceSquare }) => selectedChessPieceSquare),
      map(square => switchSelectedPiece({ square }))
    )
  );

  clearSelectedSquare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedPiece),
      map(action => action.square),
      concatLatestFrom(() => this.store.select(clearSelectedChessPiece)),
      filter(([, clearSelected]) => clearSelected),
      map(() => clearSelections())
    )
  );

  moveSelectedPiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectSquare),
      map(action => action.square),
      concatLatestFrom(() => this.store.select(selectedPieceInformation)),
      map(([, info]) => info),
      filter(
        ({ chessPieceAction }) => chessPieceAction === ChessPieceAction.CanMove
      ),
      map(({ move }) => movePiece(move))
    )
  );

  takePieceByColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectPiece),
      concatLatestFrom(() => this.store.select(selectTeam)),
      filter(([{ chessPiece }, team]) => chessPiece.color !== team),
      map(([action]) => action),
      concatLatestFrom(() => this.store.select(selectedPieceInformation)),
      map(([action, info]) => ({
        ...info,
        move: { ...info.move, to: action.square }
      })),
      filter(
        ({ chessPieceAction }) =>
          chessPieceAction === ChessPieceAction.CanTakeSelectedPiece
      ),
      map(({ move, chessPiece }) => takeChessPieceByColor(chessPiece)(move))
    )
  );

  takePiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(takeBlackPiece, takeWhitePiece),
      map(move => movePiece(move))
    )
  );

  clearOnMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movePiece),
      map(() => clearHighlightedSquares())
    )
  );

  endTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movePiece),
      delay(300),
      map(() => otherTeamsTurn())
    )
  );
  constructor(private actions$: Actions, private store: Store) {}
}
