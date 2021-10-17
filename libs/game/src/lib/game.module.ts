import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardEffects } from './ +state/board.effects';
import { APP_FEATURE_KEY, reducer } from './ +state/board.reducer';
import { ChessBoardRowComponent } from './chess-board-row/chess-board-row.component';
import { ChessBoardPresentationComponent } from './chess-board/chess-board.component';
import { ChessPieceComponent } from './chess-square/chess-piece/chess-piece.component';
import { ChessSquareComponent } from './chess-square/chess-square.component';
import { GameBoardComponent } from './game-board.component';
import { chessBoardRoutes } from './game-board.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(chessBoardRoutes),
    StoreModule.forFeature(APP_FEATURE_KEY, reducer),
    EffectsModule.forFeature([BoardEffects]),
  ],
  declarations: [
    GameBoardComponent,
    ChessBoardPresentationComponent,
    ChessSquareComponent,
    ChessBoardRowComponent,
    ChessPieceComponent,
  ],
})
export class GameModule {}
