<script>
import { mapMutations } from 'vuex';
import draggable from 'vuedraggable';
import { Button, Entry } from '@/components/common';

export default {
   name: 'friend-actions',

   computed: {
      abilities: {
         get() {
            return this.friend.abilities;
         },
         set(newList) {
            this.updateFriendAbilitiesOrder({ id: this.friend.id, newList });
         },
      },
   },

   methods: {
      ...mapMutations('character', [
         'addFriendAbility',
         'editFriendAbility',
         'updateFriendAbilitiesOrder',
      ]),

      addAbility() {
         this.addFriendAbility(this.friend.id);
      },
   },

   components: { draggable, Button, Entry },

   props: {
      friend: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="abilities">
      <draggable v-model="abilities" :key="abilities.length" handle="#input-button">
         <Entry
            v-for="ability in abilities"
            :key="ability.id"
            height="60px"
            buttonLabel="Move"
            :entry="ability"
            :night="night"
            @titleInput="value => editFriendAbility({
               id: friend.id,
               abilityId: ability.id,
               prop: 'title',
               value
            })"
            @contentInput="value => editFriendAbility({
               id: friend.id,
               abilityId: ability.id,
               prop: 'content',
               value
            })"
         />
      </draggable>

      <Button class="add-ability" green full @click="addAbility">Add Ability</Button>
   </div>
</template>

<style lang="scss" scoped>
.abilities {
   width: 100%;
}

.add-ability {
   margin-top: 16px;
}
</style>
