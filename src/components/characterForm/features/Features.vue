<script>
import { mapGetters, mapMutations } from 'vuex';
import Draggable from 'vuedraggable';
import flatMap from 'lodash/flatMap';
import orderBy from 'lodash/orderBy';
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
            const classFeatures = flatMap(this.character.classes, c => c.features || []);
            const subclassFeatures = flatMap(this.character.classes, c => c.subclassFeatures || []);
            const features = [...this.character.features, ...classFeatures, ...subclassFeatures];
            return orderBy(
               features,
               [
                  feature => feature.type === 'counter',
                  feature => feature.fromClass,
                  feature => feature.fromSubclass,
                  feature => !feature.fromClass && !feature.fromSubclass,
               ],
               'desc',
            );
         },
         set(newList) {
            this.updateFeaturesOrder(
               newList.filter(feature => !feature.fromClass && !feature.fromSubclass),
            );
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
