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
      this.title = '';
      this.nickname = '';
      this.size = '';
      this.species = '';
      this.race = '';
      this.alignment = '';
      this.ac = 10;
      this.initiative = '';
      this.cr = '';
      this.hp = 0;
      this.maxHp = 0;
      this.tempHp = 0;
      this.walk = 0;
      this.climb = 0;
      this.swim = 0;
      this.fly = 0;
      this.abilityScores = {
         str: 10,
         dex: 10,
         con: 10,
         int: 10,
         wis: 10,
         cha: 10,
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
