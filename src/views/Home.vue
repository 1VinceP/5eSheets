<script>
import SheetsIcon from 'vue-material-design-icons/NewspaperVariantMultiple.vue';
import MapIcon from 'vue-material-design-icons/MapLegend.vue';
import Header from '@/components/Header.vue';

export default {
   name: 'home',
   components: {
      Header, SheetsIcon, MapIcon,
   },
};
</script>

<template>
   <div class="home global-page">
      <Header />
      <router-link to="/characters" class="global-link">
         <div class="home-card">
            <SheetsIcon :size="102" />
            <div>Characters</div>
         </div>
      </router-link>

      <router-link to="/dm" class="global-link">
         <div class="home-card">
            <MapIcon :size="102" />
            <div>DM View</div>
         </div>
      </router-link>
   </div>
</template>

<style lang="scss" scoped>
@import '../a-variables.scss';

.home {
   height: 100vh;
   width: 100%;
   & .home-card {
      height: 200px;
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      border: 1px solid $eventGreen;
      border-radius: 3px;
      font-size: 20px;
   }
}
</style>
