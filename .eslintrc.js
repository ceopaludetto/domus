module.exports = {
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "prettier"],
  plugins: ["typescript-sort-keys", "prettier"],
  parserOptions: { project: "tsconfig.json" },
  settings: {
    react: {
      version: "17.0.2",
    },
  },
  rules: {
    "prettier/prettier": "error",
    // typescript
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/no-throw-literal": "off",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
    // react
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/default-props-match-prop-types": "off",
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
  },
};
