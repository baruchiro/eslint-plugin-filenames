const path = require("path");
const { RuleTester } = require("@typescript-eslint/rule-tester");
const parser = require("@typescript-eslint/parser");
const mocha = require("mocha");

RuleTester.afterAll = mocha.after;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      project: path.resolve(__dirname, "./tsconfig.json"),
      tsconfigRootDir: __dirname,
    },
  },
});

module.exports = {
  /**
   * @type {RuleTester['run']}
   */
  run: (...args) => ruleTester.run(...args),
};
