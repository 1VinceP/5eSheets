import Vue from 'vue';
import Vuex from 'vuex';
import characterModule from './modules/character';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      showNav: false,
      characters: [],
      theme: 'carbon',
      handedness: 'Right',
      version: '0.0.01',
   },

   getters: {
      night(state) {
         /* eslint-disable indent */
         switch (state.theme) {
            // list of light themes
            case 'boxes':
            case 'parchment':
            case 'paper':
            case 'white':
               return false;
            default:
               return true;
         }
         /* eslint-enable indent */
      },
   },

   mutations: {
      toggleNav(state) {
         state.showNav = !state.showNav;
      },

      setCharacters(state, characters) {
         state.characters = characters;
      },

      applySettings(state, settings) {
         state.theme = settings.theme;
         state.handedness = settings.handedness;
      },

      editSettings(state, { setting, value }) {
         state[setting] = value;

         const settings = {
            theme: state.theme,
            handedness: state.handedness,
         };
         localStorage.setItem('5e-settings', JSON.stringify(settings));
      },
   },

   actions: {
      loadSettings({ commit }) {
         if (localStorage.getItem('5e-settings')) {
            const settings = JSON.parse(localStorage.getItem('5e-settings'));
            commit('applySettings', settings);
         }
      },

      getCharacters({ commit }) {
         if (localStorage.getItem('5e-characters')) {
            const characters = JSON.parse(localStorage.getItem('5e-characters'));
            commit('setCharacters', characters);
         }
      },

      setCharacterById({ state, commit }, id) {
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
