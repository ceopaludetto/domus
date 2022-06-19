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
    "react/default-props-match-prop-types": "off",
  },
};
