<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import startCase from 'lodash/startCase';
import { Input, Button } from '@/components/common';
import Header from '@/components/Header.vue';
import Entry from '../Entry.vue';

export default {
   name: 'manage-action',

   data: () => ({
      weaponProperties: [
         'ammunition',
         'finesse',
         'heavy',
         'light',
         'loading',
         'range',
         'reach',
         'special',
         'thrown',
         'two-handed',
         'versatile',
         'silvered',
      ],
   }),

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['actions', 'bonusActions', 'reactions', 'id']),

      action() {
         const { id, time } = this.$route.query;
         const actions = this[time];
         const action = actions.find(a => a.id === id);
         return action;
      },

      info() {
         const { actionTime, id } = this.action;
         return { actionTime, id };
      },
   },

   methods: {
      ...mapMutations('character', ['editAction', 'removeAction']),

      formatProperty(property) {
         return startCase(property);
      },

      handleProperty({ target: { name } }) {
         const { properties } = this.action;
         const newProperties = [...properties];
         if (!properties.includes(name)) {
            newProperties.push(name);
         } else {
            const index = newProperties.findIndex(p => p === name);
            newProperties.splice(index, 1);
         }
         console.log(properties, newProperties);
         this.editAction({ ...this.info, prop: 'properties', value: newProperties });
      },

      handleDelete() {
         const { actionTime, id } = this.action;
         this.removeAction({ actionTime, id });
         this.handleReturn();
      },

      handleReturn() {
         this.$router.push(`/characters/${this.id}?view=actions`);
      },
   },

   components: { Entry, Header, Input, Button },
};
</script>

<template>
   <div class="global-page action">
      <Header />

      <!-- <span class="delete">
         <Button red sm @click="handleDelete">Delete</Button>
      </span> -->
      <Entry
         height="200px"
         :entry="action"
         :night="night"
         @titleInput="value => editAction({ ...info, prop: 'title', value })"
         @contentInput="value => editAction({ ...info, prop: 'content', value })"
      />
      <div v-show="action.type === 'weapon'" class="handle-proficient">
         <div>Proficient</div>
         <input
            type="checkbox"
            name="proficient"
            :checked="action.proficient"
            @input="value => editAction({
               ...info,
               prop: 'proficient',
               value: !action.proficient,
            })"
         />
      </div>
      <div v-show="action.type === 'weapon'" class="inputs">
         <Input
            class="input"
            label="Damage"
            name="damage"
            :value="action.damage"
            @input="value => editAction({ ...info, prop: 'damage', value })"
            :night="night"
         />
         <Input
            class="input"
            label="Damage Type"
            name="damageType"
            :value="action.damageType"
            @input="value => editAction({ ...info, prop: 'damageType', value })"
            :night="night"
         />
      </div>
      <div v-show="action.type === 'weapon'" class="inputs">
         <Input
            class="input"
            label="Weapon Bonus"
            name="bonus"
            type="number"
            min="0"
            :value="action.inherentBonus"
            @input="value => editAction({
               ...info,
               prop: 'inherentBonus',
               value: Number(value),
            })"
            :night="night"
         />
         <Input
            class="input"
            label="Range"
            name="range"
            :value="action.range"
            @input="value => editAction({ ...info, prop: 'range', value })"
            :night="night"
         />
      </div>
      <div v-if="action.type === 'weapon'" class="properties">
         <div v-for="property in weaponProperties" :key="property" class="property">
            <span>{{ formatProperty(property) }}</span>
            <input
               type="checkbox"
               :name="property"
               :checked="action.properties.includes(property)"
               @input="handleProperty"
            />
         </div>
      </div>
      <Button class="delete" red full @click="handleDelete">Remove</Button>

      <Button class="save-button" green full @click="handleReturn">Return</Button>
   </div>
</template>

<style lang="scss" scoped>
.action {
   padding-bottom: 60px;
}

.inputs {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;

   & .input { width: 48%; }
}

.handle-proficient {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.properties {
   width: 100%;
   & .property {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 6px;
      margin-bottom: 6px;
      &:not(:last-child) { border-bottom: 1px dotted #ccc; }
   }
}

.delete {
   margin-top: 10px;
}

.save-button {
   width: 100vw;
   position: fixed;
   bottom: 0;
   left: 0;
}
</style>
