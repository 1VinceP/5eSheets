<script>
import { mapMutations } from 'vuex';
import Action from './Action.vue';

export default {
   name: 'actions-view',

   methods: {
      ...mapMutations('character', ['addAction']),
   },

   components: { Action },

   props: {
      actions: Array,
      abilities: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="actions-view">
      <Action
         v-for="action in actions"
         :key="action.id"
         :action="action"
         :abilities="abilities"
         :night="night"
      />
   </div>
</template>

<style lang="scss" scoped>
.actions-view {
   width: 100%;
}
</style>
