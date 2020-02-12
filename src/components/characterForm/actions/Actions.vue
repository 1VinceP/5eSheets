<script>
import { mapGetters, mapMutations } from 'vuex';
import ActionsView from './ActionsView.vue';
import { Button } from '@/components/common';

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

   components: { ActionsView, Button },

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

      <ActionsView
         v-if="view === 'actions'"
         :actions="character.actions"
         :abilities="character.abilities"
         :night="night"
      />
      <ActionsView
         v-else-if="view === 'bonusActions'"
         :actions="character.bonusActions"
         :abilities="character.abilities"
         :night="night"
      />
      <ActionsView
         v-else
         :actions="character.reactions"
         :abilities="character.abilities"
         :night="night"
      />

      <div class="buttons">
         <Button
            primary
            sm
            @click="addAction({ actionTime: view, actionType: 'other' })"
         >
            Add Action
         </Button>
         <Button
            green
            sm
            @click="addAction({ actionTime: view, actionType: 'weapon' })"
            style="margin-left: 16px;"
         >
            Add Weapon
         </Button>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.actions {
   width: 100%;

   & .tabs {
      height: 30px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 20px;
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

   & .buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
   }
}
</style>
