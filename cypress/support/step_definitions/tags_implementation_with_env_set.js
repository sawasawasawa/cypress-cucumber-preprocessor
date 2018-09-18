/* global given, then */

const { proceedCurrentStep } = require("cypress-cucumber-preprocessor/tagsHelper"); // eslint-disable-line
// import/no-extraneous-dependencies

let isPresentInTagsEnv;
const cypressEnvTags = Cypress.env("TAGS");

given(/'(.+)' is in current TAGS environmental variable/, envTagsString => {
  isPresentInTagsEnv = RegExp(envTagsString).test(cypressEnvTags);
});

then(/this should (not )?run/, shouldNotRun => {
  if (typeof cypressEnvTags !== "undefined") {
    expect(!shouldNotRun).to.equal(isPresentInTagsEnv);
  }
});
