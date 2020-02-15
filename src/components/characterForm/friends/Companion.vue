<script>
export default {
   name: 'companion',

   computed: {},

   methods: {
      calcMod(score) {
         return Math.floor((Number(score) - 10) / 2);
      },

      display(score) {
         return `${score} (${this.calcMod(score)})`;
      },

      handleNav() {
         const { id } = this.companion;
         this.$router.push(`/characters/manage/friend?id=${id}&prev=friends`);
      },
   },

   props: {
      companion: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div :class="['companion', { night }]" @click="handleNav">
      <div class="title">
         <div v-if="companion.nickname" class="name">
            {{ companion.nickname }} <div class="subname">({{ companion.title }})</div>
         </div>
         <div v-else class="name">{{ companion.title }}</div>
         <div class="details">
            <div class="ac">AC {{ companion.ac }}</div>
            <div>{{ companion.hp }}/{{ companion.maxHp }} HP</div>
         </div>
      </div>
      <div class="stats">
         <section class="labels group">
            <span>STR</span>
            <span>DEX</span>
            <span>CON</span>
            <span>INT</span>
            <span>WIS</span>
            <span>CHA</span>
         </section>
         <section class="ability-scores group">
            <span>{{ display(companion.abilityScores.str) }}</span>
            <span>{{ display(companion.abilityScores.dex) }}</span>
            <span>{{ display(companion.abilityScores.con) }}</span>
            <span>{{ display(companion.abilityScores.int) }}</span>
            <span>{{ display(companion.abilityScores.wis) }}</span>
            <span>{{ display(companion.abilityScores.cha) }}</span>
         </section>
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.companion {
   width: 100%;
   display: flex;
   flex-direction: column;
   border: 1px solid $navy;
   border-radius: 3px;
   margin-top: 16px;
   padding: 6px 0px;
   color: $navy;
   &.night {
      background: #8883;
      border-color: $grey;
      color: #eee;
   }
}

.title {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 8px;
   padding: 0 6px;
   & .name {
      max-width: 50%;
      display: flex;
      align-items: center;
      font-size: 18px;
      white-space: nowrap;
      overflow-x: scroll;
      & .subname {
         margin-left: 10px;
         font-size: 14px;
      }
   }
   & .details {
      max-width: 50%;
      display: flex;
      align-items: center;
      font-size: 14px;
      white-space: nowrap;
      overflow-x: scroll;
      & .ac { margin-right: 10px; }
   }
}

.stats {
   width: 100%;
   display: flex;
   flex-direction: column;
   font-size: 12px;
   & .labels { margin-bottom: 3px; }
   & .group {
      width: 100%;
      display: flex;
      justify-content: space-between;
      & span {
         width: calc(100% / 6);
         display: flex;
         justify-content: center;
         align-items: center;
      }
   }
}
</style>
