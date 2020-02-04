export default {
   strength: ['Athletics'],
   dexterity: ['Acrobatics', 'Sleight of Hand', 'Stealth'],
   constitution: [],
   intelligence: ['Arcana', 'History', 'Investigation', 'Nature', 'Religion'],
   wisdom: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'],
   charisma: ['Deception', 'Intimidation', 'Performance', 'Persuasion'],
};

export const skillArray = [
   { type: 'str', label: 'Athletics', isLastOfType: true },
   { type: 'dex', label: 'Acrobatics' },
   { type: 'dex', label: 'Sleight of Hand' },
   { type: 'dex', label: 'Stealth', isLastOfType: true },
   { type: 'int', label: 'Arcana' },
   { type: 'int', label: 'History' },
   { type: 'int', label: 'Investigation' },
   { type: 'int', label: 'Nature' },
   { type: 'int', label: 'Religion', isLastOfType: true },
   { type: 'wis', label: 'Animal Handling' },
   { type: 'wis', label: 'Insight' },
   { type: 'wis', label: 'Medicine' },
   { type: 'wis', label: 'Survival', isLastOfType: true },
   { type: 'cha', label: 'Deception' },
   { type: 'cha', label: 'Intimidation' },
   { type: 'cha', label: 'Perception' },
   { type: 'cha', label: 'Performance' },
   { type: 'cha', label: 'Persuasion' },
];
