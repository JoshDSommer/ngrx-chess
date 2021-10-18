import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './+state/user.effects';
import * as fromUser from './+state/user.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class SharedModule {}
