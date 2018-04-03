/* eslint-disable global-require */
const fs = require("fs");
const { Parser } = require("gherkin");
const { createTestsFromFeature } = require("./createTestsFromFeature");
const { when, then, given } = require("./resolveStepDefinition");

window.when = when;
window.then = then;
window.given = given;

const readAndParseFeatureFile = featureFilePath => {
  const spec = fs.readFileSync(featureFilePath);
  return new Parser().parse(spec.toString());
};

describe("Background section", () => {
  require("./cypress/support/step_definitions/backgroundSection");

  createTestsFromFeature(
    readAndParseFeatureFile("./cypress/integration/BackgroundSection.feature")
  );
});
