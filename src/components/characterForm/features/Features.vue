<script>
import { mapGetters } from 'vuex';
// import map from 'lodash/map';
import Counter from '@/components/characterForm/Counter.vue';

export default {
   name: 'features',

   computed: {
      ...mapGetters(['night']),
   },

   methods: {
   },

   components: { Counter },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="features">
      <div
         v-for="counter in counters"
         :key="counter.label"
         class="counters"
      >
         <div :class="['section-label', 'margin', { night }]">
            {{ counter.label }}
         </div>
         <Counter
            name="points"
            secondaryName="maxPoints"
            label="/"
            :min="0"
            :max="counter.maxPoints"
            :value="counter.points"
            :secondaryValue="counter.maxPoints"
            :disableDecrease="counter.points <= 0"
            :disableIncrease="counter.points >= counter.maxPoints"
            @input="(value, name) => editField(Number(value), name)"
            @secondaryInput="(value, name) => editField(Number(value), name)"
            @onDecrease="character.currentValue = character.points - 1"
            @onIncrease="character.currentValue = character.points + 1"
            :night="night"
         />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.features {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   & .counters {
      width: 100%;
   }
}
</style>
