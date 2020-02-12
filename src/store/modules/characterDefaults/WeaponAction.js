import shortId from '@/utils/generateId';

export default class Action {
   constructor(actionTime) {
      this.title = '';
      this.content = '';
      this.damage = '';
      this.damageType = '';
      this.inherentBonus = 0;
      this.range = '';
      this.properties = [];
      this.proficient = false;
      this.id = shortId();
      this.type = 'weapon';
      this.actionTime = actionTime;
   }
}
