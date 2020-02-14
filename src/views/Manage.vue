<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue';
import { Button } from '@/components/common';

export default {
   name: 'manage',

   computed: {
      ...mapState('character', ['id']),
   },

   methods: {
      handleReturn() {
         const { prev } = this.$route.query;
         const id = this.id ? this.id : 'new';
         this.$router.push(`/characters/${id}?view=${prev}&reset=false`);
      },
   },

   components: { Header, Button },
};
</script>

<template>
   <div class="global-page manage">
      <Header />

      <router-view :handleReturn="handleReturn"></router-view>

      <Button green class="return-button" @click="handleReturn">Return</Button>
   </div>
</template>

<style lang="scss" scoped>
.manage {
   padding-bottom: 60px;
}

.return-button {
   width: 100vw;
   position: fixed;
   bottom: 0;
   left: 0;
}
</style>
