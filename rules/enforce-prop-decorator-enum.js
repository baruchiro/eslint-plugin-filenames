const { ESLintUtils } = require("@typescript-eslint/utils");
const { createRule } = require("./rule");

module.exports = createRule({
  name: "enforce-prop-decorator-enum",
  meta: {
    type: "problem",
    docs: {
      description:
        'Ensure @Prop decorator uses correct type and enum for enum properties, and always specify "type"',
      category: "Best Practices",
      recommended: false,
    },
    messages: {
      missingType:
        '@Prop decorator is missing "type" for property "{{propertyName}}"',
      incorrectType:
        '@Prop "type" should be {{expectedType}} for property "{{propertyName}}"',
      missingEnum:
        '@Prop decorator is missing "enum" for property "{{propertyName}}"',
      incorrectEnum:
        '@Prop "enum" should be {{expectedEnum}} for property "{{propertyName}}"',
    },
    schema: [],
  },
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    if (!services || !services.program || !services.esTreeNodeToTSNodeMap) {
      return {};
    }
    const checker = services.program.getTypeChecker();

    return {
      ClassProperty(node) {
        if (!node.decorators) return;

        const propDecorator = node.decorators.find(
          (decorator) =>
            decorator.expression.type === "CallExpression" &&
            decorator.expression.callee.name === "Prop"
        );

        if (!propDecorator) return;

        const tsNode = services.esTreeNodeToTSNodeMap.get(node);
        const type = checker.getTypeAtLocation(tsNode);
        const propertyName = node.key.name;

        const isEnumType = (type) => {
          const symbol = type.getSymbol();
          return (
            symbol &&
            (symbol.flags & ts.SymbolFlags.Enum ||
              symbol.flags & ts.SymbolFlags.EnumLiteral)
          );
        };

        const isArrayType = (type) => {
          return checker.isArrayType(type);
        };

        let isEnum = false;
        let isEnumArray = false;
        let enumTypeName = null;

        if (isEnumType(type)) {
          isEnum = true;
          enumTypeName = type.symbol.name;
        } else if (isArrayType(type)) {
          const [elementType] = checker.getTypeArguments(type);
          if (elementType && isEnumType(elementType)) {
            isEnumArray = true;
            enumTypeName = elementType.symbol.name;
          }
        }

        if (isEnum || isEnumArray) {
          const expectedType = isEnum ? "String" : "[String]";
          const propOptionsArg = propDecorator.expression.arguments[0];

          if (!propOptionsArg || propOptionsArg.type !== "ObjectExpression") {
            context.report({
              node: propOptionsArg || propDecorator,
              messageId: "missingType",
              data: { propertyName },
            });
            context.report({
              node: propOptionsArg || propDecorator,
              messageId: "missingEnum",
              data: { propertyName },
            });
            return;
          }

          const properties = propOptionsArg.properties;
          const typeProp = properties.find((p) => p.key.name === "type");
          const enumProp = properties.find((p) => p.key.name === "enum");

          if (!typeProp) {
            context.report({
              node: propOptionsArg,
              messageId: "missingType",
              data: { propertyName },
            });
          } else {
            let typeValid = false;
            if (isEnum) {
              if (
                typeProp.value.type === "Identifier" &&
                typeProp.value.name === "String"
              ) {
                typeValid = true;
              }
            } else if (isEnumArray) {
              if (
                typeProp.value.type === "ArrayExpression" &&
                typeProp.value.elements.length === 1 &&
                typeProp.value.elements[0].type === "Identifier" &&
                typeProp.value.elements[0].name === "String"
              ) {
                typeValid = true;
              }
            }
            if (!typeValid) {
              context.report({
                node: typeProp.value,
                messageId: "incorrectType",
                data: { expectedType, propertyName },
              });
            }
          }

          if (!enumProp) {
            context.report({
              node: propOptionsArg,
              messageId: "missingEnum",
              data: { propertyName },
            });
          } else {
            let enumValid = false;
            if (
              enumProp.value.type === "Identifier" &&
              enumProp.value.name === enumTypeName
            ) {
              enumValid = true;
            }

            if (!enumValid) {
              context.report({
                node: enumProp.value,
                messageId: "incorrectEnum",
                data: { expectedEnum: enumTypeName, propertyName },
              });
            }
          }
        }
      },
    };
  },
});
