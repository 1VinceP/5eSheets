import Vue from 'vue';
import Vuex from 'vuex';
import characterModule from './modules/character';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      showNav: false,
      characters: [],
   },

   mutations: {
      toggleNav(state) {
         state.showNav = !state.showNav;
      },

      setCharacters(state, characters) {
         state.characters = characters;
      },
   },

   actions: {
      getCharacters({ commit }) {
         if (localStorage.getItem('5e-characters')) {
            const characters = JSON.parse(localStorage.getItem('5e-characters'));
            commit('setCharacters', characters);
         }
      },

      setCharacter({ state, commit }, id) {
         const character = state.characters.find(c => c.id === id);
         if (!character) {
            router.push('/characters');
         } else {
            commit('character/setCharacter', character);
         }
      },
   },

   modules: {
      character: characterModule,
   },
});
