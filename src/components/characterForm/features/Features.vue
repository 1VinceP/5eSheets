<script>
import { mapGetters } from 'vuex';
import Counter from '@/components/characterForm/Counter.vue';

export default {
   name: 'features',

   computed: {
      ...mapGetters(['night']),
   },

   methods: {
      isMonk() {
         return this.character.classes.findIndex(cl => cl.name === 'Monk') >= 0;
      },
   },

   components: { Counter },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="features">
      <section class="counters">
         <div v-show="isMonk" :class="['section-label', 'margin', { night }]">
            Ki Points
         </div>
         <Counter
            v-show="isMonk"
            name="kiPoints"
            secondaryName="maxKiPoints"
            label="/"
            :min="0"
            :max="character.maxKiPoints"
            :value="character.kiPoints"
            :secondaryValue="character.maxKiPoints"
            :disableDecrease="character.kiPoints <= 0"
            :disableIncrease="character.kiPoints >= character.maxKiPoints"
            @input="(value, name) => editField(Number(value), name)"
            @secondaryInput="(value, name) => editField(Number(value), name)"
            @onDecrease="(value, name) => editField(--character.kiPoints, name)"
            @onIncrease="(value, name) => editField(++character.kiPoints, name)"
            :night="night"
         />
      </section>
   </div>
</template>

<style lang="scss" scoped>
.features {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
}
</style>
