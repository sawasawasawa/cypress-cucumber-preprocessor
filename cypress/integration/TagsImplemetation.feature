Feature: Tags Implementation

  As a cucumber cypress plugin which handles Tags
  I want to allow people to tag their scenarios with any tag
  And then they can use those tags as per https://docs.cucumber.io/cucumber/api/#tags

  Scenario: Pass no tags (see Background)
    Given my cypress environment variable TAGS is 'lots of random things'
    Then the cypress runner should not break

  Scenario: Pass a single tag
    Given my cypress environment variable TAGS is '@smoke-tests'
    Then only tests tagged '@smoke-tests' should proceed

  Scenario: Pass a tag to ignore
    Given my cypress environment variable TAGS is 'not @ignore'
    Then tests tagged '@ignore' should not proceed

  Scenario: Passing multiple tags
    Given my cypress environment variable TAGS is '@foo and @bar'
    Then only tests tagged '@foo @bar' should proceed
