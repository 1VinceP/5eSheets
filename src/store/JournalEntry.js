import uuid from 'uuid/v4';

export default class JournalEntry {
   constructor() {
      this.title = '';
      this.content = '';
      this.tags = [];
      this.date = new Date();
      this.id = uuid();
   }
}
