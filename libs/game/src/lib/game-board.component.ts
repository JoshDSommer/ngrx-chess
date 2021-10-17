import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { otherTeamsTurn } from './ +state/board.actions';
import {
  getSelectedChessPieceSquare,
  selectTeam,
  watchBoard,
} from './ +state/board.selectors';

@Component({
  selector: 'game-board',
  template: `
    <chess-board
      [board]="(board$ | async)!"
      [selectedCoordinate]="selectedCoordinate$ | async"
      [team]="(team$ | async)!"
      (flipBoard)="flipBoard()"
    ></chess-board>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent {
  board$ = this.store.pipe(select(watchBoard));
  selectedCoordinate$ = this.store.pipe(select(getSelectedChessPieceSquare));
  team$ = this.store.pipe(select(selectTeam));

  constructor(private store: Store) {}

  flipBoard() {
    this.store.dispatch(otherTeamsTurn());
  }
}
