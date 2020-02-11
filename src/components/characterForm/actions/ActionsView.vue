<script>
import { mapMutations } from 'vuex';
import Action from './Action.vue';
import { Button } from '@/components/common';

export default {
   name: 'actions-view',

   methods: {
      ...mapMutations('character', ['addAction']),
   },

   components: { Action, Button },

   props: {
      character: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="actions-view">
      <Action
         v-for="action in character.actions"
         :key="action.id"
         :action="action"
         :abilities="character.abilities"
         :night="night"
      />

      <Button green full @click="addAction">Add Action</Button>
   </div>
</template>

<style lang="scss" scoped>
.actions-view {
   width: 100%;
}
</style>
