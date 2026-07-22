<script lang="ts">
    import icon from '$lib/assets/favicon.svg';
    import { resolve } from '$app/paths'
    import type { User } from '@supabase/supabase-js';
    import type { LayoutData } from '../../../routes/$types';
    import { onMount } from 'svelte';

    let { data }: { data: LayoutData } = $props();
    let user: User | null = $state(null);

    onMount(async () => {
        const { data: { user: fetchedUser } } = await data.supabase.auth.getUser();
        user = fetchedUser;
    });
</script>

<nav>
    <ul>
        <li>
            <a href="#!" aria-label="الصفحة الرئيسية"><img src={icon} alt="شعار برشامة الكمي" /></a>
        </li>
        <li><a href="#!">عنا</a></li>
        <li><a href="#!">الآراء</a></li>
        <li><a href="#!">الأقسام</a></li>
        <li class="account">
            {#if user}
               {`مرحبًا ${user.user_metadata.first_name ?? user.email?.split("@")[0]}`}
                <button class="btn btn-ghost" onclick={()=>{data.supabase.auth.signOut({scope: 'local'})}}>تسجيل الخروج</button>
            {:else}
                <a href={resolve('/login')}>
                    تسجيل الدخول
                </a>
                أو
                <a class="btn btn-primary" href={resolve('/signup')}>إنشاء حساب</a>
            {/if}
        </li>
    </ul>
</nav>

<style>
    nav {
        position: sticky;
        inset: auto;
        top: var(--spacing-6);
        margin: var(--spacing-6);
        margin-bottom: 0;
        padding: var(--spacing-8);
        background: var(--color-surface);
        margin-inline: 0;
        translate: 0 calc(var(--spacing-6) * -1);
        border-radius: 0;
        transition-property: margin-inline, translate, background, border-radius, box-shadow;
        transition-duration: 250ms;
        transition-timing-function: ease-in-out;
        box-shadow: 0 0 0 transparent;

        & > ul {
            display: flex;
            flex-direction: row;
            align-items: center;
            list-style: none;
            gap: var(--spacing-8);
            line-height: 1;

            & > li > a > img {
                height: 2em;
            }
        }
    }

    @container scroller scroll-state(scrollable: top) {
        nav {
            translate: 0 0;
            border-radius: var(--radius-lg);
            background: oklch(from var(--color-surface) l c h / 0.75);
            backdrop-filter: blur(var(--radius-xs));
            margin-inline: var(--spacing-6);
            box-shadow: 0 0.75rem 2rem light-dark(hsl(0 0 0 / 0.15), hsl(0 0 0 / 0.25));
        }
    }

    .account {
        margin-inline-start: auto;
        display: flex;
        flex-direction: row;
        gap: 0.75rem;
        align-items: center;
    }

    @keyframes stick-to-top {
        0% {
        }

        100% {
            transform: translateY(0);
            border-radius: var(--radius-lg);
            background: oklch(from var(--color-surface) l c h / 0.75);
            backdrop-filter: blur(var(--radius-xs));
        }
    }
</style>
