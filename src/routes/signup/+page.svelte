<script lang="ts">
    import { X, Check } from '@lucide/svelte';
    import { resolve } from '$app/paths';

    let { data }: { data: { error?: string; email?: string } } = $props();

    let criteria = $derived.by(validatePassword);
    let password = $state('');
    let passwordConfirmation = $state('');

    function validatePassword() {
        let _criteria = {
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
</script>

<section class="auth-page">
    <h1>إنشاء حساب</h1>

    <div class="auth-dialog">
        <form method="POST" action="?/signInWithGoogle" class="google-auth-form"><button type="submit">إنشاء حساب باستخدام Google</button></form>
        <hr />
        <form method="POST" class="auth-form" action="?/signUpWithEmail">
            <div class="name-fields">
                <label>
                    <span>الاسم الأول</span>
                    <input type="text" name="first-name" required autocomplete="given-name">
                </label>
                <label>
                    <span>اسم العائلة</span>
                    <input type="text" name="last-name" required autocomplete="family-name">
                </label>
            </div>
            <label>
                <span>البريد الإلكتروني</span>
                <input type="email" name="email" value={data.email ?? ''} required dir="ltr" autocomplete="email"/>
            </label>
            <label>
                <span>كلمة المرور</span>
                <input
                    type="password"
                    name="password"
                    required
                    oninput={() => {
                        validatePassword();
                    }}
                    bind:value={password}
                    autocomplete="new-password"
                    dir="ltr"
                />
            </label>
            <label>
                <span>تأكيد كلمة المرور</span>
                <input
                    type="password"
                    name="confirm-password"
                    required
                    oninput={() => {
                        validatePassword();
                    }}
                    bind:value={passwordConfirmation}
                    autocomplete="new-password"
                    dir="ltr"
                />
            </label>
            <ul class="criteria">
                <li class="criterion" class:valid={criteria.length}>
                    {#if criteria.length}
                        <Check />
                    {:else}
                        <X />
                    {/if}
                    يجب أن تكون كلمة المرور أطول من ٨ حروف
                </li>
                <li class="criterion" class:valid={criteria.upperLower}>
                    {#if criteria.upperLower}
                        <Check />
                    {:else}
                        <X />
                    {/if}
                    يجب أن تحتوي كلمة المرور حروف كبيرة وصغيرة
                </li>
                <li class="criterion" class:valid={criteria.number}>
                    {#if criteria.number}
                        <Check />
                    {:else}
                        <X />
                    {/if}
                    يجب أن تحتوي كلمة المرور على أرقام
                </li>
                <li class="criterion" class:valid={criteria.symbol}>
                    {#if criteria.symbol}
                        <Check />
                    {:else}
                        <X />
                    {/if}
                    يجب أن تحتوي كلمة المرور على رموز
                </li>
                <li class="criterion" class:valid={criteria.confirm}>
                    {#if criteria.confirm}
                        <Check />
                    {:else}
                        <X />
                    {/if}
                    يجب أن تتطابق كلمة المرور مع تأكيد كلمة المرور
                </li>
            </ul>
            <button
                type="submit"
                class="btn btn-primary"
                disabled={!criteria.length ||
                    !criteria.upperLower ||
                    !criteria.number ||
                    !criteria.symbol ||
                    !criteria.confirm}>إنشاء حساب</button
            >
            <p class="form-footer">
                لديك حساب بالفعل؟ <a href={resolve('/login')}>تسجيل الدخول</a>
            </p>
        </form>
    </div>

    {#if data.error}
        <p class="message error">{data.error}</p>
    {/if}
</section>

<style>
    .auth-page {
        width: 100%;
        max-width: 32rem;
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

    .name-fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        gap: 0.75rem;

        & > label > input {
            min-width: 0;
        }
    }

    hr {
        border: none;
        height: 1px;
        background-color: var(--color-button);
    }

    .criterion {
        list-style-type: '';
        display: flex;
        gap: var(--spacing-2);
        color: light-dark(var(--color-error-700), var(--color-error-300));

        &.valid {
            color: light-dark(var(--color-secondary-700), var(--color-secondary-300));
        }
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
        font-size: 1rem;
    }

    a {
        color: var(--color-hyperlink);
    }
</style>
