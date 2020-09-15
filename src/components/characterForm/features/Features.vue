<script>
import { mapGetters, mapMutations } from 'vuex';
import Draggable from 'vuedraggable';
// import map from 'lodash/map';
import { Button } from '@/components/common';
import Feature from './Feature.vue';

export default {
   name: 'features',

   components: {
      Button,
      Draggable,
      Feature,
   },

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

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="features global-page">
      <section class="entries">
         <Draggable v-model="features" :key="features.length" handle=".move-btn">
            <!-- <Entry
               v-for="feature in features"
               :key="feature.id"
               :entry="feature"
               :night="night"
               buttonLabel="Move"
               @titleInput="(value) => handleFeature(value, 'title', feature.id)"
               @contentInput="value => handleFeature(value, 'content', feature.id)"
               height="100px"
            /> -->
            <Feature
               v-for="feature in features"
               :key="feature.id"
               :feature="feature"
               :night="night"
            />
         </draggable>

      </section>

      <div class="buttons">
         <Button class="add-feature" green sm @click="addFeature('entry')">Add Feature</Button>
         <Button orange sm @click="addFeature('counter')">Add Counter</Button>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.features {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   .entries { width: 100%; }

   .buttons {
      width: 100%;
      display: flex;
      justify-content: space-around;
   }
}
</style>
