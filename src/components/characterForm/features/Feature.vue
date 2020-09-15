<script>
import { mapMutations } from 'vuex';
import { Button } from '@/components/common';
import Counter from '../Counter.vue';

export default {
   name: 'feature',

   components: { Button, Counter },

   created() {
      if (!this.feature.type) {
         this.editFeature({ name: 'type', value: 'entry', id: this.feature.id });
      }
   },

   methods: {
      ...mapMutations('character', ['editFeature']),

      handleNav() {
         const { id } = this.feature;
         this.$router.push(`/characters/manage/feature?id=${id}&prev=features`);
      },

      handleCounter(name, value) {
         this.editFeature({ name, value, id: this.feature.id });
      },
   },

   props: {
      feature: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div v-if="feature.type === 'entry'" class="feature-entry" @click="handleNav">
      <section class="top">
         <span class="title">{{ feature.title }}</span>
         <Button class="move-btn" link sm>Move</Button>
      </section>
      <section class="bottom">
         <span class="origin">{{ feature.origin }}</span>
      </section>
   </div>

   <div v-else-if="feature.type === 'counter'" class="feature-counter">
      <div class="counter-header">
         <div class="title" @click="handleNav">{{ feature.title || 'Tap to edit' }}</div>
         <Button class="move-btn" link sm>Move</Button>
      </div>
      <Counter
         label="/"
         :name="feature.title"
         :value="feature.value"
         :secondaryValue="feature.max"
         @input="value => handleCounter('value', value)"
         @secondaryInput="value => handleCounter('max', value)"
         @onIncrease="value => handleCounter('value', ++feature.value)"
         @onDecrease="value => handleCounter('value', --feature.value)"
         :night="night"
      />
      <div class="counter-origin">{{ feature.origin }}</div>
   </div>
</template>

<style lang="scss" scoped>
@import "../../../a-variables";

.feature-entry {
   height: 60px;
   width: 100%;
   display: flex;
   flex-direction: column;
   margin-bottom: 16px;

   .top, .bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .top {
      height: 60%;
      border-bottom: 1px solid $grey;
      font-size: 18px;
   }

   .bottom {
      height: 40%;
      font-size: 12px;
      font-style: italic;
   }
}

.feature-counter {
   width: 100%;
   display: flex;
   flex-direction: column;
   margin-bottom: 16px;

   .counter-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
         height: 20px;
         width: 100%;
         display: flex;
         justify-content: flex-start;
         align-items: center;
         font-size: 15px;
      }
   }

   .counter-origin {
      width: 100%;
      margin-top: 6px;
      font-size: 12px;
      font-style: italic;
      text-align: left;
   }
}
</style>
