import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '');

        if (!email || !password) {
            return fail(400, { error: 'Please enter both email and password.', email });
        }

        const { error } = await locals.supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return fail(400, { error: error.message, email });
        }

        throw redirect(303, '/');
    }
} satisfies Actions;
