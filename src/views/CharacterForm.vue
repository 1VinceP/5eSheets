<script>
import { mapState, mapMutations, mapActions } from 'vuex';
// import EditIcon from 'vue-material-design-icons/Pencil.vue';
import SaveIcon from 'vue-material-design-icons/ContentSave.vue';
import ImportIcon from 'vue-material-design-icons/FileImport.vue';
import ExportIcon from 'vue-material-design-icons/FileExport.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import ResetIcon from 'vue-material-design-icons/Cached.vue';
import LongRestIcon from 'vue-material-design-icons/Clock.vue';
import ShortRestIcon from 'vue-material-design-icons/ClockOutline.vue';

import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';

import Header from '@/components/Header.vue';
import Stats from '@/components/characterForm/Stats.vue';
import Feats from '@/components/characterForm/Feats.vue';
import Gear from '@/components/characterForm/Gear.vue';
import Magic from '@/components/characterForm/Magic.vue';
import Life from '@/components/characterForm/Life.vue';
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

      floatingItems() {
         const save = { title: 'Save', action: this.handleSave, icon: SaveIcon, bg: '#17AE82' };
         if (this.isNew) {
            return [
               save,
               { title: 'Import', action: this.importCharacter, icon: ImportIcon },
               { title: 'Reset', action: this.resetForm, icon: ResetIcon },
            ];
         }

         return [
            { title: 'Long Rest', action: this.longRest, icon: LongRestIcon },
            { title: 'Short Rest', action: this.shortRest, icon: ShortRestIcon },
            save,
            { title: 'Export', action: this.exportCharacter, icon: ExportIcon },
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
      Header, FAB, Stats, Feats, Gear, Magic, Life, ChevronDown, ChevronUp,
   },
};
</script>

<template>
   <div class="character-form global-page">
      <Header />

      <Stats v-if="view === 'stats'" :character="character" />
      <Gear v-else-if="view === 'gear'" :character="character" />
      <Feats v-else-if="view === 'feats'" :character="character" />
      <Magic v-else-if="view === 'magic'" :character="character" />
      <Life v-else :character="character" :setView="setView" />

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
            :class="['foot-item', { selected: view === 'feats' }]"
            @click="setView('feats')"
         >
            Feats
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
            :class="['foot-item', { selected: view === 'life' }]"
            @click="setView('life')"
         >
            Life
         </div>
      </span>
   </div>
</template>

<style lang="scss" scoped>
@import '../_a-variables.scss';

.character-form {
   padding-bottom: 140px;
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
      &.selected {
         color: $blue;
         box-shadow: inset 0 -10px 6px -10px $blue;
      }
   }
}
</style>
