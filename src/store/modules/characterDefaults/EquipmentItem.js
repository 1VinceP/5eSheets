import shortId from '@/utils/generateId';

export default class EquipmentItem {
   constructor() {
      this.title = '';
      this.weight = 0;
      this.quantity = 0;
      this.location = '';
      this.id = shortId();
   }
}
