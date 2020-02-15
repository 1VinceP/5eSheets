<script>
import { mapMutations } from 'vuex';
import { Input } from '@/components/common';

export default {
   name: 'friend-notes',

   methods: {
      ...mapMutations('character', ['editFriend']),
   },

   components: { Input },

   props: {
      friend: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="notes">
      <Input
         textarea
         autocomplete="off"
         name="notes"
         height="600px"
         placeholder="Notes"
         :night="night"
         :value="friend.notes"
         @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
      />
   </div>
</template>
