import shortId from '@/utils/generateId';

export default class Psionic {
   constructor() {
      this.title = '';
      this.content = '';
      this.order = '';
      this.focus = '';
      this.id = shortId();
   }
}
