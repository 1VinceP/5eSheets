import shortId from '@/utils/generateId';

export default class OtherAction {
   constructor(actionTime) {
      this.title = '';
      this.content = '';
      this.id = shortId();
      this.type = 'other';
      this.actionTime = actionTime;
   }
}
