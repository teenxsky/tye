import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-reserved-component-names': 'off',
        },
    },
    prettier,
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-reserved-component-names': 'off',
            'vue/html-indent': ['error', 2],
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['**/*.{ts,js,mjs,cjs}'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            'prettier/prettier': 'error',
        },
    },
]
