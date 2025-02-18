import type { Linter } from "eslint";
import type { Linter as TsLinter } from "@typescript-eslint/utils/ts-eslint";
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import tsparser from "@typescript-eslint/parser";
import tsplugin from "@typescript-eslint/eslint-plugin";

const config: (Linter.Config | TsLinter.ConfigType)[] = [
  { ignores: ["**/node_modules/**", "**/dist/**"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  { languageOptions: { globals: globals.node } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    files: ["**/*.{mts,ts}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tsplugin,
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
];

module.exports = config;
