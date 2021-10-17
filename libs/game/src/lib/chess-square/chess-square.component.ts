import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ChessPiece, Square } from '../ +state/board.models';

@Component({
  selector: 'chess-square',
  templateUrl: './chess-square.component.html',
  styleUrls: ['./chess-square.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(click)': 'selectSquare(square, $event)',
    '[class.selected]': 'isSelected',
  },
})
export class ChessSquareComponent {
  @Input() chessPiece: ChessPiece | undefined;
  @Input() square: Square | undefined;
  @Input() isSelected = false;
  @Input() isHighlighted = false;
  @Output() squareSelected = new EventEmitter<Square>();
  @Output() chessPieceSelected = new EventEmitter<Square>();

  constructor() {}

  selectSquare(square: Square, $event: Event) {
    $event.stopPropagation();
    if (!this.chessPiece) {
      this.squareSelected.emit(square);
    } else {
      this.chessPieceSelected.emit(square);
    }
  }
}
