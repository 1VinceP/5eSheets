*http://5eSheets.surge.sh* <!-- stable release -->
*http://5eSheets-alpha.surge.sh* <!-- alpha release -->

Notes
==============

### Known Issues
~~(High) UUID and vue-dev-tools conflicts occasionally cause id loss~~
   - ~~Potentially due to vue-dev-tools running the mutation/action twice~~
   - ~~Shouldn't be an issue in production~~
   - RESOLVED
(Medium) Magic Page is messy code
(Medium) undefined: 4
   - property appearing on all saved characters
(Low)
   - Refreshing a management page then routing back to characterForm loads a new character

## Alpha Goals
- [ ] (Char Sheet) Base Character Sheet functionality
  - [x] List characters
  - [ ] Create Characters
    - [x] Stats
      - [ ] Exhaustion
    - [ ] Actions
    - [ ] Features
    - [x] Magic
    - [ ] Friends
    - [ ] Gear
      - [ ] Add attunement abilities
    - [x] Journal
    - [x] Life
    - [x] Saving
    - [x] Deleting
  - [x] Importing/Exporting
- [ ] (Settings) Theme, handedness switcher; Data reset
  - [x] Handedness
  - [x] Themes
  - [ ] Clear character data
- [ ] (DM View) Base DM View functionality
  - [ ] List Campaigns
    - [ ] Delete Campaign
    - [ ] Save Campaign
    - [ ] Import/Export Campaign
    - [ ] List Characters
      - [ ] View Character
      - [ ] Delete Character
      - [ ] Import/Export Character
- [ ] (About) About page outline
  - [ ] FAQ
  - [ ] Helpful hints

## Beta Goals
- [ ] (Char Sheet) Spell sorting
- [ ] (Char Sheet) Auto class/race feature display
- [ ] (Content Manager) Base CM functionality
  - [ ] View content
    - [ ] Characters
    - [ ] Custom Classes & features
    - [ ] Custom Races & features
  - [ ] Edit Content
    - [ ] Delete
    - [ ] Save
  - [ ] Create Content
    - [ ] Classes & features
    - [ ] Races & features
  - [ ] Import/Export Content
    - [ ] Handle conflicting content

## Release Goals
- [ ] Long/short rest feature/gear/magic refreshing
