<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import { Button, Input, Select, Entry } from '@/components/common';

export default {
   name: 'manage-gear',

   data: () => ({
      valueTypes: ['cp', 'sp', 'gp', 'pp'],
   }),

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['equipment']),

      item() {
         // item id, not character id
         const { id } = this.$route.query;
         const item = this.equipment.find(e => e.id === id);
         return item;
      },
   },

   methods: {
      ...mapMutations('character', ['removeItem', 'editItem']),

      handleDelete() {
         const confirmed = window.confirm('Your item will be gone forever.');
         if (confirmed) {
            const { id } = this.$route.query;
            this.handleReturn();
            this.removeItem({ id });
         }
      },
   },

   components: { Button, Input, Select, Entry },

   props: {
      handleReturn: Function,
   },
};
</script>

<template>
   <div class="gear">
      <Entry
         height="400px"
         contentPlaceholder="Details"
         :entry="item"
         :night="night"
         @titleInput="value => editItem({ name: 'title', value, id: item.id })"
         @contentInput="value => editItem({ name: 'content', value, id: item.id })"
      />

      <div class="inputs">
         <Input
            autocomplete="off"
            class="input"
            name="quantity"
            label="Quantity"
            type="number"
            min="0"
            :value="item.quantity"
            :night="night"
            @input="value => editItem({ name: 'quantity', value: Number(value), id: item.id })"
         />
         <Input
            autocomplete="off"
            class="input"
            name="weight"
            label="Weight"
            type="number"
            min="0"
            :value="item.weight"
            :night="night"
            @input="value => editItem({ name: 'weight', value: Number(value), id: item.id })"
         />
      </div>

      <div class="inputs">
         <Input
            autocomplete="off"
            class="input"
            name="value"
            label="Value"
            type="number"
            min="0"
            :value="item.value"
            :night="night"
            @input="value => editItem({ name: 'value', value: Number(value), id: item.id })"
         />
         <Select
            autocomplete="off"
            class="input"
            name="valueType"
            label="Value Type"
            :value="item.valueType"
            :night="night"
            :options="valueTypes"
            @change="value => editItem({ name: 'valueType', value, id: item.id })"
         />
      </div>

      <Button class="delete" red full @click="handleDelete">Remove</Button>
   </div>
</template>

<style lang="scss" scoped>
.gear { width: 100%; }

.inputs {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   & .input { width: 48%; }
}

.delete { margin-top: 10px; }
</style>
