<script lang="ts">
    import { X, Check } from "@lucide/svelte"
	import { resolve } from "$app/paths";

	let { data }: { data: { error?: string; email?: string } } = $props();


    let criteria = $derived.by(validatePassword);
    let password = $state("")
    let passwordConfirmation = $state("")

    function validatePassword() {
        let _criteria = {
            length: false,
            upperLower: false,
            number: false,
            symbol: false,
            confirm: false
        }

        if (password.length >= 8) _criteria.length = true;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) _criteria.upperLower = true;
        if (/[0-9]/.test(password)) _criteria.number = true;
        if (/[^A-Za-z0-9]/.test(password)) _criteria.symbol = true;
        if (password === passwordConfirmation) _criteria.confirm = true;

        return _criteria;
    }
</script>

<section class="auth-page">
	<h1>إنشاء حساب</h1>

	<form method="POST" class="auth-form">
		<label>
			<span>البريد الإلكتروني</span>
			<input type="email" name="email" value={data.email ?? ''} required dir="ltr" />
		</label>

		<label>
			<span>كلمة المرور</span>
			<input type="password" name="password" required oninput={() => {validatePassword()}} bind:value={password}  />
		</label>

        <label>
			<span>تأكيد كلمة المرور</span>
			<input type="password" name="password" required oninput={() => {validatePassword()}} bind:value={passwordConfirmation}  />
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

		<button type="submit" class="btn btn-primary" disabled={!criteria.length || !criteria.upperLower || !criteria.number || !criteria.symbol || !criteria.confirm}>إنشاء حساب</button>
	</form>

	{#if data.error}
		<p class="message error">{data.error}</p>
	{/if}

	<p class="form-footer">
		لديك حساب؟ <a href={resolve("/login")}>تسجيل الدخول</a>
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

    .criterion {
        list-style-type: "";
        display: flex;
        gap: var(--spacing-2);
        color: light-dark(var(--color-error-700), var(--color-error-300));

        &.valid {
            color: light-dark(var(--color-secondary-700), var(--color-secondary-300));
        }
    }

    button[type=submit] {
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
