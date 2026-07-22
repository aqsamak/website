<script lang="ts">
    import { resolve } from '$app/paths';

    let { data }: { data: { error?: string; email?: string } } = $props();
    let email = $state(""), password = $state("");
</script>

<section class="auth-page">
    <h1>تسجيل الدخول</h1>

    <div class="auth-dialog">
        <form method="POST" action="?/signInWithGoogle" class="google-auth-form">
            <button type="submit">تسجيل الدخول باستخدام Google</button>
        </form>

        <hr />

        <form method="POST" class="auth-form" action="?/signInWithEmail">
            <label>
                <span>البريد الإلكتروني</span>
                <input type="email" name="email" required value={data.email ?? ''} autocomplete="email"/>
            </label>

            <label>
                <span>كلمة المرور</span>
                <input type="password" name="password" required bind:value={password} autocomplete="current-password"/>
            </label>

            <button type="submit" class="btn btn-primary" disabled={!email || !password}>تسجيل الدخول</button>

            <p class="form-footer">
                ليس لديك حساب؟ <a href={resolve('/signup')}>إنشاء حساب</a>
            </p>
        </form>
    </div>

    {#if data.error}
        <p class="message error">{data.error}</p>
    {/if}
</section>

<style>
    .auth-page {
        min-width: min(100%, 32rem);
        margin: 0 auto;
        padding: 1rem;
        display: grid;
        gap: 0.75rem;
    }

    .auth-dialog {
        display: grid;
        gap: 1rem;
        background: var(--color-surface);
        padding: 1rem;
        border-radius: var(--radius-lg);
    }

    .google-auth-form {
        display: grid;
    }

    .auth-form {
        display: grid;
        gap: 0.75rem;
    }

    hr {
        border: none;
        height: 1px;
        background-color: var(--color-button);
    }

    .auth-form > button[type='submit'] {
        max-width: fit-content;
        margin-inline: auto;
    }

    .message {
        margin-top: 1rem;
        padding: 0.9rem 1rem;
        border-radius: var(--radius-md);
    }

    .error {
        background: var(--color-error-100);
        color: var(--color-error-900);
    }

    .form-footer {
        text-align: center;
        color: var(--color-text);
    }

    a {
        color: var(--color-hyperlink);
    }
</style>
