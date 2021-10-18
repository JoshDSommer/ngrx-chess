#!/bin/bash
cd apps/web-ngrx-chess/src/environments

echo Writing secrets

sed -i 's/SUPABASE_URL/'"$SUPABASE_URL"'/' environment.ts
sed -i 's/SUPABASE_KEY/'"$SUPABASE_KEY"'/' environment.ts

echo Done writing secrets
