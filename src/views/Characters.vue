<script>
import { mapState, mapActions } from 'vuex';
import ArrowIcon from 'vue-material-design-icons/ChevronRight.vue';
import ImportIcon from 'vue-material-design-icons/FileImport.vue';
import Header from '@/components/Header.vue';
import { Button } from '@/components/common';

export default {
   name: 'characters',

   computed: {
      ...mapState(['characters']),
   },

   created() {
      this.getCharacters();
   },

   methods: {
      ...mapActions(['getCharacters']),
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
            <Button green full>New Character</Button>
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
            class="global-link character"
            @click="console.log(character.id)"
         >
            {{ character.name }}
            <div class="classes">
               <div v-for="(charClass, i) in character.classes" :key="charClass.name">
                  {{ i > 0 ? '/' : '' }} {{ charClass.name }} {{ charClass.level }}
               </div>
            </div>
            <ArrowIcon />
         </router-link>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.character-buttons {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-top: 10px;

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
      justify-content: space-between;
      align-items: center;
      // padding: 0px 10px;
      font-size: 16px;
      border-bottom: 1px solid #eee;

      & .classes {
         display: flex;
         font-size: 12px;
         font-style: italic;
         & div:not(:first-child) { margin-left: 4px; }
      }
   }
}
</style>
