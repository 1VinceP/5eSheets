<script>
import { mapGetters, mapMutations } from 'vuex';
import startCase from 'lodash/startCase';

export default {
   name: 'action',

   computed: {
      ...mapGetters('character', ['proficiencyBonus']),

      abilityMod() {
         const { str, dex } = this.abilities;
         const isFinesse = this.action.properties.includes('finesse');
         const isRanged = this.action.properties.includes('range');

         if (isRanged) return dex.modifier;

         return isFinesse
            ? dex.modifier >= str.modifier ? dex.modifier : str.modifier
            : str.modifier;
      },

      attackBonus() {
         const profBonus = this.action.proficient ? this.proficiencyBonus : 0;
         const total = 0 + this.abilityMod + profBonus + this.action.hitBonus;
         const symbol = total >= 0 ? '+' : '';
         return `${symbol}${total}`;
      },

      damageBonus() {
         const total = 0 + this.abilityMod + this.action.damageBonus;
         const symbol = total > 0 ? ' + ' : ' - ';
         // convert to positive for display
         const bonus = total < 0 ? total * -1 : total;
         return bonus === 0 ? '' : `${symbol}${bonus}`;
      },

      properties() {
         // spreading to avoid side effects
         return [...this.action.properties].sort().map(p => startCase(p)).join(', ');
      },
   },

   created() {
      if (this.action.type === 'weapon') {
         const { actionTime, id, inherentBonus } = this.action;
         if (this.action.hitBonus === undefined) {
            this.editAction({ actionTime, id, prop: 'hitBonus', value: inherentBonus || 0 });
         }
         if (this.action.damageBonus === undefined) {
            this.editAction({ actionTime, id, prop: 'damageBonus', value: inherentBonus || 0 });
         }
      }
   },

   methods: {
      ...mapMutations('character', ['removeAction', 'editAction']),

      handleNav() {
         const { id, actionTime } = this.action;
         this.$router.push(`/characters/manage/action?id=${id}&time=${actionTime}&prev=actions`);
      },
   },

   props: {
      abilities: Object,
      action: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="action">
      <div v-if="action.type === 'weapon'" class="action-container">
         <section class="content" @click="handleNav">
            <span class="top">
               <div class="col title">{{ action.title }}</div>
               <div class="col">{{ attackBonus }}</div>
               <div class="col">{{ action.damage }}{{ damageBonus }}</div>
               <div class="col">{{ action.damageType }}</div>
            </span>
            <span class="bottom">
               <div class="properties">{{ properties }}</div>
               <div v-show="action.range" class="col range">{{ action.range }}ft.</div>
            </span>
         </section>
      </div>

      <div v-else class="action-container">
         <section class="content" @click="handleNav">
            <span class="top other">
               <div class="col title">{{ action.title }}</div>
            </span>
            <span class="bottom other">
               <div class="properties">{{ action.content }}</div>
            </span>
         </section>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.action {
   width: 100%;

   & .action-container {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      & .content {
         height: 100%;
         width: 100%;
         display: grid;
         grid-template-rows: repeat(2, 1fr);

         & .top {
            width: 100%;
            display: grid;
            grid-template-columns: 47% 13% 20% 20%;
            border-bottom: 1px solid $grey;
            &.other { display: flex; }
         }

         & .bottom {
            width: 100%;
            display: grid;
            grid-template-columns: 77% 23%;
            &.other { grid-template-columns: 100%; }

            & .properties {
               height: 100%;
               width: 100%;
               display: flex;
               align-items: center;
               font-size: 11px;
               font-style: italic;
               white-space: nowrap;
               overflow-x: scroll;
            }
         }

         & .col {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.title {
               justify-content: flex-start;
               padding-right: 3px;
               overflow-x: scroll;
               white-space: nowrap;
            }
            &.range {
               display: flex;
               justify-content: center;
               align-items: center;
               border-left: 1px solid $grey;
            }
         }
      }
   }
}
</style>
