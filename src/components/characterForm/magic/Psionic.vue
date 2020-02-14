<script>
export default {
   name: 'psionic',

   data: () => ({
      modalOpen: false,
   }),

   computed: {
      formattedContent() {
         return this.psionic.content.split('\n').join('<br />');
      },
   },

   methods: {
      managePsionic() {
         const { id } = this.psionic;
         const psiType = this.isTalent ? 'psiTalents' : 'psiDisciplines';
         this.$router.push(`/characters/manage/psionic?id=${id}&psiType=${psiType}&prev=magic`);
      },
   },

   props: {
      psionic: Object,
      isHeader: { type: Boolean, default: false },
      isTalent: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div>
      <div v-if="isHeader" :class="['psionic', 'head', { isTalent, night }]">
         <div class="col" @click="$emit('sort', 'title')">Name</div>
         <div v-show="!isTalent" class="col" @click="$emit('sort', 'order')">Order</div>
      </div>
      <div v-else :class="['psionic', { isTalent }]" @click="managePsionic">
         <div class="col title">{{ psionic.title }}</div>
         <div v-show="!isTalent" class="col">{{ psionic.order }}</div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.psionic {
   min-height: 20px;
   width: 100%;
   display: grid;
   grid-template-columns: 75% 25%;
   border: 1px solid $grey;
   border-top: none;
   font-size: 12px;
   &.head {
      height: 24px;
      background: #0004;
      border-radius: 3px 3px 0px 0px;
      border-top: 1px solid $grey;
      &.night { background: #9400d344; }
   }
   &.isTalent {
      display: flex;
      grid-template-columns: auto;
      justify-content: center;
      align-items: center;
   }

   & .col {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0px 6px;
      &.title { justify-content: flex-start; }
      &:not(:last-child) {
         border-right: 1px solid $grey;
      }
   }
}

.psi-content {
   max-height: 400px;
   width: 100%;
   overflow-y: scroll;
}
</style>
