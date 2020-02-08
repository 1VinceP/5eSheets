<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import { Button } from '@/components/common';

export default {
   computed: {
      ...mapState(['handedness']),
      ...mapGetters(['night']),
   },

   methods: {
      ...mapMutations(['toggleNav']),
   },

   components: {
      Button,
   },
};
</script>

<template>
   <header :class="['header', { flipped: handedness === 'Left' }]">
      <router-link to="/" class="global-link">
         <h1 class="title">5eSheets</h1>
      </router-link>
      <Button secondary @click="toggleNav" :night="night">Menu</Button>
   </header>
</template>

<style lang="scss" scoped>
.header {
   height: 60px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 10px;
   padding: 10px 0px;
   &.flipped { flex-direction: row-reverse; }

   & .title {
      font-size: 24px;
   }
}
</style>
