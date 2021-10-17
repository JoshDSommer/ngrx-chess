import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChessColor, ChessPiece, Square } from '../../ +state/board.models';

@Component({
  selector: 'chess-piece',
  templateUrl: './chess-piece.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChessPieceComponent {
  ChessColor = ChessColor;
  @Input() chessPiece: ChessPiece | undefined;
  @Input() square: Square | undefined;
  constructor() {}
}
