<footer>
    <div class="links">
        <h3>روابط سريعة</h3>
        <ul>
            <li><a href="#!">الصفحة الرئيسية</a></li>
            <li><a href="#!">عنا</a></li>
            <li><a href="#!">الآراء</a></li>
        </ul>
    </div>
    <div class="social">
        <h3>حساباتنا</h3>
        <ul>
            <li><a href="#!" aria-label="telegram" class="btn btn-ghost btn-icon">tg</a></li>
            <li><a href="#!" aria-label="youtube" class="btn btn-ghost btn-icon">yt</a></li>
            <li><a href="#!" aria-label="tiktok" class="btn btn-ghost btn-icon">tt</a></li>
        </ul>
    </div>
</footer>

<style>
    footer {
        background-color: var(--color-surface);
        color: var(--color-text);
        color-scheme: dark light;
        margin-block-start: auto;
        padding: var(--spacing-14);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-14);

        @media (width >= 512px) {
            flex-direction: row;
        }

        & > div {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-4);

            & > h3 {
                line-height: 1;
            }

            & > ul {
                list-style: none;
            }
        }

        & > .social > ul {
            display: flex;
            flex-direction: row;
            gap: var(--spacing-2);
        }
    }
</style>
