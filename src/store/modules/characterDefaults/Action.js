import shortId from '@/utils/generateId';

export default class Action {
   constructor() {
      this.title = '';
      this.content = '';
      this.damage = '';
      this.damageType = '';
      this.ammo = 0;
      this.inherentBonus = 0;
      this.range = '';
      this.properties = [];
      this.proficient = false;
      this.id = shortId();
   }
}
