<script>
import { mapMutations } from 'vuex';
import PlusIcon from 'vue-material-design-icons/PlusCircleOutline.vue';
import Psionic from './Psionic.vue';

export default {
   name: 'psi-container',

   data: () => ({
      sortOn: 'title',
   }),

   computed: {
      sortedPsionics() {
         const { sortOn } = this;
         const newData = [...this.psionicData];
         return newData.sort((a, b) => {
            if (a[sortOn] < b[sortOn]) return -1;
            if (a[sortOn] > b[sortOn]) return 1;
            return 0;
         });
      },
   },

   methods: {
      ...mapMutations('character', ['addPsionic']),

      handleSort(value) {
         this.sortOn = value;
      },

      closeModal() {
         this.modalOpen = false;
         this.newName = '';
         this.newContent = '';
      },

      handleAddPsionic() {
         if (this.isTalent) {
            // this.addTalent({ title: this.newName, content: this.newContent });
            this.addPsionic('psiTalents');
         } else {
            this.addPsionic('psiDisciplines');
            // this.addDiscipline({ title: this.newName, content: this.newContent });
         }
      },
   },

   components: { PlusIcon, Psionic },

   props: {
      psionicData: Array,
      isTalent: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="psi-container">
      <section class="header">
         <div class="title">{{ isTalent ? 'Talents' : 'Disciplines' }}</div>
      </section>
      <Psionic isHeader :isTalent="isTalent" @sort="handleSort" :night="night" />
      <Psionic
         v-for="psionic in sortedPsionics"
         :key="psionic.id"
         :isTalent="isTalent"
         :psionic="psionic"
         :night="night"
      />

      <span class="add-psionic">
         <PlusIcon :size="18" @click="handleAddPsionic" />
      </span>
   </div>
</template>

<style lang="scss" scoped>
.psi-container {
   width: 100%;
   margin-bottom: 20px;

   & .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      & .title {
         width: 45%;
         font-size: 18px;
      }
   }

   & .add-psionic {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 6px;
      padding: 3px 6px;
   }
}
</style>
