<script>
import { mapMutations } from 'vuex';

export default {
   name: 'spell',

   methods: {
      ...mapMutations('character', ['deleteSpell', 'editSpell']),

      manageSpell() {
         const { id } = this.spell;
         this.$router.push(`/characters/manage/spell?id=${id}&level=${this.spellLevel}&prev=magic`);
      },
   },

   props: {
      spellLevel: Number,
      spell: Object,
      isHeader: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div>
      <div v-if="isHeader" :class="['spell', 'head', { night }]">
         <div class="col">P.</div>
         <div class="col title">Name</div>
         <div class="col">Time</div>
         <div class="col">C.</div>
         <div class="col">Range</div>
      </div>
      <div v-else :class="['spell', { ritual: spell.ritual }]">
         <div class="col">
            <input
               class="check"
               type="checkbox"
               :checked="spell.prepared"
               @input="editSpell({
                  level: spellLevel,
                  id: spell.id,
                  prop: 'prepared',
                  value: !spell.prepared,
               })"
            />
         </div>
         <div class="col title" @click="manageSpell">{{ spell.title }}</div>
         <div class="col" @click="manageSpell">{{ spell.time }}</div>
         <div class="col" @click="manageSpell">{{ spell.conc ? 'x' : '' }}</div>
         <div class="col" @click="manageSpell">{{ spell.range }}</div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.spell {
   height: 30px;
   width: 100%;
   display: grid;
   grid-template-columns: 7.5% 50% 10% 10% 22.5%;
   border: 1px solid $grey;
   font-size: 10px;
   &:last-child { border-radius: 0px 0px 3px 3px; }
   &.head {
      height: 20px;
      background: #0004;
      border-radius: 3px 3px 0px 0px;
      &.night { background: #9400d344; }
   }
   &.ritual { background: #faa50033; }

   & .col {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      &.title {
         justify-content: flex-start;
         white-space: nowrap;
         overflow-x: scroll;
         padding: 0px 6px;
      }
      &:not(:last-child) {
         border-right: 1px solid $grey;
      }
      & .check {
         margin: 0;
      }
   }
}
</style>
