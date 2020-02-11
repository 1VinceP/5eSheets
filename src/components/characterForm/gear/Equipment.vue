<script>
import { mapMutations } from 'vuex';
import orderBy from 'lodash/orderBy';
import PlusIcon from 'vue-material-design-icons/PlusCircleOutline.vue';
import MinusIcon from 'vue-material-design-icons/MinusCircleOutline.vue';
import { Modal } from '@/components/common';
import Entry from '../Entry.vue';

export default {
   name: 'equipment',

   data() {
      return {
         sort: 'title',
         sortDir: 'asc',
         sortLoc: 'donned',
         modalOpen: false,
         currentItem: {},
      };
   },

   computed: {
      sortedItems() {
         const newSort = this.sort === 'location'
            ? e => e.location === this.sortLoc
            : this.sort;
         return orderBy(this.items, [newSort, 'title'], this.sortDir);
      },
   },

   methods: {
      ...mapMutations('character', ['addItem', 'removeItem', 'editItem']),

      handleSort(sort, location = '') {
         if (sort !== 'location') {
            if (this.sort === sort) {
               if (this.sortDir === 'asc') this.sortDir = 'desc';
               else this.sortDir = 'asc';
            } else {
               this.sort = sort;
               this.sortDir = 'asc';
            }
         } else if (sort === 'location') {
            // boolean values sorted in reverse
            if (this.sortLoc === location) {
               if (this.sort !== 'location') this.sortDir = 'desc';
               else if (this.sortDir === 'desc') this.sortDir = 'asc';
               else this.sortDir = 'desc';
            } else {
               this.sortDir = 'desc';
            }
            this.sort = 'location';
            this.sortLoc = location;
         }
      },

      handleInput(e, id) {
         const { name, value } = e.target;
         this.editItem({ name, value, id });
      },

      handleNumericInput(e, id) {
         const { name, value } = e.target;
         this.editItem({ name, value: Number(value), id });
      },

      setItem(item) {
         this.modalOpen = true;
         this.currentItem = item;
      },

      updateItem() {
         const { title, content, id } = this.currentItem;
         this.editItem({ name: 'title', value: title, id });
         this.editItem({ name: 'content', value: content, id });
         this.modalOpen = false;
         this.currentItem = {};
      },

      closeModal() {
         this.modalOpen = false;
         this.currentItem = {};
      },
   },

   components: { PlusIcon, MinusIcon, Modal, Entry },

   props: {
      items: Array,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="equipment">
      <div :class="['global-tip', { night }]">
         [D]onned, [B]ackpack, [P]ocket/pouch, [V]ehicle/creature
      </div>
      <span :class="['item', 'header', { night }]">
         <div class="container remove" />
         <div
            :class="['container', 'title', { sorted: sort === 'title' }]"
            @click="handleSort('title')"
         >
            Item
         </div>
         <div
            :class="['container', 'quantity', { sorted: sort === 'quantity' }]"
            @click="handleSort('quantity')"
         >
            Qty
         </div>
         <div
            :class="['container', 'weight', { sorted: sort === 'weight' }]"
            @click="handleSort('weight')"
         >
            lbs
         </div>
         <div
            :class="['container', { sorted: sort === 'location' && sortLoc === 'donned' }]"
            @click="handleSort('location', 'donned')"
         >
            D
         </div>
         <div
            :class="['container', { sorted: sort === 'location' && sortLoc === 'backpack' }]"
            @click="handleSort('location', 'backpack')"
         >
            B
         </div>
         <div
            :class="['container', { sorted: sort === 'location' && sortLoc === 'pocket' }]"
            @click="handleSort('location', 'pocket')"
         >
            P
         </div>
         <div
            :class="['container', { sorted: sort === 'location' && sortLoc === 'vehicle' }]"
            @click="handleSort('location', 'vehicle')"
         >
            V
         </div>
      </span>
      <span
         v-for="(item) in sortedItems"
         :key="item.id"
         :night="night"
         :class="['item', { night }]"
      >
         <div class="container item remove" @click="removeItem({ id: item.id })">
            <MinusIcon :size="12" fillColor="red" />
         </div>
         <div class="container data title" @click="setItem(item)">
            {{ item.title }}
         </div>
         <input
            autocomplete="off"
            name="quantity"
            class="container data quantity"
            min="0"
            max="9999"
            type="number"
            :value="item.quantity"
            @input="e => handleNumericInput(e, item.id)"
         />
         <input
            autocomplete="off"
            name="weight"
            class="container data weight"
            min="0"
            max="9999"
            type="number"
            :value="item.weight"
            @input="e => handleNumericInput(e, item.id)"
         />
         <div class="container data donned">
            <input
               type="checkbox"
               name="location"
               :disabled="!item.title"
               :checked="item.location === 'donned'"
               @input="handleInput({ target: { name: 'location', value: 'donned' } }, item.id)"
            />
         </div>
         <div class="container data backpack">
            <input
               type="checkbox"
               name="location"
               :disabled="!item.title"
               :checked="item.location === 'backpack'"
               @input="handleInput({ target: { name: 'location', value: 'backpack' } }, item.id)"
            />
         </div>
         <div class="container data pocket">
            <input
               type="checkbox"
               name="location"
               :disabled="!item.title"
               :checked="item.location === 'pocket'"
               @input="handleInput({ target: { name: 'location', value: 'pocket' } }, item.id)"
            />
         </div>
         <div class="container data vehicle">
            <input
               type="checkbox"
               name="location"
               :disabled="!item.title"
               :checked="item.location === 'vehicle'"
               @input="handleInput({ target: { name: 'location', value: 'vehicle' } }, item.id)"
            />
         </div>
      </span>
      <div class="add-button">
         <PlusIcon @click="addItem" :size="18" />
      </div>

      <Modal
         :show="modalOpen"
         :title="currentItem.title || 'New Item'"
         primaryLabel="Update"
         secondaryLabel="Cancel"
         @primary="updateItem"
         @secondary="closeModal"
         top
         :night="night"
      >
         <Entry
            :entry="currentItem"
            @titleInput="value => currentItem.title = value"
            @contentInput="value => currentItem.content = value"
            :night="night"
         />
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.equipment {
   width: 100%;
   display: flex;
   flex-direction: column;
   margin-top: 40px;

   & .item {
      height: 30px;
      width: 100%;
      display: grid;
      grid-template-columns: 7.5% 42.5% 10% 10% 7.5% 7.5% 7.5% 7.5%;
      border: none;
      color: $navy;
      &:not(:last-child) { border-bottom: 1px solid $blue; }
      &.night > * { color: #eee; }
      &.header {
         border-bottom: 2px solid $grey;
         font-size: 12px;
         margin-top: 3px;
      }

      & .container, & .container > input {
         border: none;
      }
      & .container {
         height: 100%;
         width: 100%;
         background: transparent;
         display: flex;
         justify-content: center;
         align-items: center;
         padding: 3px;
         &.title {
            justify-content: flex-start;
            white-space: nowrap;
            overflow-x: scroll;
            &.data { font-size: 10px; }
         }
         &.quantity, &.weight { text-align: center; }
         &.remove, &.title, &.quantity, &.weight { border-right: 1px solid $grey; }
         &.sorted { color: $green; }
      }
   }

   & .add-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 6px;
      padding-right: 4px;
   }
}
</style>
