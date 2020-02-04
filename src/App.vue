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
   // background: url('assets/stripes_bg.jpg') no-repeat center center fixed;
   // background-size: cover;
   background:
   linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
   linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
   linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
   linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
   linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
   linear-gradient(
      #1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424
   );
   background-color: #131313;
   background-size: 20px 20px;

   box-shadow: inset 0 0px 20px 1px black;
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
