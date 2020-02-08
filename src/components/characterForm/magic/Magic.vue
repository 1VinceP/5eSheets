<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import SpellsView from './SpellsView.vue';
import PsionicsView from './PsionicsView.vue';

export default {
   computed: {
      ...mapState('character', ['magicDisplay']),
      ...mapGetters(['night']),
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
   <div class="magic">
      <section class="tabs">
         <div
            :class="['tab', { active: magicDisplay === 'spells', night }]"
            @click="editView('spells')"
         >
            Spells
         </div>
         <div
            :class="['tab', { active: magicDisplay === 'psionics', night }]"
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

.magic {
   width: 100%;

   & .tabs {
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
         &.active {
            background: #0002;
            &.night { background: #fff2; }
         }
      }
   }
}

</style>
