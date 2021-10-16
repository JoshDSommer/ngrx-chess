import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { calculateMove } from './board-moves';
import {
  clearHighlightedSquares,
  clearSelections,
  highlightSquare,
  movePiece,
  otherTeamsTurn,
  selectEnemyChessPiece,
  selectPiece,
  selectSquare,
  setSelectedPiece,
  takeBlackPiece,
  takeWhitePiece,
} from './board.actions';
import {
  getGetChessPiece,
  isValidMove,
  sameCoordinates,
} from './board.functions';
import { ChessColor, ChessPiece, Square } from './board.models';
import {
  getSelectedChessPieceSquare,
  selectBoard,
  selectPossibleMovesFrom,
  selectTeam,
} from './board.selectors';

function takeChessPieceByColor(chessPiece: ChessPiece | undefined) {
  if (chessPiece?.color === ChessColor.black) {
    return takeBlackPiece;
  }
  return takeWhitePiece;
}

interface ChessPieceMove {
  chessPiece: ChessPiece;
  move: { from: Square; to: Square };
}

@Injectable()
export class BoardEffects {
  setSelectedChessPiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectPiece),
      concatLatestFrom(() => this.store.select(selectTeam)),
      filter(([{ chessPiece }, team]) => chessPiece.color === team),
      switchMap(([{ square }]) => [
        setSelectedPiece({ square }),
        clearHighlightedSquares(),
      ])
    )
  );

  highlightPossibleMoves = createEffect(() =>
    this.actions$.pipe(
      ofType(selectPiece),
      concatLatestFrom(() => this.store.select(selectBoard)),
      map(([{ square }, board]) =>
        calculateMove(getGetChessPiece(board, square), square, board)
      ),
      switchMap((possibleMoves) =>
        possibleMoves.map((square) => highlightSquare({ square }))
      )
    )
  );

  clearSelectedSquare$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectPiece),
      map((action) => action.square),
      concatLatestFrom(() => this.store.select(getSelectedChessPieceSquare)),
      filter(([selectedChessPieceSquare, previousChessPiece]) =>
        sameCoordinates(selectedChessPieceSquare, previousChessPiece)
      ),
      switchMap(() => [clearSelections(), clearHighlightedSquares()])
    )
  );

  moveSelectedPiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectSquare),
      map((action) => action.square),
      concatLatestFrom(() => this.store.select(selectPossibleMovesFrom)),
      filter(([action, info]) => isValidMove(info.moves, action)),
      map(
        ([to, info]) =>
          ({
            chessPiece: info?.chessPiece,
            move: { from: info.from, to },
          } as ChessPieceMove)
      ),
      map(({ move }) => movePiece(move))
    )
  );

  takePieceByColor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectEnemyChessPiece),
      map((action) => action.square),
      concatLatestFrom(() => this.store.select(selectPossibleMovesFrom)),
      filter(([action, info]) => isValidMove(info.moves, action)),
      map(
        ([to, info]) =>
          ({
            chessPiece: info.chessPiece,
            move: { from: info.from, to },
          } as ChessPieceMove)
      ),
      filter((info) => !info?.chessPiece),
      map(({ move, chessPiece }) => takeChessPieceByColor(chessPiece)(move))
    )
  );

  takePiece$ = createEffect(() =>
    this.actions$.pipe(
      ofType(takeBlackPiece, takeWhitePiece),
      map((move) => movePiece(move))
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
