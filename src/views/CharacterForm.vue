<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import startCase from 'lodash/startCase';
import uuid from 'uuid/v4';

import SaveIcon from 'vue-material-design-icons/ContentSave.vue';
import ExportIcon from 'vue-material-design-icons/FileExport.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import ResetIcon from 'vue-material-design-icons/Cached.vue';

import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';

import Header from '@/components/Header.vue';
import Stats from '@/components/characterForm/stats/Stats.vue';
import Actions from '@/components/characterForm/actions/Actions.vue';
import Gear from '@/components/characterForm/gear/Gear.vue';
import Magic from '@/components/characterForm/magic/Magic.vue';
import Friends from '@/components/characterForm/friends/Friends.vue';
import Features from '@/components/characterForm/features/Features.vue';
import Journal from '@/components/characterForm/journal/Journal.vue';
import Life from '@/components/characterForm/life/Life.vue';
import { FAB } from '@/components/common';

export default {
   name: 'character-form',
   data: () => ({
      isNew: true,
      view: 'stats',
      footOpen: false,
      footerTemp: '',
   }),

   computed: {
      ...mapState({
         character: state => state.character,
      }),

      pageTitle() {
         return startCase(this.view);
      },

      floatingItems() {
         const save = { title: 'Save', action: this.handleSave, icon: SaveIcon, bg: '#17AE82' };
         if (this.isNew) {
            return [
               save,
               { title: 'Reset', action: this.handleReset, icon: ResetIcon, bg: '#c42338' },
            ];
         }

         return [
            save,
            { title: 'Export', action: this.exportCharacter, icon: ExportIcon, bg: 'darkviolet' },
            { title: 'Delete', action: this.deleteCharacter, icon: DeleteIcon, bg: '#C42338' },
         ];
      },
   },

   created() {
      const { id } = this.$route.params;
      const { view, reset } = this.$route.query;

      // retrieve characters to handle refreshing
      this.getCharacters();

      if (id) {
         this.isNew = false;
         if (reset !== 'false') {
            // don't reload character when returning from management pages
            this.setCharacterById(id);
         } else {
            // remove reset query from url to preserve state after refresh
            const { path, query } = this.$route;
            const newQueries = Object.keys(query)
               .filter(key => key !== 'reset')
               .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
               .join('&');
            const newUrl = `/#${path}?${newQueries}`;
            window.history.replaceState({}, null, newUrl);
         }
      }

      if (view) this.view = view;
   },

   methods: {
      ...mapMutations('character', ['resetForm']),
      ...mapActions(['getCharacters', 'setCharacterById']),
      ...mapActions('character', [
         'saveNewCharacter', 'saveCharacter', 'deleteCharacter',
      ]),

      handleReset() {
         const confirmed = window.confirm('Your changes will be lost.');
         if (confirmed) {
            this.resetForm();
         }
      },

      setView(view) {
         this.$router.push({ query: { ...this.$route.query, view } });
         this.view = view;
         this.footOpen = false;
         window.scrollTo(0, 0);
      },

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      handleSave() {
         const { id } = this.$route.params;
         if (id) {
            this.saveCharacter(id);
         } else {
            this.saveNewCharacter();
            this.isNew = false;
         }
      },

      exportCharacter() {
         const character = JSON.stringify({ ...this.character, id: uuid() });
         const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(character)}`;
         const downloadElement = document.createElement('a');
         downloadElement.setAttribute('href', dataStr);
         downloadElement.setAttribute('download', `${this.character.name}.json`);
         document.body.appendChild(downloadElement);
         downloadElement.click();
         downloadElement.remove();
      },
   },

   components: {
      Header,
      FAB,
      Stats,
      Actions,
      Gear,
      Magic,
      Friends,
      Features,
      Journal,
      Life,
      ChevronDown,
      ChevronUp,
   },
};
</script>

<template>
   <div class="character-form global-page">
      <Header />

      <div v-show="view !== 'stats' && character.name" class="headline-title">
         <h1 class="name">{{ character.name }}'s</h1>
         <h1 class="page-title">{{ pageTitle }}</h1>
      </div>

      <Stats v-if="view === 'stats'" :character="character" />
      <Actions v-else-if="view === 'actions'" :character="character" />
      <Gear v-else-if="view === 'gear'" :character="character" />
      <Magic v-else-if="view === 'magic'" :character="character" />
      <Friends v-else-if="view === 'friends'" :character="character" />
      <Features v-else-if="view === 'features'" :character="character" />
      <Journal v-else-if="view === 'journal'" :character="character" />
      <Life v-else-if="view === 'life'" :character="character" />

      <FAB
         :items="floatingItems"
         :style="{
            bottom: footOpen ? '120px' : '70px',
            transition: 'bottom .15s ease-in-out',
         }"
      />

      <span :class="['footer', { footOpen }]">
         <section class="top">
            <div
               :class="['foot-item', { selected: view === 'stats' }]"
               @click="setView('stats')"
            >
               Stats
            </div>
            <div
               :class="['foot-item', { selected: view === 'actions' }]"
               @click="setView('actions')"
            >
               Actions
            </div>
            <div
               :class="['foot-item', { selected: view === 'magic' }]"
               @click="setView('magic')"
            >
               Magic
            </div>
            <div
               :class="['foot-item', { selected: view === 'features' }]"
               @click="setView('features')"
            >
               Features
            </div>
            <div class="foot-item" @click="footOpen = !footOpen">
               <ChevronDown v-if="!footOpen" />
               <ChevronUp v-else />
            </div>
         </section>

         <section class="bottom">
            <div
               :class="['foot-item', { selected: view === 'gear' }]"
               @click="setView('gear')"
            >
               Gear
            </div>
            <div
               :class="['foot-item', { selected: view === 'friends' }]"
               @click="setView('friends')"
            >
               Friends
            </div>
            <div
               :class="['foot-item', { selected: view === 'journal' }]"
               @click="setView('journal')"
            >
               Journal
            </div>
            <div
               :class="['foot-item', { selected: view === 'life' }]"
               @click="setView('life')"
            >
               Life
            </div>
         </section>
      </span>
   </div>
</template>

<style lang="scss" scoped>
@import '../_a-variables.scss';

.character-form {
   padding-bottom: 140px;

   & .headline-title {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 24px;
      & .page-title { margin-left: 10px; }
   }
}

.footer {
   height: 100px;
   width: 100%;
   display: grid;
   grid-template-rows: repeat(2, 50%);
   background: #323231;
   position: fixed;
   bottom: 0px;
   color: #eee;
   transform: translateY(50px);
   transition: transform .15s ease-in-out;
   &.footOpen { transform: translateY(0px); }

   & .top {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
   }
   & .bottom {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
   }

   & .foot-item {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      &.large { grid-column: span 2; }
      &.selected {
         color: $blue;
         box-shadow: inset 0 -10px 6px -10px $blue;
      }
   }
}
</style>
