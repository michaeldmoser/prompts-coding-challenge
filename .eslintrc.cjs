module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "standard",
    "prettier",
    "plugin:storybook/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 13,
    "sourceType": "module",
  },
  "overrides": [
    {
      "files": ["*.jsx", "*.js", "*.tsx", "*.ts"],
    },
    {
      "files": ["**/__tests__/*"],
      "rules": {
        "no-unused-expressions": "off",
        "react/display-name": "off",
      },
    },
  ],
  "globals": {
    "_env": "readonly",
    "after": "readonly",
    "afterAll": "readonly",
    "afterEach": "readonly",
    "alert": "readonly",
    "assert": "readonly",
    "before": "readonly",
    "beforeAll": "readonly",
    "beforeEach": "readonly",
    "crypto": "readonly",
    "cy": "readonly",
    "Cypress": "readonly",
    "describe": "readonly",
    "expect": "readonly",
    "fetch": "readonly",
    "FormData": "readonly",
    "it": "readonly",
    "Response": "readonly",
    "test": "readonly",
    "expect": "readonly",
  },
  "plugins": ["react", "prettier", "@typescript-eslint"],
  "rules": {
    "camelcase": "off",
    "react/prop-types": 2,
    "react/display-name": "off",
    "n/no-callback-literal": "off",
    "no-console": 1,
    "prettier/prettier": 2,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "(^_|.*Ignored$)",
      },
    ],
    "no-unused-vars": "off",
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "root": true,
};
