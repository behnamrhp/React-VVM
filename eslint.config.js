import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'
import airbnb from 'eslint-config-airbnb'
import ts from "@typescript-eslint/parser"

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'prettier': prettier,
      "airbnb": airbnb,
      "ts": ts
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          "allowTernary": true,
          "allowTaggedTemplates": true
        }
      ],
      "prettier/prettier": [
        "warn",
        {
          "printWidth": 80,
          "tabWidth": 2,
          "endOfLine": "auto",
          "useTabs": false,
          "semi": true,
          "singleQuote": false,
          "quoteProps": "as-needed",
          "jsxSingleQuote": false,
          "trailingComma": "all",
          "bracketSpacing": true,
          "arrowParens": "always"
        }
      ],
    },
  },
)
