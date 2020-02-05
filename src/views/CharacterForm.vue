<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import startCase from 'lodash/startCase';
// import EditIcon from 'vue-material-design-icons/Pencil.vue';
import SaveIcon from 'vue-material-design-icons/ContentSave.vue';
import ImportIcon from 'vue-material-design-icons/FileImport.vue';
import ExportIcon from 'vue-material-design-icons/FileExport.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import ResetIcon from 'vue-material-design-icons/Cached.vue';

import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';

import Header from '@/components/Header.vue';
import Stats from '@/components/characterForm/stats/Stats.vue';
import Actions from '@/components/characterForm/actions/Actions.vue';
import Feats from '@/components/characterForm/feats/Feats.vue';
import Gear from '@/components/characterForm/gear/Gear.vue';
import Magic from '@/components/characterForm/magic/Magic.vue';
import Life from '@/components/characterForm/life/Life.vue';
import Journal from '@/components/characterForm/journal/Journal.vue';
import { FAB } from '@/components/common';

export default {
   name: 'character-form',
   data: () => ({
      isNew: true,
      editing: true,
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
               { title: 'Import', action: this.importCharacter, icon: ImportIcon, bg: 'darkviolet' },
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
      this.getCharacters();
      if (id) {
         this.isNew = false;
         this.editing = false;
         this.setCharacter(id);
      }
   },

   methods: {
      ...mapMutations('character', ['resetForm']),
      ...mapActions(['getCharacters', 'setCharacter']),
      ...mapActions('character', [
         'saveNewCharacter', 'saveCharacter', 'deleteCharacter', 'shortRest', 'longRest',
      ]),

      handleReset() {
         const confirmed = window.confirm('Your changes will be lost.');
         if (confirmed) {
            this.resetForm();
         }
      },

      setView(view) {
         this.view = view;
         this.footOpen = false;
      },

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      handleSave() {
         const { id } = this.$route.params;
         if (id) this.saveCharacter();
         else {
            this.saveNewCharacter();
            this.isNew = false;
         }
      },

      importCharacter() {},

      exportCharacter() {},
   },

   destroyed() {
      this.resetForm();
   },

   components: {
      Header, FAB, Stats, Actions, Feats, Gear, Magic, Life, Journal, ChevronDown, ChevronUp,
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
      <Feats v-else-if="view === 'feats'" :character="character" />
      <Magic v-else-if="view === 'magic'" :character="character" />
      <Life v-else-if="view === 'life'" :character="character" />
      <Journal v-else-if="view === 'journal'" :character="character" />

      <FAB
         :items="floatingItems"
         :style="{
            bottom: footOpen ? '120px' : '70px',
            transition: 'bottom .15s ease-in-out',
         }"
      />

      <span :class="['footer', { footOpen }]">
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
            :class="['foot-item', { selected: view === 'gear' }]"
            @click="setView('gear')"
         >
            Gear
         </div>
         <div
            :class="['foot-item', { selected: view === 'magic' }]"
            @click="setView('magic')"
         >
            Magic
         </div>
         <div class="foot-item" @click="footOpen = !footOpen">
            <ChevronDown v-if="!footOpen" />
            <ChevronUp v-else />
         </div>
         <div
            :class="['foot-item', { selected: view === 'feats' }]"
            @click="setView('feats')"
         >
            Features
         </div>
         <div
            :class="['foot-item', { selected: view === 'life' }]"
            @click="setView('life')"
         >
            Life
         </div>
         <div
            :class="['foot-item', { selected: view === 'journal' }]"
            @click="setView('journal')"
         >
            Journal
         </div>
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
      align-items: flex-end;
      font-size: 24px;
      & .page-title { margin-left: 10px; }
   }
}

.footer {
   height: 100px;
   width: 100%;
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   grid-template-rows: repeat(2, 50%);
   background: #323231;
   position: fixed;
   bottom: 0px;
   transform: translateY(50px);
   transition: transform .15s ease-in-out;
   &.footOpen { transform: translateY(0px); }

   & .foot-item {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      &.selected {
         color: $blue;
         box-shadow: inset 0 -10px 6px -10px $blue;
      }
   }
}
</style>
