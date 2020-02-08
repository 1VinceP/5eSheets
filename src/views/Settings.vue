<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import startCase from 'lodash/startCase';
import Header from '@/components/Header.vue';
import { Select } from '@/components/common';
import themesList from '@/constants/themes.constants';

export default {
   name: 'settings',

   data: () => ({
      themesList,
   }),

   computed: {
      ...mapState(['handedness', 'theme', 'night']),
      ...mapGetters(['night']),
   },

   methods: {
      ...mapMutations(['editSettings']),

      editSetting(value, prop) {
         this.editSettings({ setting: prop, value });
      },

      formatTheme(theme) {
         return startCase(theme);
      },
   },

   components: { Header, Select },
};
</script>

<template>
   <div class="global-page settings">
      <Header />

      <Select
         name="handedness"
         label="Are you right or left handed?"
         :value="handedness"
         :options="['Right', 'Left']"
         :night="night"
         @change="editSetting"
         disableDefault
      />

      <section class="theme-switcher">
         <div
            v-for="themeOption in themesList"
            :key="themeOption"
            :class="[
               'theme-item',
               themeOption,
               {
                  night,
                  selected: themeOption === theme,
               },
            ]"
            @click="editSetting(themeOption, 'theme')"
         >
            <span class="theme-label">{{ formatTheme(themeOption) }}</span>
         </div>
      </section>
   </div>
</template>

<style lang="scss" scoped>
@import '../_a-variables.scss';
@import '../themes.scss';

.settings {
   width: 100%;

   & .theme-switcher {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      & .theme-item {
         height: 175px;
         width: 175px;
         display: flex;
         justify-content: center;
         align-items: flex-end;
         border: 1px solid #323231;
         margin-bottom: 30px;
         box-shadow: 0px 3px 6px 2px #0008;
         &.selected {
            background: transparent;
            border-color: $blue;
         }

         & .theme-label {
            width: 100%;
            background: #0008;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 6px;
            color: #eee;
         }
      }
   }
}
</style>
