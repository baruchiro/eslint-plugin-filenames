const path = require('path');

const constsFileNames = ['.const.ts', '.consts.ts', '.constants.ts'];

const notAllowedStylesFileNames = [
  'styles.ts',
  'styles.tsx',
  'style.ts',
  'style.tsx',
];

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Unified rule for enforcing specific naming conventions for various file types',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      noActionFilename:
        'This name shows a `redux` icon using atom material icons due to convention with ...`Action`.',
      constsFilename: 'No need for prefix of the component name imo',
      typesFilename:
        'To save time, you don’t need to name the file like this, just types.ts',
      stylesFilename:
        'file name is not styles.ts. by convention Componentname.styles.ts.',
    },
    schema: [], // no options
  },
  create(context) {
    const filename = context.getFilename();
    const basename = path.basename(filename);

    if (filename.endsWith('Action.tsx')) {
      context.report({
        messageId: 'noActionFilename',
        loc: { line: 1, column: 0 },
      });
    }

    if (constsFileNames.some((name) => basename.endsWith(name))) {
      context.report({
        messageId: 'constsFilename',
        loc: { line: 1, column: 0 },
      });
    }

    if (basename.endsWith('.types.ts')) {
      context.report({
        messageId: 'typesFilename',
        loc: { line: 1, column: 0 },
      });
    }

    if (
      notAllowedStylesFileNames.some((name) => basename.toLowerCase() === name)
    ) {
      context.report({
        messageId: 'stylesFilename',
        loc: { line: 1, column: 0 },
      });
    }

    if (basename.endsWith('.styles.ts') && !basename.match(/^[A-Z]/)) {
      context.report({
        messageId: 'stylesFilename',
        loc: { line: 1, column: 0 },
      });
    }

    return {};
  },
};
