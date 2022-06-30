module.exports = {
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "./base"],
  settings: {
    react: {
      version: "18.0.1",
    },
  },
  rules: {
    // react
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-sort-props": [
      "warn",
      { shorthandFirst: true, reservedFirst: true, multiline: "last", ignoreCase: true },
    ],
    "react/default-props-match-prop-types": "off",
  },
};
