import type { Linter } from "eslint";
import type { Linter as TsLinter } from "@typescript-eslint/utils/ts-eslint";
import eslint from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

const config: (Linter.Config | TsLinter.ConfigType)[] = [
  { ignores: ["**/node_modules/**", "**/dist/**"] },
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  { languageOptions: { globals: globals.node } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.{mts,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
    },
  },
  {
    files: ["**/*.mts"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  prettierConfig,
];

module.exports = config;
