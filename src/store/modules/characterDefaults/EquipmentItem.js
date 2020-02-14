import shortId from '@/utils/generateId';

export default class EquipmentItem {
   constructor() {
      this.title = '';
      this.details = '';
      this.weight = 0;
      this.value = 0;
      this.quantity = 0;
      this.valueType = '';
      this.location = '';
      this.id = shortId();
   }
}
