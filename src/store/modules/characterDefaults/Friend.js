import shortId from '@/utils/generateId';

export class FriendAbility {
   constructor(title = '') {
      this.title = title;
      this.content = '';
      this.id = shortId();
   }
}

export default class Companion {
   constructor() {
      this.title = 'Raven';
      this.nickname = 'Taffers';
      this.size = 'Small';
      this.race = 'Beast';
      this.subrace = '';
      this.alignment = 'Neutral';
      this.ac = 10;
      this.initiative = '';
      this.cr = '';
      this.hp = 144;
      this.maxHp = 186;
      this.tempHp = 0;
      this.walk = 0;
      this.climb = 0;
      this.swim = 0;
      this.fly = 0;
      this.abilityScores = {
         str: 0,
         dex: 0,
         con: 0,
         int: 0,
         wis: 0,
         cha: 0,
      };
      this.abilities = [
         new FriendAbility('Proficiencies'),
         new FriendAbility('Senses'),
         new FriendAbility('Languages'),
      ];
      this.notes = '';
      this.id = shortId();
   }
}
