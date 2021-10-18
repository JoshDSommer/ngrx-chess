import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@ngrx-chess/shared';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from './+state/app.effects';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(
      { router: routerReducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 35,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
