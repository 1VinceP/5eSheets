<script>
import { mapMutations } from 'vuex';
import { Button, Input } from '@/components/common';
import Counter from '../Counter.vue';

export default {
   name: 'friend-stats',

   methods: {
      ...mapMutations('character', ['editFriend', 'editFriendScore']),
   },

   components: { Counter, Button, Input },

   props: {
      friend: Object,
      handleDelete: Function,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="friend-stats">
      <Input
         autocomplete="off"
         name="title"
         label="Name"
         :value="friend.title"
         :night="night"
         @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
      />
      <Input
         autocomplete="off"
         name="nickname"
         label="Nickname"
         :value="friend.nickname"
         :night="night"
         @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
      />

      <div :class="['section-label', { night }]">HP</div>
      <Counter
         name="hp"
         secondaryName="maxHp"
         label="/"
         min="0"
         :max="friend.maxHp"
         :value="friend.hp"
         :secondaryValue="friend.maxHp"
         :disableDecrease="friend.hp <= 0"
         :disableIncrease="friend.hp >= friend.maxHp"
         @input="(value, prop) => editFriend({ id: friend.id, prop, value: Number(value) })"
         @secondaryInput="(value, prop) => editFriend({
            id: friend.id,
            prop,
            value: Number(value),
         })"
         @onDecrease="editFriend({ id: friend.id, prop: 'hp', value: --friend.hp })"
         @onIncrease="editFriend({ id: friend.id, prop: 'hp', value: ++friend.hp })"
         :night="night"
      />

      <div :class="['section-label', 'margin', { night }]">Temporary HP</div>
      <Counter
         name="tempHp"
         min="0"
         :value="friend.tempHp"
         :disableDecrease="friend.tempHp <= 0"
         @input="(value, prop) => editFriend({ id: friend.id, prop, value: Number(value) })"
         @onDecrease="editFriend({ id: friend.id, prop: 'tempHp', value: --friend.tempHp })"
         @onIncrease="editFriend({ id: friend.id, prop: 'tempHp', value: ++friend.tempHp })"
         :night="night"
      />

      <section class="stats margin">
         <Input
            autocomplete="off"
            class="input-third"
            name="ac"
            label="AC"
            type="number"
            min="0"
            :inputStyle="{ textAlign: 'right' }"
            :night="night"
            :value="friend.ac"
            @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
         />
         <Input
            autocomplete="off"
            class="input-third"
            name="initiative"
            label="Initiative"
            :night="night"
            :value="friend.initiative"
            :inputStyle="{ textAlign: 'right' }"
            @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
         />
         <Input
            autocomplete="off"
            class="input-third"
            name="cr"
            label="CR"
            :night="night"
            :value="friend.cr"
            :inputStyle="{ textAlign: 'right' }"
            @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
         />
      </section>

      <section class="stats margin-reduced">
         <Input
            autocomplete="off"
            class="input-quarter"
            name="walk"
            label="Walk"
            type="number"
            min="0"
            :inputStyle="{ textAlign: 'right' }"
            step="5"
            :night="night"
            :value="friend.walk"
            @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
         />
         <Input
            autocomplete="off"
            class="input-quarter"
            name="climb"
            label="Climb"
            type="number"
            min="0"
            :inputStyle="{ textAlign: 'right' }"
            step="5"
            :night="night"
            :value="friend.climb"
            @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
         />
         <Input
            autocomplete="off"
            class="input-quarter"
            name="fly"
            label="Fly"
            type="number"
            min="0"
            :inputStyle="{ textAlign: 'right' }"
            step="5"
            :night="night"
            :value="friend.fly"
            @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
         />
         <Input
            autocomplete="off"
            class="input-quarter"
            name="swim"
            label="Swim"
            type="number"
            min="0"
            :inputStyle="{ textAlign: 'right' }"
            step="5"
            :night="night"
            :value="friend.swim"
            @input="(value, prop) => editFriend({ id: friend.id, prop, value })"
         />
      </section>

      <section class="stats margin-reduced">
         <Input
            autocomplete="off"
            class="input-third"
            label="Str"
            type="number"
            min="0"
            :value="friend.abilityScores.str"
            :inputStyle="{ textAlign: 'right' }"
            :night="night"
            @input="value => editFriendScore({ id: friend.id, prop: 'str', value })"
         />
         <Input
            autocomplete="off"
            class="input-third"
            label="Dex"
            type="number"
            min="0"
            :value="friend.abilityScores.dex"
            :inputStyle="{ textAlign: 'right' }"
            :night="night"
            @input="value => editFriendScore({ id: friend.id, prop: 'dex', value })"
         />
         <Input
            autocomplete="off"
            class="input-third"
            label="Con"
            type="number"
            min="0"
            :value="friend.abilityScores.con"
            :inputStyle="{ textAlign: 'right' }"
            :night="night"
            @input="value => editFriendScore({ id: friend.id, prop: 'con', value })"
         />
      </section>
      <section class="stats margin-reduced">
         <Input
            autocomplete="off"
            class="input-third"
            label="Int"
            type="number"
            min="0"
            :value="friend.abilityScores.int"
            :inputStyle="{ textAlign: 'right' }"
            :night="night"
            @input="value => editFriendScore({ id: friend.id, prop: 'int', value })"
         />
         <Input
            autocomplete="off"
            class="input-third"
            label="Wis"
            type="number"
            min="0"
            :value="friend.abilityScores.wis"
            :inputStyle="{ textAlign: 'right' }"
            :night="night"
            @input="value => editFriendScore({ id: friend.id, prop: 'wis', value })"
         />
         <Input
            autocomplete="off"
            class="input-third"
            label="Cha"
            type="number"
            min="0"
            :value="friend.abilityScores.cha"
            :inputStyle="{ textAlign: 'right' }"
            :night="night"
            @input="value => editFriendScore({ id: friend.id, prop: 'cha', value })"
         />
      </section>

      <Button red full @click="handleDelete">Remove Friend</Button>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.friend-stats {
   width: 100%;
}

.margin { margin-top: 16px; }
.margin-reduced { margin-top: -10px; }

.section-label {
   width: 100%;
   margin-bottom: 6px;
   font-size: 14px;
   color: $navy;
   &.night { color: $grey; }
}

.stats {
   width: 100%;
   display: flex;
   justify-content: space-between;
   & .input-half { width: 48%; }
   & .input-third { width: 30%; }
   & .input-quarter { width: 22%; }
}
</style>
