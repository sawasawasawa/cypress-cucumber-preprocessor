/* global given, then */

const {
  proceedCurrentStep
} = require("cypress-cucumber-preprocessor/tagsHelper"); // eslint-disable-line import/no-extraneous-dependencies

let parsedTags;

given(/my cypress environment variable TAGS is '(.+)'/, envTagsString => {
  parsedTags = envTagsString;
});

then(/the cypress runner should not break/, () => {
  // eslint-disable-next-line no-unused-expressions
  expect(proceedCurrentStep([{ name: "TESTTAG" }], parsedTags)).to.not.throw;
});

then(
  /tests tagged '(.+)' should (not )?proceed/,
  (tags, shouldProceed = false) => {
    const tagsArray = tags.split(" ").map(tag => ({ name: tag }));
    expect(proceedCurrentStep(tagsArray, parsedTags)).to.equal(!shouldProceed);
  }
);
