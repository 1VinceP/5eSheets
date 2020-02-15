<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import FriendStats from './FriendStats.vue';
import FriendActions from './FriendActions.vue';
import FriendNotes from './FriendNotes.vue';

export default {
   name: 'manage-friend',

   data: () => ({
      view: 'stats',
   }),

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['friends']),

      friend() {
         const { id } = this.$route.query;
         const friend = this.friends.find(f => f.id === id);
         return friend;
      },
   },

   methods: {
      ...mapMutations('character', ['deleteFriend']),

      removeFriend() {
         const confirmed = window.confirm('Your friend will be gone forever.');
         if (confirmed) {
            this.deleteFriend(this.friend.id);
            this.handleReturn();
         }
      },
   },

   components: { FriendStats, FriendActions, FriendNotes },

   props: {
      handleReturn: Function,
   },
};
</script>

<template>
   <div class="friend">
      <section class="tabs">
         <div
            :class="['tab', { active: view === 'stats', night }]"
            @click="view = 'stats'"
         >
            Stats
         </div>
         <div
            :class="['tab', { active: view === 'abilities', night }]"
            @click="view = 'abilities'"
         >
            Abilities
         </div>
         <div
            :class="['tab', { active: view === 'notes', night }]"
            @click="view = 'notes'"
         >
            Notes
         </div>
      </section>

      <FriendStats
         v-if="view === 'stats'"
         :friend="friend"
         :night="night"
         :handleDelete="removeFriend"
      />
      <FriendActions v-else-if="view === 'abilities'" :friend="friend" :night="night" />
      <FriendNotes v-else-if="view === 'notes'" :friend="friend" :night="night" />
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.friend {
   width: 100%;
}

.tabs {
   height: 30px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   margin-top: 10px;
   margin-bottom: 20px;
   border-bottom: 1px solid $grey;
   font-size: 14px;
   & .tab {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px 3px 0px 0px;
      &.active {
         background: #0002;
         &.night { background: #fff2; }
      }
   }
}
</style>
