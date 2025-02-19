import type { Linter } from "eslint";
import type { Linter as TsLinter } from "@typescript-eslint/utils/ts-eslint";
import eslint from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import pluginVue from "eslint-plugin-vue";
import prettierConfig from "eslint-config-prettier";
import vueParser from "vue-eslint-parser";

export default [
  { ignores: ["**/node_modules/**", "**/dist/**"] },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  { languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,cjs,mjs}"] },
  {
    files: ["**/*.{mts,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        projectService: true,
        extraFileExtensions: [".vue"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  prettierConfig,
] satisfies (Linter.Config | TsLinter.ConfigType)[];
