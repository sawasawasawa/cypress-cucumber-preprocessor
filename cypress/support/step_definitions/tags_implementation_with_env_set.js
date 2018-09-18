/* global given, then */

const { proceedCurrentStep } = require("cypress-cucumber-preprocessor/tagsHelper"); // eslint-disable-line
// import/no-extraneous-dependencies

let isPresentInTagsEnv;

given(/'(.+)' is in current TAGS environmental variable/, envTagsString => {
  const cypressEnvTags = Cypress.env("TAGS");
  isPresentInTagsEnv = RegExp(envTagsString).test(cypressEnvTags);
});

then(/this should (not )?run/, shouldNotRun => {
  expect(!shouldNotRun).to.equal(isPresentInTagsEnv); // eslint-disable-line no-unused-expressions
});
