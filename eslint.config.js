import hub from "@mindfiredigital/eslint-plugin-hub";
import globals from "globals";
//import tselint from '@typescript-eslint/eslint-plugin';
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "dist-ssr/**",
      "package-lock.json",
      "index.html",
      "*.config.js",
      "*.config.ts",
      "vite.config.ts",
      "commitlint.config.js",
      "tsconfig*.json",
    ],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      hub: hub,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "hub/vars-camelcase": "error",
      "hub/class-pascalcase": "error",
      "hub/file-kebabcase": "error",
      "hub/function-camelcase": "error",
      "hub/function-descriptive": "warn",
    },
  },
];
