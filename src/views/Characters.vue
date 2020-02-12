<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import ArrowIcon from 'vue-material-design-icons/ChevronRight.vue';
import ImportIcon from 'vue-material-design-icons/FileImport.vue';
import Header from '@/components/Header.vue';
import { Button } from '@/components/common';

export default {
   name: 'characters',

   computed: {
      ...mapState(['characters']),
      ...mapGetters(['night']),
   },

   created() {
      this.getCharacters();
      this.resetForm();
   },

   methods: {
      ...mapActions(['getCharacters']),
      ...mapMutations('character', ['resetForm']),
      ...mapActions('character', ['importCharacter']),

      // eslint-disable-next-line consistent-return
      loadFiles() {
         const { files } = document.getElementById('selectFiles');
         if (files.length <= 0) {
            return false;
         }

         const fr = new FileReader();
         fr.onload = (e) => {
            const character = JSON.parse(e.target.result);
            this.importCharacter(character);
         };
         fr.readAsText(files[0]);
      },
   },

   components: {
      Header, Button, ArrowIcon, ImportIcon,
   },
};
</script>

<template>
   <div class="characters global-page">
      <Header />

      <section class="character-buttons">
         <router-link to="/characters/new" class="global-link new-button">
            <Button green full @click="resetForm">New Character</Button>
         </router-link>

         <div class="import-container">
            <input type="file" id="selectFiles" @change="loadFiles" accept=".json" />
            <label for="selectFiles">
               <Button orange full night><ImportIcon /></Button>
            </label>
         </div>
      </section>

      <div class="character-list">
         <router-link
            v-for="character in characters"
            :key="character.id"
            :to="`/characters/${character.id}`"
            :class="['global-link', 'character', { night }]"
            @click="console.log(character.id)"
         >
            <span class="section name">{{ character.name }}</span>
            <div class="section classes">
               <div v-for="(charClass, i) in character.classes" :key="charClass.name">
                  {{ i > 0 ? '/' : '' }} {{ charClass.name }} {{ charClass.level }}
               </div>
            </div>
            <span class="section arrow"><ArrowIcon /></span>
         </router-link>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '../a-variables';

.character-buttons {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;

   & .new-button {
      width: 80%;
   }

   & .import-container {
      width: 15%;
      position: relative;
      & input {
         height: 100%;
         width: 100%;
         position: absolute;
         top: 0;
         left: 0;
         opacity: 0;
      }
   }
}

.character-list {
   width: 100%;
   margin-top: 30px;

   & .character {
      width: 100%;
      height: 52px;
      display: flex;
      align-items: center;
      font-size: 16px;
      border-bottom: 1px solid $navy;
      &.night { border-color: #eee; }

      & .section {
         height: 100%;
         display: flex;
         align-items: center;
         overflow:hidden;
         white-space:nowrap;
         text-overflow: ellipsis;
      }

      & .name { flex: 3; }

      & .classes {
         flex: 6;
         justify-content: center;
         padding: 0 6px;
         font-size: 12px;
         font-style: italic;
         & div:not(:first-child) { margin-left: 4px; }
      }

      & .arrow {
         flex: 3;
         justify-content: flex-end;
      }
   }
}
</style>
