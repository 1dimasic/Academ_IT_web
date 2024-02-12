module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs,vue}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "eqeqeq": ["error", "always"],
        "curly": "error",
        "quotes": ["error", "double"],
        "no-multiple-empty-lines": ["error", { "max": 1}],
        "comma-dangle": ["error", "never"],
        "semi": ["error", "always"]
    }
}
