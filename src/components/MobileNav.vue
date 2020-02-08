<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { Button } from '@/components/common';

export default {
   computed: {
      ...mapState(['theme', 'handedness', 'showNav']),
      ...mapGetters(['night']),
   },

   methods: {
      ...mapMutations(['toggleNav']),
   },

   components: { Button },
};
</script>

<template>
   <div :class="['mobile-nav', theme, { showNav, flipped: handedness === 'Left' }]">
      <router-link to="/" class="global-link">
         <Button @click="toggleNav" :night="night">Home</Button>
      </router-link>
      <router-link to="/characters" class="global-link">
         <Button @click="toggleNav" :night="night">Characters</Button>
      </router-link>
      <router-link to="/settings" class="global-link">
         <Button @click="toggleNav" :night="night">Settings</Button>
      </router-link>
      <router-link to="/about" class="global-link">
         <Button @click="toggleNav" :night="night">About</Button>
      </router-link>
      <Button @click="toggleNav" :night="night">Close</Button>
   </div>
</template>

<style lang="scss" scoped>
@import '../themes';

.mobile-nav {
   height: 100vh;
   width: 100%;
   visibility: hidden;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   padding: 15% 0 85% 25%;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 10;
   opacity: 0;
   transition: .15s all ease-in-out;
   &.flipped { padding: 15% 25% 85% 0; }
}

.showNav {
   visibility: visible;
   opacity: 1;
}
</style>
