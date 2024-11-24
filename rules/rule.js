const { ESLintUtils } = require('@typescript-eslint/utils');

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

module.exports = {
  createRule,
};
