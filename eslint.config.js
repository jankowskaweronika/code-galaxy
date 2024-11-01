import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import nodePlugin from 'eslint-plugin-node'
import promisePlugin from 'eslint-plugin-promise'
import globals from 'globals'

const configDefaults = js.configs.recommended

const configBase = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    import: importPlugin,
    n: nodePlugin,
    promise: promisePlugin,
  },
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',

    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/process-exit-as-throw': 'error',

    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-webpack-loader-syntax': 'error',

    'promise/param-names': 'error',
  },
}

const sharedTypeScriptRules = {
  ...tsPlugin.configs['recommended-type-checked'].rules,
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    disallowTypeAnnotations: true,
    fixStyle: 'separate-type-imports',
  }],
  'no-unused-vars': 'off',
}

const configTypeScriptApp = {
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.app.json',
      tsconfigRootDir: import.meta.dirname,
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: sharedTypeScriptRules,
}

const configTypeScriptNode = {
  files: ['vite.config.ts'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.node.json',
      tsconfigRootDir: import.meta.dirname,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: sharedTypeScriptRules,
}

const configReact = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    'react-refresh': reactRefreshPlugin,
  },
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
}

const configVite = {
  files: ['vite.config.{js,ts}'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
}

const configTests = {
  files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
  languageOptions: {
    globals: {
      ...globals.jest,
      ...globals.node,
    },
  },
}

export default [
  configDefaults,

  configBase,

  configTypeScriptApp,

  configTypeScriptNode,

  configReact,

  configVite,

  configTests,
]