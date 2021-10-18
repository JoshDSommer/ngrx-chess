import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvalidComponent } from './invalid/invalid.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginComponent },
      { path: 'error', component: InvalidComponent },
      { path: 'logout', component: InvalidComponent },
    ]),
  ],
})
export class LoginModule {}
