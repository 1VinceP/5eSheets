<script>
/* eslint-disable max-len */
import { mapState, mapGetters, mapActions } from 'vuex';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import MobileNav from '@/components/MobileNav.vue';

export default {
   components: { MobileNav },

   computed: {
      ...mapState(['theme']),
      ...mapGetters(['night']),
   },

   created() {
      this.loadSettings();

      toastr.options = {
         positionClass: 'toast-top-full-width',
         showMethod: 'slideDown',
         hideMethod: 'slideUp',
         closeMethod: 'slideUp',
         timeOut: 2500,
         showDuration: 100,
         hideDuration: 100,
         hideDuplicates: true,
      };
   },

   methods: {
      ...mapActions(['loadSettings']),
   },
};
</script>

<template>
   <div id="app" :class="[theme, { night }]">
      <MobileNav />
      <router-view/>
   </div>
</template>

<style lang="scss">
@import 'a-variables';
@import 'themes';

#app {
   box-shadow: inset 0 0px 20px 1px black;
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: $navy;
   &.night { color: #eee; }
}
#nav {
   padding: 30px;
   a {
      font-weight: bold;
      color: #eee;
      &.router-link-exact-active {
         color: #42b983;
      }
   }
}

.global-page {
   min-height: 100vh;
   width: 100%;
   padding: 0px 14px;
   display: flex;
   flex-direction: column;
   align-items: center;
}

.global-link {
   text-decoration: none;
   color: inherit;
}
.global-tip {
   color: $navy;
   font-size: 12px;
   text-align: center;
   font-style: italic;
   &.night { color: $grey }
}
</style>
