import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Клиент знает только публичные URL и anon-ключ (CLAUDE.md §4.6).
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/** Клиент Supabase или null, пока переменные окружения не заданы (до подключения бэкенда). */
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;
