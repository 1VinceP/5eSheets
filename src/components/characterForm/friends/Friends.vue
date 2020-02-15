<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { Button } from '@/components/common';
import Companion from './Companion.vue';

export default {
   name: 'friends',

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['friends']),
   },

   methods: {
      ...mapMutations('character', ['addFriend']),
   },

   components: { Button, Companion },
};
</script>

<template>
   <div class="friends">
      <Companion
         v-for="friend in friends"
         :key="friend.id"
         :companion="friend"
         :night="night"
      />

      <Button class="delete" green full @click="addFriend">Add Friend</Button>
   </div>
</template>

<style lang="scss" scoped>
.friends {
   width: 100%;
}

.delete { margin-top: 20px; }
</style>
