/* global given, then */

const { proceedCurrentStep } = require("cypress-cucumber-preprocessor/tagsHelper"); // eslint-disable-line
// import/no-extraneous-dependencies

let parsedTags;

given(/my cypress environment variable TAGS is '(.+)'/, envTagsString => {
  parsedTags = envTagsString;
});

then(/the cypress runner should not break/, () => {
  expect(proceedCurrentStep([{name: 'TESTTAG'}], parsedTags)).to.not.throw;
});

then(/only tests tagged '(.+)' should proceed/, (tags) => {
  const skippedTags = [{
    name: '@testTag123'
  }];
  const tagsArray = tags.split(" ").map(tag => ({name: tag}))
  expect(proceedCurrentStep(skippedTags, parsedTags)).to.equal(false);
  expect(proceedCurrentStep(tagsArray, parsedTags)).to.equal(true);
});
