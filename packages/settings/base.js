module.exports = {
  extends: ["plugin:regexp/recommended", "prettier"],
  plugins: ["typescript-sort-keys", "regexp", "sort-keys-fix", "prettier"],
  rules: {
    "prettier/prettier": "error",
    // typescript
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/no-throw-literal": "off",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
    // import
    "import/prefer-default-export": "off",
    "import/order": [
      "error",
      {
        groups: ["type", ["builtin", "external"], ["parent", "sibling", "internal"], "index", "object"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/extensions": "off",
    // misc
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "sort-keys-fix/sort-keys-fix": ["warn", "asc", { caseSensitive: false }],
  },
};
