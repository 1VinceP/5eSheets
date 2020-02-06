<script>
import { mapState, mapMutations } from 'vuex';
import SpellsView from './SpellsView.vue';
import PsionicsView from './PsionicsView.vue';

export default {
   computed: {
      ...mapState('character', ['magicDisplay']),
   },

   methods: {
      ...mapMutations('character', ['editProp']),

      editView(view) {
         this.editProp({ prop: 'magicDisplay', value: view });
      },
   },

   components: { SpellsView, PsionicsView },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="global-page">
      <section class="tabs">
         <div
            :class="['tab', { active: magicDisplay === 'spells' }]"
            @click="editView('spells')"
         >
            Spells
         </div>
         <div
            :class="['tab', { active: magicDisplay === 'psionics' }]"
            @click="editView('psionics')"
         >
            Psionics
         </div>
      </section>

      <SpellsView v-if="magicDisplay === 'spells'" :character="character" />
      <PsionicsView v-else-if="magicDisplay === 'psionics'" :character="character" />
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.tabs {
   height: 30px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   margin-top: 10px;
   border-bottom: 1px solid $grey;
   & .tab {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px 3px 0px 0px;
      &.active { background: #fff2; }
   }
}
</style>
