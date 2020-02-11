import shortId from '@/utils/generateId';

export default class JournalEntry {
   constructor() {
      this.title = '';
      this.content = '';
      this.tags = [];
      this.date = new Date();
      this.id = shortId();
   }
}
