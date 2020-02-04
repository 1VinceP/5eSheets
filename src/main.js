import Vue from 'vue';
import Hammer from 'hammerjs';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './reset.css';

Vue.config.productionTip = false;

Vue.directive('swipe-left', {
   bind: (el, binding) => {
      if (typeof binding.value === 'function') {
         const mc = new Hammer(el);
         mc.get('swipe').set({ direction: Hammer.DIRECTION_LEFT });
         mc.on('swipe', binding.value);
      }
   },
});

Vue.directive('swipe-right', {
   bind: (el, binding) => {
      if (typeof binding.value === 'function') {
         const mc = new Hammer(el);
         mc.get('swipe').set({ direction: Hammer.DIRECTION_RIGHT });
         mc.on('swipe', binding.value);
      }
   },
});

new Vue({
   router,
   store,
   render: h => h(App),
}).$mount('#app');
