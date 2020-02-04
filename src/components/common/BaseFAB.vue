<script>
import { Button } from '@/components/common';

export default {
   name: 'floating-action-button',
   data: () => ({
      open: false,
   }),

   computed: {
      calcHeight() {
         return this.open ? `${this.items.length * 56}px` : '0px';
      },
   },

   methods: {
      handleItemClick(action) {
         action();
         this.open = false;
      },
   },

   components: { Button },

   props: {
      items: { type: Array, default: () => [] },
   },
};
</script>

<template>
   <div class="container">
      <div :class="['list', { open }]" :style="{ height: calcHeight }">
         <button
            v-for="i in items"
            :key="i.title"
            class="list-item"
            @click="handleItemClick(i.action)"
            :style="{ background: i.bg || '#323231aa' }"
         >
            <component :is="i.icon" />
            <span class="item-title">
               <div>{{ i.title }}</div>
            </span>
         </button>
      </div>

      <Button style="outline: none;" primary round @click="open = !open">
         <div :class="{ open }" id="hamburger-menu">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
         </div>
      </Button>
   </div>
</template>

<style lang="scss" scoped>
.container {
   display: flex;
   flex-direction: column;
   align-items: center;
   position: fixed;
   bottom: 20px;
   right: 20px;

   & .list {
      height: 0px;
      width: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      visibility: hidden;
      opacity: 0;
      transition: .15s all ease-in-out;
      &.open {
         height: 120px;
         opacity: 1;
         visibility: visible;
      }

      & .list-item {
         height: 40px;
         width: 40px;
         display: flex;
         justify-content: center;
         align-items: center;
         position: relative;
         border: 1px solid #fff;
         border-radius: 50%;
         margin-bottom: 16px;
         padding-top: 5px;
         color: #fff;
         cursor: pointer;

         & .item-title {
            width: 1px;
            display: flex;
            justify-content: flex-end;
            position: absolute;
            left: -10px;
            & div {
               background: #fff;
               padding: 3px 12px;
               border: 1px solid #323231;
               border-radius: 3px;
               color: #000;
               white-space: nowrap;
            }
         }
      }
   }

   #hamburger-menu {
      height: 100%;
      width: 100%;
      margin-top: -20px;
      position: relative;
      right: 10%;
      & span {
         height: 4px;
         width: 80%;
         background: #fff;
         display: block;
         position: absolute;
         opacity: 1;
         -webkit-transform: rotate(0deg);
         -moz-transform: rotate(0deg);
         -o-transform: rotate(0deg);
         transform: rotate(0deg);
         -webkit-transition: .25s ease-in-out;
         -moz-transition: .25s ease-in-out;
         -o-transition: .25s ease-in-out;
         transition: .25s ease-in-out;
         &:nth-child(even) {
            left: 50%;
            border-radius: 0 9px 9px 0;
         }
         &:nth-child(odd) {
            left: 0px;
            border-radius: 9px 0 0 9px;
         }
         &:nth-child(1), &:nth-child(2) { top: 0px; }
         &:nth-child(3), &:nth-child(4) { top: 9px; }
         &:nth-child(5), &:nth-child(6) { top: 18px; }
      }
      &.open :nth-child(1), &.open :nth-child(6) {
         -webkit-transform: rotate(45deg);
         -moz-transform: rotate(45deg);
         -o-transform: rotate(45deg);
         transform: rotate(45deg);
      }
      &.open :nth-child(2), &.open :nth-child(5) {
         -webkit-transform: rotate(-45deg);
         -moz-transform: rotate(-45deg);
         -o-transform: rotate(-45deg);
         transform: rotate(-45deg);
      }
      &.open :nth-child(1) { top: 5px; left: 0px; }
      &.open :nth-child(2) { top: 5px; left: calc(100% - 12px); }
      &.open :nth-child(3) { left: -50%; opacity: 0; }
      &.open :nth-child(4) { left: 100%; opacity: 0; }
      &.open :nth-child(5) { top: 13px; left: 0px; }
      &.open :nth-child(6) { top: 13px; left: calc(100% - 12px); }
   }
}
</style>
