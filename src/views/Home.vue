<script>
import { mapGetters } from 'vuex';
import SheetsIcon from 'vue-material-design-icons/NewspaperVariantMultiple.vue';
import MapIcon from 'vue-material-design-icons/MapLegend.vue';
import ContentIcon from 'vue-material-design-icons/Notebook.vue';
import SettingsIcon from 'vue-material-design-icons/Settings.vue';
import AboutIcon from 'vue-material-design-icons/InformationVariant.vue';
import Header from '@/components/Header.vue';

export default {
   name: 'home',

   computed: {
      ...mapGetters(['night']),
   },

   components: {
      Header, SheetsIcon, MapIcon, ContentIcon, SettingsIcon, AboutIcon,
   },
};
</script>

<template>
   <div class="home global-page">
      <Header />

      <router-link to="/characters" class="global-link">
         <div :class="['home-card', 'blue', { night }]">
            <SheetsIcon :size="102" />
            <div>Characters</div>
         </div>
      </router-link>

      <router-link to="/dm" class="global-link">
         <div :class="['home-card', 'purple', { night }]">
            <MapIcon :size="102" />
            <div>DM View</div>
         </div>
      </router-link>

      <router-link to="/content-manager" class="global-link">
         <div :class="['home-card', 'green', { night }]">
            <ContentIcon :size="102" />
            <div>Content Manager</div>
         </div>
      </router-link>

      <router-link to="/settings" class="global-link">
         <div :class="['home-card', 'orange', { night }]">
            <SettingsIcon :size="102" />
            <div>Settings</div>
         </div>
      </router-link>

      <router-link to="/about" class="global-link">
         <div :class="['home-card', 'red', { night }]">
            <AboutIcon :size="102" />
            <div>About</div>
         </div>
      </router-link>
   </div>
</template>

<style lang="scss" scoped>
@import '../a-variables.scss';

.home {
   width: 100%;
   & .home-card {
      height: 200px;
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      border: 3px solid $blue;
      border-radius: 3px;
      box-shadow: 0px 3px 6px 2px #0008;
      font-size: 20px;
      color: #323231;
      &.blue { border-color: $blue; }
      &.purple { border-color: darkviolet; }
      &.green { border-color: $green; }
      &.orange { border-color: $orange; }
      &.red { border-color: $red; }
      &.night { color: #eee; }
   }
}
</style>
