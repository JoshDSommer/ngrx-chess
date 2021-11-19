import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@web-chess-env';

@Injectable({ providedIn: 'root' })
export class GameService {
  supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async createGame() {
    return await this.supabase.from('game').insert({});
  }
}
