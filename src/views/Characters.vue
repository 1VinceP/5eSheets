<script>
import { mapState, mapActions } from 'vuex';
import ArrowIcon from 'vue-material-design-icons/ChevronRight.vue';
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
   },

   components: {
      Header, Button, ArrowIcon,
   },
};
</script>

<template>
   <div class="characters global-page">
      <Header />

      <router-link to="/characters/new" class="global-link" style="width: 100%">
         <Button green full>New Character</Button>
      </router-link>

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
.characters {
   height: 100vh;
   width: 100%;
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
