import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        interface Platform {
            env: Env;
            ctx: ExecutionContext;
            caches: CacheStorage;
            cf?: IncomingRequestCfProperties;
        }

        interface Locals {
            supabase: SupabaseClient<Database>;
        }

        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
    }
}

export {};
