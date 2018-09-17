const { TagExpressionParser } = require("cucumber-tag-expressions");

function getEnvTags() {
  return Cypress.env("TAGS") || "";
}

function proceedCurrentStep(tags = []) {
  if (tags.length) {
    const envTags = getEnvTags();
    const parser = new TagExpressionParser();
    try {
      const expressionNode = parser.parse(envTags);
      const mappedTags = tags.map(tag => tag.name);
      return expressionNode.evaluate(mappedTags);
    } catch (e) {
      console.log("Error parsing tags: ", e.message);
    }
  }
  return false;
}

module.exports = {
  proceedCurrentStep,
  getEnvTags
};
