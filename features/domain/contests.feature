Feature: Contests
  In order to
  As a user
  I need contests

  Scenario: Contests should have a duration
    Given an annual contest named "Extraordinary Gentlemen"
    And a daily contest named "Millionaire Maker"
    Then there should be one annual contest
    And one daily contest
