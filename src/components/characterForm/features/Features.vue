<script>
import { mapGetters, mapMutations } from 'vuex';
import draggable from 'vuedraggable';
// import map from 'lodash/map';
// import Counter from '../Counter.vue';
import { Button, Entry } from '@/components/common';

export default {
   name: 'features',

   computed: {
      ...mapGetters(['night']),
      ...mapGetters('character', ['features']),

      features: {
         get() {
            return this.character.features;
         },
         set(newList) {
            this.updateFeaturesOrder(newList);
         },
      },
   },

   methods: {
      ...mapMutations('character', ['addFeature', 'editFeature', 'updateFeaturesOrder']),

      handleFeature(value, name, id) {
         this.editFeature({ name, value, id });
      },
   },

   components: { Button, Entry, draggable },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="features global-page">
      <section class="entries">
         <draggable v-model="features" handle=".entry-title">
            <Entry
               v-for="feature in features"
               :key="feature.id"
               :entry="feature"
               :night="night"
               @titleInput="(value) => handleFeature(value, 'title', feature.id)"
               @contentInput="value => handleFeature(value, 'content', feature.id)"
               height="100px"
            />
         </draggable>

      </section>

      <Button green full @click="addFeature">Add Feature</Button>
   </div>
</template>

<style lang="scss" scoped>
.features {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   & .entries {
      width: 100%;
   }
}
</style>
