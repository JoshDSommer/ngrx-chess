#!/bin/bash
cd apps/web-ngrx-chess/src/environments

echo Writing secrets

SEDOPTION="-i"
if [[ "$OSTYPE" == "darwin"* ]]; then
	sed -i '' -e 's/SUPABASE_URL/'"$SUPABASE_URL"'/;s/SUPABASE_KEY/'"$SUPABASE_KEY"'/' environment.ts
else
	sed -i 's/SUPABASE_URL/'"$SUPABASE_URL"'/;s/SUPABASE_KEY/'"$SUPABASE_KEY"'/' environment.ts
fi

echo Done writing secrets
