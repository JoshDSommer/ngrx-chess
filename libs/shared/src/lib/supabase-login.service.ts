import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@web-chess-env';
@Injectable({
  providedIn: 'root',
})
export class SupabaseLoginService {
  private supabaseClient: SupabaseClient;
  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supbaseKey
    );
  }
  getUser() {
    return this.supabaseClient.auth.user();
  }

  getSession() {
    return this.supabaseClient.auth.session();
  }
  refreshSession() {
    return this.supabaseClient.auth.refreshSession();
  }
  signIn(email: string) {
    return this.supabaseClient.auth.signIn({ email });
  }

  signOut() {
    return this.supabaseClient.auth.signOut();
  }
}
