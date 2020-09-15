<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { Input, Entry, Button } from '@/components/common';

export default {
   name: 'manage-feature',

   components: { Input, Entry, Button },

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['features']),

      feature() {
         const { id } = this.$route.query;
         return this.features.find(f => f.id === id);
      },
   },

   methods: {
      ...mapMutations('character', ['editFeature', 'removeFeature']),

      handleFeature(value, name, id) {
         this.editFeature({ name, value, id });
      },

      handleDelete() {
         const confirmed = window.confirm('This will be permanently deleted.');
         if (confirmed) {
            this.removeFeature(this.feature.id);
            this.handleReturn();
         }
      },

      handleOrigin() {},
   },

   props: {
      handleReturn: Function,
   },
};
</script>

<template>
   <div class="manage-feature">
      <Entry
         height="200px"
         @titleInput="value => handleFeature(value, 'title', feature.id)"
         @contentInput="value => handleFeature(value, 'content', feature.id)"
         :entry="feature"
         :night="night"
      />
      <Input
         autocomplete="off"
         label="Origin"
         name="origin"
         placeholder="Racial, Cleric, etc..."
         :value="feature.origin"
         :night="night"
         @input="value => handleFeature(value, 'origin', feature.id)"
      />
      <Input v-if="feature.type === 'counter'"
         autocomplete="off"
         label="Current Value"
         name="value"
         placeholder="0"
         :value="feature.value"
         :night="night"
         @input="value => handleFeature(Number(value), 'value', feature.id)"
      />
      <Input v-if="feature.type === 'counter'"
         autocomplete="off"
         label="Max Value"
         name="max"
         placeholder="0"
         :value="feature.max"
         :night="night"
         @input="value => handleFeature(Number(value), 'max', feature.id)"
      />
      <Button class="delete" red full @click="handleDelete">Remove</Button>
   </div>
</template>

<style lang="scss" scoped>
.manage-feature {
   width: 100%;

   .delete { margin-top: 10px; }
}
</style>
