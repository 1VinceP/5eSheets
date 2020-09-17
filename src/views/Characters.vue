<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import map from 'lodash/map';
import uuid from 'uuid/v4';
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
      ...mapActions('character', ['importCharacter', 'deleteCharacter']),

      map,

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

      handleBrokenCharacter(character, index) {
         if (!character.id) {
            const confirmDownload = window.confirm('Something seems to have gone wrong with this character. Would you like to download a copy?');
            const confirmDelete = window.confirm('Would you like to delete the broken character?');
            if (confirmDownload) {
               this.exportCharacter(character);
            }
            if (confirmDelete) {
               const newCharacterList = [...this.characters];
               newCharacterList.splice(index, 1);
               localStorage.setItem('5e-characters', JSON.stringify(newCharacterList));
               this.getCharacters();
            }
         }
      },

      exportCharacter(brokenCharacter) {
         const character = JSON.stringify({ ...brokenCharacter, id: uuid() });
         const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(character)}`;
         const downloadElement = document.createElement('a');
         downloadElement.setAttribute('href', dataStr);
         downloadElement.setAttribute('download', 'broken_character.json');
         document.body.appendChild(downloadElement);
         downloadElement.click();
         downloadElement.remove();
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
            v-for="(character, i) in characters"
            :key="character.id"
            :to="`/characters/${character.id}`"
            :class="['global-link', 'character', { night }]"
         >
            <section class="section left" @click="handleBrokenCharacter(character, i)">
               <span class="title">{{ character.name }}</span>
               <div class="classes">
                  <div v-for="(charClass, i) in character.classes" :key="charClass.name">
                     {{ i > 0 ? '/' : '' }} {{ charClass.name }} {{ charClass.level }}
                  </div>
               </div>
            </section>
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
      height: 44px;
      display: flex;
      align-items: center;
      border: 1px solid $navy;
      border-radius: 3px;
      margin-bottom: 10px;
      padding: 3px 0;
      font-size: 16px;
      &.night {
         background: #8883;
         border-color: $grey;
      }

      & .section {
         height: 100%;
         display: flex;
         align-items: center;
         &.left {
            width: 95%;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            padding-left: 6px;
            & .title {
               width: 100%;
               font-size: 14px;
            }
            & .classes {
               width: 100%;
               display: flex;
               font-size: 12px;
               font-style: italic;
               & div:not(:first-child) { margin-left: 4px; }
            }
         }
         &.arrow {
            width: 5%;
            justify-content: flex-end;
         }
      }
   }
}
</style>
