import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TrackByFunction,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectEnemyChessPiece,
  selectPiece,
  selectSquare,
} from '../ +state/board.actions';
import {
  ChessColor,
  ChessPiece,
  emptySquare,
  Square,
} from '../ +state/board.models';
import { ChessBoardView, ChessBoardViewRow } from '../ +state/board.selectors';
@Component({
  selector: 'chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.white-team]': 'team === ChessColor.white',
    '[class.black-team]': 'team === ChessColor.black',
  },
})
export class ChessBoardPresentationComponent implements OnInit {
  ChessColor = ChessColor;
  @Input() team: ChessColor | null = ChessColor.white;
  @Input() board?: ChessBoardView = [];
  @Input() selectedCoordinate: Square | null | undefined = emptySquare();
  @Output() flipBoard = new EventEmitter();

  squareChange: TrackByFunction<ChessBoardViewRow> = (
    index: number,
    square: ChessBoardViewRow
  ) => {
    return square.row;
  };
  newSquare = (column: string, row: string) =>
    ({ column, row: +row } as Square);
  constructor(private store: Store) {}

  ngOnInit() {}

  squareSelected(square: Square) {
    this.store.dispatch(selectSquare({ square }));
  }

  chessPieceSelected(square: Square, chessPiece: ChessPiece) {
    const isSelectingTeamPiece = chessPiece?.color === this.team;
    if (!chessPiece) {
      return;
    }
    if (isSelectingTeamPiece) {
      this.store.dispatch(selectPiece({ square, chessPiece }));
      return;
    }

    this.store.dispatch(selectEnemyChessPiece({ square, chessPiece }));
  }
}
