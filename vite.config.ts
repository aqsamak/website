import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Features } from 'lightningcss';

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
            },
            adapter: adapter()
        })
    ],
    css: {
        lightningcss: {
            exclude:
                Features.Nesting |
                Features.NotSelectorList |
                Features.DirSelector |
                Features.LangSelectorList |
                Features.IsSelector |
                Features.TextDecorationThicknessPercent |
                Features.MediaIntervalSyntax |
                Features.MediaRangeSyntax |
                Features.CustomMediaQueries |
                Features.ClampFunction |
                Features.ColorFunction |
                Features.OklabColors |
                Features.LabColors |
                Features.P3Colors |
                Features.HexAlphaColors |
                Features.SpaceSeparatedColorNotation |
                Features.FontFamilySystemUi |
                Features.DoublePositionGradients |
                Features.VendorPrefixes |
                Features.LogicalProperties |
                Features.LightDark |
                Features.Selectors |
                Features.MediaQueries |
                Features.Colors
        }
    }
});
