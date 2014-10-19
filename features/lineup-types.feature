Feature: Lineup types
  In order to create lineups that match vendor formats
  As a user
  I need to use lineup types

  Scenario: Lineup types should be made up of position slots
    Given a vendor named "DraftKings"
    And the following positions:
      | name          | abbreviation |
      | Quarterback   | QB           |
      | Running Back  | RB           |
      | Wide Receiver | WR           |
      | Tight End     | TE           |
    And a lineup type "DraftKings Standard" with the following position slots:
      | position | number |
      | QB       | 1      |
      | RB       | 2      |
      | WR       | 3      |
      | TE       | 1      |
    Then there should be 1 lineup type named "DraftKings Standard"
    And the lineup type "DraftKings Standard" should have 7 lineup slots
