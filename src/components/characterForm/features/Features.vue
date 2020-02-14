<script>
import { mapGetters, mapMutations } from 'vuex';
// import map from 'lodash/map';
// import Counter from '../Counter.vue';
import { Button, Entry } from '@/components/common';

export default {
   name: 'features',

   computed: {
      ...mapGetters(['night']),
   },

   methods: {
      ...mapMutations('character', ['addFeature', 'editFeature']),

      handleFeature(value, name, id) {
         this.editFeature({ name, value, id });
      },
   },

   components: { Button, Entry },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="features global-page">
      <section class="entries">
         <Entry
            v-for="(feature, i) in character.features"
            :key="i"
            :entry="feature"
            :night="night"
            @titleInput="(value) => handleFeature(value, 'title', feature.id)"
            @contentInput="value => handleFeature(value, 'content', feature.id)"
            height="100px"
         />
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
