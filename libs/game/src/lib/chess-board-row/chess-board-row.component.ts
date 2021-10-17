import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'chess-board-row',
  templateUrl: './chess-board-row.component.html',
  styleUrls: ['./chess-board-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChessBoardRowComponent {}
