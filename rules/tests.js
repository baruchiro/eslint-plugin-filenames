const path = require("path");
const fs = require("fs");
const { RuleTester } = require("@typescript-eslint/rule-tester");
// const parser = require("@typescript-eslint/parser");
const mocha = require("mocha");

RuleTester.afterAll = mocha.after;

const fixturesDir = path.join(__dirname, "fixtures");

/**
 * @type {RuleTester['run']}
 */
const run = (...args) => {
  const ruleTester = new RuleTester({
    languageOptions: {
      // parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: {
          allowDefaultProject: ["*.ts*", "*.js*"],
        },
        tsconfigRootDir: fixturesDir,
      },
    },
  });

  ruleTester.run(...args);
};


const useFilename = (filename) => {
  const filePath = path.join(fixturesDir, filename);

  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  return {
    filename: filePath,
    before: () => fs.writeFileSync(filePath, ""),
    after: () => () => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    },
  };
};

module.exports = {
  run,
  useFilename
};
