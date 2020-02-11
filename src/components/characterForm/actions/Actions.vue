<script>
import { mapGetters, mapMutations } from 'vuex';
import ActionsView from './ActionsView.vue';

export default {
   name: 'actions',

   data: () => ({
      view: 'actions',
   }),

   computed: {
      ...mapGetters(['night']),
   },

   methods: {
      ...mapMutations('character', ['addAction']),
   },

   components: { ActionsView },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="actions">
      <section class="tabs">
         <div
            :class="['tab', { active: view === 'actions', night }]"
            @click="view = 'actions'"
         >
            Actions
         </div>
         <div
            :class="['tab', { active: view === 'bonusActions', night }]"
            @click="view = 'bonusActions'"
         >
            Bonus Actions
         </div>
         <div
            :class="['tab', { active: view === 'reactions', night }]"
            @click="view = 'reactions'"
         >
            Reactions
         </div>
      </section>

      <ActionsView v-if="view === 'actions'" :character="character" :night="night" />

   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.actions {
   width: 100%;
   padding-top: 40px;

   & .tabs {
      height: 30px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid $grey;
      font-size: 14px;
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
