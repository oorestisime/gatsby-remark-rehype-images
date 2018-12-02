module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    'jsx-a11y/anchor-has-content': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-cycle': 'off',
    'react/no-typos': 'off',
    'no-return-await': 'off',
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ] } ],
    "react/jsx-tag-spacing": ["error", {"beforeClosing": "never"}],
    "padding-line-between-statements": ["error", {
        "blankLine": "always", "prev": "*", "next": "return"
    }],
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
  ],
  "env": {
    "browser": true,
    "jest": true,
  },
};
