/* global given, then */

const {
  shouldProceedCurrentStep
} = require("cypress-cucumber-preprocessor/lib/tagsHelper"); // eslint-disable-line

let parsedTags;

given(/my cypress environment variable TAGS is '(.+)'/, envTagsString => {
  parsedTags = envTagsString;
});

then(/the cypress runner should not break/, () => {
  const shouldNeverThrow = () => {
    shouldProceedCurrentStep([{ name: "@test-tag" }], parsedTags);
  };
  expect(shouldNeverThrow).to.not.throw();
});

then(
  /tests tagged '(.+)' should (not )?proceed/,
  (tags, shouldProceed = false) => {
    const tagsArray = tags.split(" ").map(tag => ({ name: tag }));
    expect(shouldProceedCurrentStep(tagsArray, parsedTags)).to.equal(
      !shouldProceed
    );
  }
);
