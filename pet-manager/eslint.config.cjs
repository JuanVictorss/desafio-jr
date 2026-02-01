const nextCore = require('eslint-config-next/core-web-vitals');
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  // Ignore build output
  { ignores: ['node_modules/**', '.next/**', 'out/**'] },

  // Import Next.js core-web-vitals config directly
  ...nextCore,

  // Apply Prettier via compat
  ...compat.extends('prettier'),

  // Lint JS/TS files with TypeScript parser and JSX support
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: { '@typescript-eslint': require('@typescript-eslint/eslint-plugin') },
  },
];
