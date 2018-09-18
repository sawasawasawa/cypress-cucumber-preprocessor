const { createTestFromScenario } = require("./createTestFromScenario");
const { proceedCurrentStep, getEnvTags } = require("./tagsHelper");

const createTestsFromFeature = parsedFeature => {
  const featureTags = parsedFeature.feature.tags;
  const hasEnvTags = !!getEnvTags();
  const hasFeatureTags = featureTags && featureTags.length > 0;

  let featureShouldRun = true;
  if (hasEnvTags) {
    if (hasFeatureTags) {
      featureShouldRun = proceedCurrentStep(featureTags);
    } else {
      featureShouldRun = false;
    }
  }

  const scenariosHaveTags = parsedFeature.feature.children.some(
    section =>
      section.tags && section.tags.length && proceedCurrentStep(section.tags)
  );

  describe(parsedFeature.feature.name, () => {
    if (featureShouldRun || scenariosHaveTags) {
      const backgroundSection = parsedFeature.feature.children.find(
        section => section.type === "Background"
      );
      const otherSections = parsedFeature.feature.children.filter(
        section => section.type !== "Background"
      );
      otherSections.forEach(section => {
        const scenarioHasTags = section.tags.length > 0
        const shouldRun =
          hasEnvTags && scenarioHasTags
            ? proceedCurrentStep(section.tags.concat(featureTags)) // concat handles inheritance of tags from feature
            : featureShouldRun;
        if (shouldRun) {
          createTestFromScenario(section, backgroundSection);
        }
      });
    }
  });
};

module.exports = {
  createTestsFromFeature
};
