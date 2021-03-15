export default [
   {
      name: 'Artificer',
      subclasses: [
         'Alchemist',
         'Armorer',
         'Artillerist',
         'Battle Smith',
      ],
      subclassLevel: 3,
      hitDie: '8',
      features: {},
   },
   {
      name: 'Barbarian',
      subclasses: [
         'Ancestral Guardian',
         'Battlerager',
         'Beast',
         'Berserker',
         'Storm Herald',
         'Totem Warrior',
         'Wild Magic',
         'Zealot',
      ],
      subclassLevel: 3,
      hitDie: '12',
      features: {},
   },
   {
      name: 'Bard',
      subclasses: [
         'College of Creation',
         'College of Eloquence',
         'College of Glamor',
         'College of Lore',
         'College of Swords',
         'College of Valor',
         'College of Whispers',
      ],
      subclassLevel: 3,
      hitDie: '8',
      features: {},
   },
   {
      name: 'Cleric',
      subclasses: [
         'Arcana Domain',
         'Death Domain',
         'Forge Domain',
         'Grave Domain',
         'Knowledge Domain',
         'Life Domain',
         'Light Domain',
         'Nature Domain',
         'Order Domain',
         'Peace Domain',
         'Tempest Domain',
         'Trickery Domain',
         'Twilight Domain',
         'War Domain',
      ],
      subclassLevel: 1,
      hitDie: '8',
      features: {},
   },
   {
      name: 'Druid',
      subclasses: [
         'Circle of Dreams',
         'Circle of Land',
         'Circle of Moon',
         'Circle of the Shepherd',
         'Circle of Spores',
         'Circle of Stars',
         'Circle of Wildfire',
      ],
      subclassLevel: 2,
      hitDie: '8',
      features: {},
   },
   {
      name: 'Fighter',
      subclasses: [
         'Arcane Archer',
         'Battle Master',
         'Cavalier',
         'Echo Knight',
         'Eldritch Knight',
         'Psi Warrior',
         'Rune Knight',
         'Samurai',
      ],
      subclassLevel: 3,
      hitDie: '10',
      features: {},
   },
   {
      name: 'Monk',
      subclasses: [
         'Astral Self',
         'Drunken Master',
         'Four Elements',
         'Kensei',
         'Long Death',
         'Mercy',
         'Open Hand',
         'Shadow',
         'Sun Soul',
      ],
      subclassLevel: 3,
      hitDie: '8',
      features: {
         kiPoints: {
            label: 'Ki Points',
            hasCounter: true,
            hasInput: false,
            points: 0,
            maxPoints: 0,
            details: '',
         },
      },
   },
   {
      name: 'Mystic',
      subclasses: [
         'Order of the Avatar',
         'Order of the Awakened',
         'Order of the Immortal',
         'Order of the Nomad',
         'Order of the Soul Knife',
         'Order of the Wu Jen',
      ],
      subclassLevel: 3,
      hitDie: '8',
      features: {},
   },
   {
      name: 'Paladin',
      subclasses: [
         'Oathbreaker',
         'Oath of the Ancients',
         'Oath of Conquest',
         'Oath of the Crown',
         'Oath of Devotion',
         'Oath of Glory',
         'Oath of Redemption',
         'Oath of Vengeance',
         'Oath of the Watchers',
      ],
      subclassLevel: 3,
      hitDie: '10',
      features: {},
   },
   {
      name: 'Ranger',
      subclasses: [
         'Beast Master Conclave',
         'Fey Wanderer Conclave',
         'Gloom Stalker Conclave',
         'Horizon Walker Conclave',
         'Hunter Conclave',
         'Monster Slayer Conclave',
         'Swarmkeeper Conclave',
      ],
      subclassLevel: 3,
      hitDie: '10',
      features: {},
   },
   {
      name: 'Rogue',
      subclasses: [
         'Arcane Trickster',
         'Assassin',
         'Inquisitive',
         'Mastermind',
         'Phantom',
         'Scout',
         'Swashbuckler',
         'Thief',
      ],
      subclassLevel: 3,
      hitDie: '8',
      features: {},
   },
   {
      name: 'Sorcerer',
      subclasses: [
         'Aberrant Mind Origin',
         'Clockwork Soul Origin',
         'Divine Soul Origin',
         'Draconic Origin',
         'Shadow Origin',
         'Storm Origin',
         'Wild Origin',
      ],
      subclassLevel: 1,
      hitDie: '6',
      features: {},
   },
   {
      name: 'Warlock',
      subclasses: [
         'Pact of the Archfey',
         'Pact of the Celestial',
         'Pact of the Fathomless',
         'Pact of the Fiend',
         'Pact of the Genie',
         'Pact of the Great Old One',
         'Pact of the Hexblade',
         'Pact of the Undying',
      ],
      subclassLevel: 1,
      hitDie: '8',
      features: {},
   },
   {
      name: 'Wizard',
      subclasses: [
         'Abjuration',
         'Bladesinging',
         'Chronugry',
         'Conjuration',
         'Divination',
         'Enchantment',
         'Evocation',
         'Graviturgy',
         'Illusion',
         'Necromancy',
         'Scribes',
         'Transmutation',
         'War',
      ],
      subclassLevel: 2,
      hitDie: '6',
      features: {},
   },
];
