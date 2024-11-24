const rule = require('./enforce-prop-decorator-enum');
const { run } = require('./tests');

run('enforce-prop-decorator-enum', rule, {
  valid: [
    {
      code: `
        enum OrganizationActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop({ type: String, enum: OrganizationActionEnum })
          organization?: OrganizationActionEnum;
        }
      `,
    },
    {
      code: `
        enum OrganizationActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop({ type: [String], enum: OrganizationActionEnum })
          organization?: OrganizationActionEnum[];
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        enum OrganizationActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop({ enum: OrganizationActionEnum })
          organization?: OrganizationActionEnum;
        }
      `,
      errors: [
        {
          messageId: 'missingType',
          data: { propertyName: 'organization' },
        },
      ],
    },
    {
      code: `
        enum OrganizationActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop({ type: [String], enum: [OrganizationActionEnum] })
          organization?: OrganizationActionEnum[];
        }
      `,
      errors: [
        {
          messageId: 'incorrectEnum',
          data: {
            expectedEnum: 'OrganizationActionEnum',
            propertyName: 'organization',
          },
        },
      ],
    },
    {
      code: `
        enum OrganizationActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop({ type: [String] })
          organization?: OrganizationActionEnum[];
        }
      `,
      errors: [
        {
          messageId: 'missingEnum',
          data: {
            propertyName: 'organization',
          },
        },
      ],
    },
    {
      code: `
        enum OrganizationActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop({ type: String, enum: OrganizationActionEnum })
          organization?: OrganizationActionEnum[];
        }
      `,
      errors: [
        {
          messageId: 'incorrectType',
          data: {
            expectedType: '[String]',
            propertyName: 'organization',
          },
        },
      ],
    },
    {
      code: `
        enum ActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop({ type: [String], enum: ActionEnum })
          organization?: ActionEnum;
        }
      `,
      errors: [
        {
          messageId: 'incorrectType',
          data: {
            expectedType: 'String',
            propertyName: 'organization',
          },
        },
      ],
    },
    {
      code: `
        enum ActionEnum {
          ACTION_ONE,
          ACTION_TWO,
        }
        class Permissions {
          @Prop()
          organization?: ActionEnum;
        }
      `,
      errors: [
        {
          messageId: 'missingType',
          data: { propertyName: 'organization' },
        },
        {
          messageId: 'missingEnum',
          data: { propertyName: 'organization' },
        },
      ],
    },
  ],
});
