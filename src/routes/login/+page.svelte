<script lang="ts">
    import { resolve } from '$app/paths';

    let { data }: { data: { error?: string; email?: string } } = $props();
</script>

<section class="auth-page">
    <h1>تسجيل الدخول</h1>

    <form method="POST" class="auth-form">
        <label>
            <span>البريد الإلكتروني</span>
            <input type="email" name="email" value={data.email ?? ''} required />
        </label>

        <label>
            <span>كلمة المرور</span>
            <input type="password" name="password" required minlength="6" />
        </label>

        <button type="submit" class="btn btn-primary">تسجيل الدخول</button>
    </form>

    {#if data.error}
        <p class="message error">{data.error}</p>
    {/if}

    <p class="form-footer">
        ليس لديك حساب؟ <a href={resolve('/signup')}>إنشاء حساب</a>
    </p>
</section>

<style>
    .auth-page {
        min-width: min(100%, 32rem);
        margin: 0 auto;
        padding: 1rem;
    }

    .auth-form {
        display: grid;
        gap: 0.75rem;
        background: var(--color-surface);
        padding: 1rem;
        border-radius: var(--radius-lg);
    }

    button[type='submit'] {
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
        margin-top: 1rem;
        color: var(--color-text);
    }

    a {
        color: var(--color-hyperlink);
    }
</style>
