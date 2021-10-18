import { Component } from '@angular/core';
import { SupabaseLoginService } from '@ngrx-chess/shared';
@Component({
  selector: 'chess-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;
  constructor(private loginService: SupabaseLoginService) {}

  async handleLogin(input: string) {
    try {
      this.loading = true;
      await this.loginService.signIn(input);
      alert('Check your email for the login link!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      this.loading = false;
    }
  }
}
