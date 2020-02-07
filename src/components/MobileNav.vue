<script>
import { mapState, mapMutations } from 'vuex';
import { Button } from '@/components/common';

export default {
   data: () => ({
      style: { color: '#fff' },
   }),

   computed: {
      ...mapState(['showNav']),
   },

   methods: {
      ...mapMutations(['toggleNav']),
   },

   components: { Button },
};
</script>

<template>
   <div :class="['mobile-nav', { showNav }]">
      <router-link to="/" class="global-link">
         <Button @click="toggleNav" :style="style">Home</Button>
      </router-link>
      <router-link to="/characters" class="global-link">
         <Button @click="toggleNav" :style="style">Characters</Button>
      </router-link>
      <Button @click="toggleNav" :style="style">Close</Button>
   </div>
</template>

<style lang="scss" scoped>
.mobile-nav {
   height: 100vh;
   width: 100%;
   visibility: hidden;
   background: url('../assets/stars_bg.jpg') no-repeat center center fixed;
   background-size: cover;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   padding: 50% 0;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 10;
   opacity: 0;
   transition: .15s all ease-in-out;
}

.showNav {
   visibility: visible;
   opacity: 1;
}
</style>
