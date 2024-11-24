const rule = require('./unified-filename-rules');
const { run } = require('./tests');

run('unified-filename-rules', rule, {
  valid: [
    {
      filename: 'types.ts',
      code: 'type MyType = {};',
    },
    {
      filename: 'some-other-file.ts',
      code: 'type MyType = {};',
    },
    {
      code: '',
      filename: 'SomeComponent.tsx',
    },
    {
      filename: 'consts.ts',
      code: 'const myConst = 1;',
    },
    {
      filename: 'constants.ts',
      code: 'const myConst = 1;',
    },
    {
      filename: 'const.ts',
      code: 'const myConst = 1;',
    },
    {
      filename: 'UserInfoDialog.styles.ts',
      code: 'const myConst = 1;',
    },
  ],
  invalid: [
    {
      filename: 'PermissionWithColor.types.ts',
      code: 'type MyType = {};',
      errors: [
        {
          message:
            'To save time, you don’t need to name the file like this, just types.ts',
        },
      ],
    },
    {
      filename: 'AnotherExample.types.ts',
      code: 'type AnotherType = {};',
      errors: [
        {
          message:
            'To save time, you don’t need to name the file like this, just types.ts',
        },
      ],
    },
    {
      code: '',
      filename: 'SomeAction.tsx',
      errors: [{ messageId: 'noActionFilename' }],
    },
    {
      filename: 'ComponentName.consts.ts',
      code: 'const myConst = 1;',
      errors: [{ messageId: 'constsFilename' }],
    },
    {
      filename: 'ComponentName.constants.ts',
      code: 'const myConst = 1;',
      errors: [{ messageId: 'constsFilename' }],
    },
    {
      filename: 'communities-permissions.const.ts',
      code: 'const myConst = 1;',
      errors: [{ messageId: 'constsFilename' }],
    },
    {
      filename: 'style.ts',
      code: 'const myConst = 1;',
      errors: [{ messageId: 'stylesFilename' }],
    },
    {
      filename: 'styles.ts',
      code: 'const myConst = 1;',
      errors: [{ messageId: 'stylesFilename' }],
    },
    {
      filename: 'styles.tsx',
      code: 'const myConst = 1;',
      errors: [{ messageId: 'stylesFilename' }],
    },
    {
      filename: 'component.styles.ts',
      code: 'const myConst = 1;',
      errors: [{ messageId: 'stylesFilename' }],
    },
  ],
});
