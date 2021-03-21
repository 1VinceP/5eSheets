<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import flatMap from 'lodash/flatMap';
import { Input, Entry, Button } from '@/components/common';

export default {
   name: 'manage-feature',

   components: { Input, Entry, Button },

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['features', 'classes']),

      feature() {
         const { id } = this.$route.query;
         let feature = this.features.find(f => f.id === id);

         if (!feature) {
            feature = flatMap(this.classes, c => [...c.features, ...c.subclassFeatures])
               .find(f => f.id === id);
         }

         return feature;
      },

      disabled() { return this.feature.fromClass || this.feature.fromSubclass; },
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
         :disabled="disabled"
         :night="night"
      />
      <Input
         autocomplete="off"
         label="Origin"
         name="origin"
         placeholder="Racial, Cleric, etc..."
         :value="feature.origin"
         :disabled="disabled"
         :night="night"
         @input="value => handleFeature(value, 'origin', feature.id)"
      />
      <Input v-if="feature.type === 'counter'"
         autocomplete="off"
         label="Current Value"
         name="value"
         placeholder="0"
         :value="feature.value"
         :disabled="disabled"
         :night="night"
         @input="value => handleFeature(Number(value), 'value', feature.id)"
      />
      <Input v-if="feature.type === 'counter'"
         autocomplete="off"
         label="Max Value"
         name="max"
         placeholder="0"
         :value="feature.max"
         :disabled="disabled"
         :night="night"
         @input="value => handleFeature(Number(value), 'max', feature.id)"
      />
      <Button v-show="!disabled" class="delete" red full @click="handleDelete">Remove</Button>
   </div>
</template>

<style lang="scss" scoped>
.manage-feature {
   width: 100%;

   .delete { margin-top: 10px; }
}
</style>
