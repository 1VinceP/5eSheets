import shortId from '@/utils/generateId';

export default class Spell {
   constructor() {
      this.title = '';
      this.content = '';
      this.duration = '';
      this.level = '';
      this.range = '';
      this.time = '';
      this.materialComponents = '';
      this.material = false;
      this.somatic = false;
      this.verbal = false;
      this.prepared = false;
      this.permanentlyPrepared = false;
      this.ritual = false;
      this.conc = false;
      this.id = shortId();
   }
}
