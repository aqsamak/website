<script lang="ts">
    import icon from "$lib/assets/favicon.svg";
</script>

<nav>
    <ul >
        <li><a href="#!" aria-label="الصفحة الرئيسية"><img src={icon} alt="شعار برشامة الكمي"></a></li>
        <li><a href="#!">عنا</a></li>
        <li><a href="#!">الآراء</a></li>
        <li><a href="#!">الأقسام</a></li>
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
        animation: stick-to-top forwards;
        animation-timeline: scroll(root);
        animation-range: 0rem 2rem;

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

    @keyframes stick-to-top {
        0% {
            margin-inline: 0;
            transform: translateY(calc(var(--spacing-6) * -1));
            border-radius: 0;
        }

        100% {
            transform: translateY(0);
            border-radius: var(--radius-lg);
            background: oklch(from var(--color-surface) l c h / 0.75);
            backdrop-filter: blur(var(--radius-xs));
        }
    }
</style>