<script>
import { mapMutations } from 'vuex';
import { Button } from '@/components/common';

export default {
   methods: {
      ...mapMutations(['toggleNav']),
   },

   components: {
      Button,
   },
};
</script>

<template>
   <header class="header">
      <Button secondary @click="toggleNav" style="color: #fff;">Menu</Button>
      <h1 class="title">5eSheets</h1>
   </header>
</template>

<style lang="scss" scoped>
.header {
   height: 60px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px 0px;
   margin-bottom: 30px;
   & .title {
      font-size: 24px;
   }
}
</style>
