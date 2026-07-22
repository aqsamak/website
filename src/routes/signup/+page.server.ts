import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    signUpWithEmail: async ({ request, locals }) => {
        const formData = await request.formData();
        const firstName = String(formData.get('first-name') ?? '').trim();
        const lastName = String(formData.get('last-name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '');
        const passwordConfirmation = String(formData.get('password-confirmation') ?? '');
        const validation = validatePassword(password, passwordConfirmation);

        if (!firstName || !lastName || !email || !password) {
            return fail(400, { error: 'يرجى إدخال الاسم كاملًا والبريد الإلكتروني وكلمة المرور' });
        }

        if (!validation.length || !validation.upperLower || !validation.number || !validation.symbol || !validation.confirm) {
            return fail(400, { error: 'يرجى التأكد من أن كلمة المرور تحقق المتطلبات' });
        }

        const { error } = await locals.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstName,
                    lastName
                }
            }
        });

        if (error) {
            return fail(400, { error: error.message, email });
        }

        throw redirect(303, '/login');
    },

    signInWithGoogle: async ({ request, locals }) => {
        const origin = new URL(request.url).origin;
        const { data, error } = await locals.supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/auth/callback`
            }
        })

        if (error) {
            return fail(400, { error: error.message });
        }

        if (data?.url) {
            throw redirect(303, data.url);
        }

        return fail(500, { error: 'Unable to start Google sign-in.' });
    }
} satisfies Actions;

function validatePassword(password: string, passwordConfirmation: string) {
    const _criteria = {
        length: false,
        upperLower: false,
        number: false,
        symbol: false,
        confirm: false
    };

    if (password.length >= 8) _criteria.length = true;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) _criteria.upperLower = true;
    if (/[0-9]/.test(password)) _criteria.number = true;
    if (/[^A-Za-z0-9]/.test(password)) _criteria.symbol = true;
    if (password !== "" && passwordConfirmation !== "" && password === passwordConfirmation) _criteria.confirm = true;

    return _criteria;
}