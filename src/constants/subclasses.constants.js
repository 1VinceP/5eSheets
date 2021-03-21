export default [
   {
      class: 'Rogue',
      name: 'Assassin',
      features: {
         3: [
            {
               title: 'Assassinate',
               content: 'Starting at 3rd level, you are at your deadliest when you get the drop on your enemies. You have advantage on attack rolls against any creature that hasn\'t taken a turn in the combat yet. In addition, any hit you score against a creature that is surprised is a critical hit.',
               type: 'entry',
               id: 'rogeassassinL3a',
               fromSubclass: true,
               origin: 'Rogue Assassin 3',
            },
            {
               title: 'Bonus Proficiencies',
               content: 'When you choose this archetype at 3rd level, you gain proficiency with the disguise kit and the poisoner\'s kit.',
               type: 'entry',
               id: 'rogueassassinL3bp',
               fromSubclass: true,
               origin: 'Rogue Assassin 3',
            },
         ],
         9: [{
            title: 'Infiltration Expertise',
            content: 'Starting at 9th level, you can unfailingly create false identities for yourself. You must spend seven days and 25 gp to establish the history, profession, and affiliations for an identity. You can\'t establish an identity that belongs to someone else. For example, you might acquire appropriate clothing, letters of introduction, and official-looking certification to establish yourself as a member of a trading house from a remote city so you can insinuate yourself into the company of other wealthy merchants.\n\nThereafter, if you adopt the new identity as a disguise, other creatures believe you to be that person until given an obvious reason not to.',
            type: 'entry',
            id: 'rogueassassinL9ie',
            fromSubclass: true,
            origin: 'Rogue Assassin 9',
         }],
         13: [{
            title: 'Imposter',
            content: 'At 13th level, you gain the ability to unerringly mimic another person\'s speech, writing, and behavior. You must spend at least three hours studying these three components of the person\'s behavior, listening to speech, examining handwriting, and observing mannerism.\n\nYour ruse is indiscernible to the casual observer. If a wary creature suspects something is amiss, you have advantage on any Charisma (Deception) check you make to avoid detection.',
            type: 'entry',
            id: 'rogueassassinL13i',
            fromSubclass: true,
            origin: 'Rogue Assassin 13',
         }],
         17: [{
            title: 'Death Strike',
            content: 'Starting at 17th level, you become a master of instant death. When you attack and hit a creature that is surprised, it must make a Constitution saving throw (DC 8 + your Dexterity modifier + your proficiency bonus). On a failed save, double the damage of your attack against the creature.',
            type: 'entry',
            id: 'rogueassassinL17ds',
            fromSubclass: true,
            origin: 'Rogue Assassin 13',
         }],
      },
   },
   {
      class: 'Rogue',
      name: 'Swashbuckler',
      features: {
         3: [
            {
               title: 'Fancy Footwork',
               content: 'When you choose this archetype at 3rd level, you learn how to land a strike and then slip away without reprisal. During your turn, if you make a melee attack against a creature, that creature can\'t make opportunity attacks against you for the rest of your turn.',
               type: 'entry',
               id: 'rogueswashbucklerL3ff',
               fromSubclass: true,
               origin: 'Rogue Swashbuckler 3'
            },
            {
               title: 'Rakish Audacity',
               content: 'Starting at 3rd level, your confidence propels you into battle. You can give yourself a bonus to your initiative rolls equal to your Charisma modifier.\n\nYou also gain an additional way to use your Sneak Attack; you don\'t need advantage on the attack roll to use your Sneak Attack against a creature if you are within 5 feet of it, no other creatures are within 5 feet of you, and you don\'t have disadvantage on the attack roll. All the other rules for Sneak Attack still apply to you.',
               type: 'entry',
               id: 'rogueswashbucklerL3ra',
               fromSubclass: true,
               origin: 'Rogue Swashbuckler 3',
            },
         ],
         9: [{
            title: 'Panache',
            content: 'At 9th level, your charm becomes extraordinarily beguiling. As an action, you can make a Charisma (Persuasion) check contested by a creature\'s Wisdom (Insight) check. The creature must be able to hear you, and the two of you must share a language.\n\nIf you succeed on the check and the creature is hostile to you, it has disadvantage on attack rolls against targets other than you and can\'t make opportunity attacks against targets other than you. This effect lasts for 1 minute, until one of your companions attacks the target or affects it with a spell, or until you and the target are more than 60 feet apart.\n\nIf you succeed on the check and the creature isn\'t hostile to you, it is charmed by you for 1 minute. While charmed, it regards you as a friendly acquaintance. This effect ends immediately if you or your companions do anything harmful to it.',
            type: 'entry',
            id: 'rogueswashbucklerL9p',
            fromSubclass: true,
            origin: 'Rogue Swashbuckler 9',
         }],
         13: [{
            title: 'Elegant Manuever',
            content: 'Starting at 13th level, you can use a bonus action on your turn to gain advantage on the next Dexterity (Acrobatics) or Strength (Athletics) check you make during the same turn.',
            type: 'entry',
            id: 'rogueswashbucklerL13em',
            fromSubclass: true,
            origin: 'Rogue Swashbuckler 13',
         }],
         17: [{
            title: 'Master Duelist',
            content: 'Beginning at 17th level, your mastery of the blade lets you turn failure into success in combat. If you miss with an attack roll, you can roll it again with advantage. Once you do so, you can\'t use this feature again until you finish a short or long rest.',
            type: 'entry',
            id: 'rogueswashbucklerL17md',
            fromSubclass: true,
            origin: 'Rogue Swashbuckler 17',
         }],
      },
   },
];
