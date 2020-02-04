<script>
import MobileNav from '@/components/MobileNav.vue';

export default {
   components: { MobileNav },
};
</script>

<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <MobileNav />
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './_a-variables.scss';

#app {
   background: url('assets/stripes_bg.jpg') no-repeat center center fixed;
   background-size: cover;
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #eee;
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
   color: #eee;
}
.global-tip {
   color: $grey;
   font-size: 12px;
   text-align: center;
   font-style: italic;
}
</style>
