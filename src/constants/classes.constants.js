const asi = (name, level) => ({
   title: 'Ability Score Improvement',
   content: 'When you reach 4th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can\'t increase an ability score above 20 using this feature.\n\nIf your DM allows the use of feats, you may instead take a feat.',
   type: 'entry',
   id: `${name.toLowerCase()}L${level}asi`,
   fromClass: true,
   origin: `${name} ${level}`,
});

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
      features: {
         1: [
            {
               title: 'Expertise',
               content: `At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.\n\nAt 6th level, you can choose two more of your proficiencies (in skills or with thieves' tools) to gain this benefit.`,
               type: 'entry',
               id: 'rogueL2e',
               fromClass: true,
               origin: 'Rogue 1',
            },
            {
               title: 'Sneak Attack',
               content: `Beginning at 1st level, you know how to strike subtly and exploit a foe's distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.\n\nYou don't need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn't incapacitated, and you don't have disadvantage on the attack roll.\n\nThe amount of the extra damage increases as you gain levels in this class, as shown in the Sneak Attack column of the Rogue table.\n
               Level | Sneak Attack
               1 | 1d6
               2 | 1d6
               3 | 2d6
               4 | 2d6
               5 | 3d6
               6 | 3d6
               7 | 4d6
               8 | 4d6
               9 | 5d6
               10 | 5d6
               11 | 6d6
               12 | 6d6
               13 | 7d6
               14 | 7d6
               15 | 8d6
               16 | 8d6
               17 | 9d6
               18 | 9d6
               19 | 10d6
               20 | 10d6`,
               type: 'entry',
               id: 'rogueL1sa',
               fromClass: true,
               origin: 'Rogue 1',
            },
            {
               title: 'Thieves\' Cant',
               content: `During your rogue training you learned thieves' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows thieves' cant understands such messages. It takes four times longer to convey such a message than it does to speak the same idea plainly.\n\nIn addition, you understand a set of secret signs and symbols used to convey short, simple messages, such as whether an area is dangerous or the territory of a thieves' guild, whether loot is nearby, or whether the people in an area are easy marks or will provide a safe house for thieves on the run.`,
               type: 'entry',
               id: 'rogueL1tc',
               fromClass: true,
               origin: 'Rogue 1',
            },
         ],
         2: [
            {
               title: 'Cunning Action',
               content: 'Starting at 2nd level, your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.',
               type: 'entry',
               id: 'rogueL2ca',
               fromClass: true,
               origin: 'Rogue 2',
            },
         ],
         3: [
            {
               title: 'Steady Aim',
               content: 'As a bonus action, you give yourself advantage on your next attack roll on the current turn. You can use this bonus action only if you haven\'t moved during this turn, and after you use the bonus action, your speed is 0 until the end of the current turn.',
               type: 'entry',
               id: 'rogueL3sa',
               fromClass: true,
               origin: 'Rogue 3',
            },
            {
               title: 'Roguish Archetype',
               content: 'At 3rd level, you choose an archetype that you emulate in the exercise of your rogue abilities from the list of available archetypes. Your archetype choice grants you features at 3rd level and then again at 9th, 13th, and 17th level.',
               type: 'entry',
               id: 'rogueL3ra',
               fromClass: true,
               origin: 'Rogue 3',
            },
         ],
         4: [asi('Rogue', 4)],
         5: [{
            title: 'Uncanny Dodge',
            content: 'Starting at 5th level, when an attacker that you can see hits you with an attack, you can use your reaction to halve the attack\'s damage against you.',
            type: 'entry',
            id: 'rogueL5ud',
            fromClass: true,
            origin: 'Rogue 5'
         }],
         6: [{
            title: 'Expertise',
            content: 'At 6th level, you can choose two more of your proficiencies (in skills or with thieves\' tools) to gain the benefit of Expertise.',
            type: 'entry',
            id: 'rogueL6e',
            fromClass: true,
            origin: 'Rogue 6',
         }],
         7: [{
            title: 'Evasion',
            content: 'Beginning at 7th level, you can nimbly dodge out of the way of certain area effects, such as a red dragon\'s fiery breath or an ice storm spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.',
            type: 'entry',
            id: 'rogueL7e',
            fromClass: true,
            origin: 'Rogue 7',
         }],
         8: [asi('Rogue', 8)],
         9: [],
         10: [asi('Rogue', 10)],
         11: [{
            title: 'Reliable Talent',
            content: 'By 11th level, you have refined your chosen skills until they approach perfection. Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.',
            type: 'entry',
            id: 'rogueL11rt',
            fromClass: true,
            origin: 'Rogue 11'
         }],
         12: [asi('Rogue', 12)],
         13: [],
         14: [{
            title: 'Blindsense',
            content: 'Starting at 14th level, if you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.',
            type: 'entry',
            id: 'rogueL14b',
            fromClass: true,
            origin: 'Rogue 14',
         }],
         15: [{
            title: 'Slippery Mind',
            content: 'By 15th level, you have acquired greater mental strength. You gain proficiency in Wisdom saving throws.',
            type: 'entry',
            id: 'rogueL15sm',
            fromClass: true,
            origin: 'Rogue 15',
         }],
         16: [asi('Rogue', 16)],
         17: [],
         18: [{
            title: 'Elusive',
            content: 'Beginning at 18th level, you are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren\'t incapacitated.',
            type: 'entry',
            id: 'rogueL18e',
            fromClass: true,
            origin: 'Rogue 18',
         }],
         19: [asi('Rogue', 19)],
         20: [{
            title: 'Stroke of Luck',
            content: 'At 20th level, you have an uncanny knack for succeeding when you need to. If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20.\n\nOnce you use this feature, you can\'t use it again until you finish a short or long rest.',
            type: 'entry',
            id: 'rogueL20sol',
            fromClass: true,
            origin: 'Rogue 20',
         }],
      },
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
