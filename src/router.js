import Vue from 'vue';
import Router from 'vue-router';

import EmptyRouterView from '@/components/common/EmptyRouterView.vue';
import Home from './views/Home.vue';
import Characters from './views/Characters.vue';
import CharacterForm from './views/CharacterForm.vue';

import Manage from './views/Manage.vue';
import ManageAction from './components/characterForm/actions/ManageAction.vue';
import ManageSpell from './components/characterForm/magic/ManageSpell.vue';
import ManagePsionic from './components/characterForm/magic/ManagePsionic.vue';
import ManageGear from './components/characterForm/gear/ManageGear.vue';
import ManageFriend from './components/characterForm/friends/ManageFriend.vue';

import DMView from './views/DungeonMaster.vue';
import ContentManager from './views/ContentManager.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

const router = new Router({
   routes: [
      {
         path: '/',
         name: 'home',
         component: Home,
      },
      {
         path: '/characters',
         component: EmptyRouterView,
         children: [
            {
               path: '',
               name: 'characters',
               component: Characters,
            },
            {
               path: 'new',
               name: 'newCharacter',
               component: CharacterForm,
            },
            {
               path: ':id',
               name: 'character',
               component: CharacterForm,
            },
            {
               path: 'manage',
               name: 'manage',
               component: EmptyRouterView,
               children: [
                  {
                     path: '',
                     name: 'manage',
                     component: Manage,
                     children: [
                        {
                           path: 'action',
                           name: 'manage-action',
                           component: ManageAction,
                        },
                        {
                           path: 'spell',
                           name: 'manage-spell',
                           component: ManageSpell,
                        },
                        {
                           path: 'psionic',
                           name: 'manage-psionic',
                           component: ManagePsionic,
                        },
                        {
                           path: 'gear',
                           name: 'manage-gear',
                           component: ManageGear,
                        },
                        {
                           path: 'friend',
                           name: 'manage-friend',
                           component: ManageFriend,
                        },
                     ],
                  },
               ],
            },
         ],
      },
      {
         path: '/dm',
         name: 'dm',
         component: DMView,
      },
      {
         path: '/content-manager',
         name: 'contentManager',
         component: ContentManager,
      },
      {
         path: '/settings',
         name: 'settings',
         component: Settings,
      },
      {
         path: '/about',
         name: 'about',
         // route level code-splitting
         // this generates a separate chunk (about.[hash].js) for this route
         // which is lazy-loaded when the route is visited.
         component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      },
   ],
});

router.beforeEach((to, from, next) => {
   window.scrollTo(0, 0);
   next();
});

export default router;
