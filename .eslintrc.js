module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "installedESLint": true,
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
     "extends": [
       "eslint:recommended",
       "plugin:react/recommended"
     ],
    "rules": {
      
        "linebreak-style": [
            "error",
            "unix"
        ],

        "semi": [
            "error",
            "never"
        ],
        "no-unused-vars": [
          "error", { "vars": "all", "args": "none" }
        ],
    }
};
