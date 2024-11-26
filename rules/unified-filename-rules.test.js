const rule = require("./unified-filename-rules");
const { run, useFilename } = require("./tests");

run("unified-filename-rules", rule, {
  valid: [
    {
      ...useFilename("types.ts"),
      code: "type MyType = {};",
    },
    {
      ...useFilename("some-other-file.ts"),
      code: "type MyType = {};",
    },
    {
      code: "",
      ...useFilename("SomeComponent.tsx"),
    },
    {
      ...useFilename("consts.ts"),
      code: "const myConst = 1;",
    },
    {
      ...useFilename("constants.ts"),
      code: "const myConst = 1;",
    },
    {
      ...useFilename("const.ts"),
      code: "const myConst = 1;",
    },
    {
      ...useFilename("UserInfoDialog.styles.ts"),
      code: "const myConst = 1;",
    },
  ],
  invalid: [
    {
      ...useFilename("PermissionWithColor.types.ts"),
      code: "type MyType = {};",
      errors: [
        {
          message:
            "To save time, you don’t need to name the file like this, just types.ts",
        },
      ],
    },
    {
      ...useFilename("AnotherExample.types.ts"),
      code: "type AnotherType = {};",
      errors: [
        {
          message:
            "To save time, you don’t need to name the file like this, just types.ts",
        },
      ],
    },
    {
      code: "",
      ...useFilename("SomeAction.tsx"),
      errors: [{ messageId: "noActionFilename" }],
    },
    {
      ...useFilename("ComponentName.consts.ts"),
      code: "const myConst = 1;",
      errors: [{ messageId: "constsFilename" }],
    },
    {
      ...useFilename("ComponentName.constants.ts"),
      code: "const myConst = 1;",
      errors: [{ messageId: "constsFilename" }],
    },
    {
      ...useFilename("communities-permissions.const.ts"),
      code: "const myConst = 1;",
      errors: [{ messageId: "constsFilename" }],
    },
    {
      ...useFilename("style.ts"),
      code: "const myConst = 1;",
      errors: [{ messageId: "stylesFilename" }],
    },
    {
      ...useFilename("styles.ts"),
      code: "const myConst = 1;",
      errors: [{ messageId: "stylesFilename" }],
    },
    {
      ...useFilename("styles.tsx"),
      code: "const myConst = 1;",
      errors: [{ messageId: "stylesFilename" }],
    },
    {
      ...useFilename("component.styles.ts"),
      code: "const myConst = 1;",
      errors: [{ messageId: "stylesFilename" }],
    },
  ],
});
