<script>
import { mapMutations } from 'vuex';
import { Input, Select } from '@/components/common';
import AbilityBox from '@/components/characterForm/AbilityBox.vue';
import Skill from '@/components/characterForm/Skill.vue';
import Counter from '@/components/characterForm/Counter.vue';
import classList from '@/constants/classes.constants';
// import subclassList from
import raceList from '@/constants/races.constants';
import { skillArray } from '@/constants/skills.constants';

export default {
   name: 'stats',

   data: () => ({
      classList,
      raceList,
      skillArray,
      sort: 'skill',
   }),

   computed: {
      sortedSkills() {
         if (this.sort === 'skill') {
            const newSkills = [...skillArray];
            return newSkills.sort((a, b) => {
               if (a.label < b.label) return -1;
               if (a.label > b.label) return 1;
               return 0;
            });
         }

         return skillArray;
      },
   },

   created() {
      if (localStorage.getItem('skillSort')) {
         const sort = JSON.parse(localStorage.getItem('skillSort'));
         this.sort = sort;
      }
   },

   methods: {
      ...mapMutations('character', ['editProp', 'editClassProp', 'addClass', 'removeClass']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      editClass(value, prop, type) {
         const index = prop.split('-')[1];
         this.editClassProp({ prop: type, value, index });
      },

      calculateHitDice() {
         const dice = [];
         const { hitDice } = this.character;
         hitDice.forEach(die => {
            const index = dice.findIndex(d => d.dieValue === die.dieValue);
            if (index >= 0) {
               dice[index].current += Number(die.current);
            } else {
               dice.push({ current: Number(die.current), dieValue: die.dieValue });
            }
         });
         console.log(dice);

         return dice;
      },

      changeSort() {
         if (this.sort === 'skill') {
            this.sort = 'ability';
            localStorage.setItem('skillSort', JSON.stringify('ability'));
         } else {
            this.sort = 'skill';
            localStorage.setItem('skillSort', JSON.stringify('skill'));
         }
      },

      showSubclasses(className, classLevel) {
         if (className && classLevel >= 0) {
            return classLevel >= this.classList.find(c => c.name === className).subclassLevel;
         }

         return false;
      },

      findSubclasses(className) {
         if (className) {
            const { subclasses } = this.classList.find(c => c.name === className);
            return subclasses;
         }

         return [];
      },
   },

   components: {
      Input, Select, AbilityBox, Skill, Counter,
   },

   props: {
      character: { type: Object },
      editing: { type: Boolean, default: true },
   },
};
</script>

<template>
   <div class="stats">
      <Input
         name="name"
         label="Name"
         :value="character.name"
         @input="editField"
         night
      />

      <div v-if="calculateHitDice().length > 0" class="hdLabel">Hit Dice</div>
      <div v-for="(dieSet, i) in calculateHitDice()" :key="`hitdie-${i}`" class="hit-die">
         <Counter
            v-if="dieSet.dieValue"
            :key="i"
            :value="dieSet.current"
            :outOf="`d${dieSet.dieValue}`"
         />
      </div>

      <Select
         name="race"
         label="Race"
         :value="character.race"
         :options="raceList"
         @change="editField"
         night
      />

      <div class="class-select" v-for="(charClass, i) in character.classes" :key="`class-${i}`">
         <Select
            :name="`className-${i}`"
            :value="charClass.name"
            :options="classList"
            optionKey="name"
            mapOptions
            @change="(value, prop) => editClass(value, prop, 'name')"
            label="Class"
            night
            style="width: 45%;"
         />
         <Input
            :name="`classLevel-${i}`"
            :value="charClass.level"
            :disabled="!charClass.name"
            @input="(value, prop) => editClass(value, prop, 'level')"
            type="number"
            label="Level"
            night
            style="width: 45%;"
         />
         <Select
            v-if="showSubclasses(charClass.name, charClass.level)"
            :name="`classSubclass-${i}`"
            :value="charClass.subclass"
            :options="findSubclasses(charClass.name)"
            optionKey="subclasses"
            @change="(value, prop) => editClass(value, prop, 'subclass')"
            label="Subclass"
            night
            style="margin-top: 10px;"
         />
      </div>
      <div class="multiclass-buttons">
         <span
            :class="['remove-class', { disabled: character.classes.length <= 1 }]"
            @click="character.classes.length > 1 && removeClass()"
         >
            -
         </span>
         <span class="label">Multiclass</span>
         <span class="add-class" @click="addClass">+</span>
      </div>

      <section class="abilities">
         <p class="global-tip">
            Tap labels to edit saving proficiencies, and scores to edit scores.
         </p>
         <div class="ability-row">
            <AbilityBox str :ability="character.abilities.str" />
            <AbilityBox dex :ability="character.abilities.dex" />
         </div>
         <div class="ability-row">
            <AbilityBox con :ability="character.abilities.con" />
            <AbilityBox int :ability="character.abilities.int" />
         </div>
         <div class="ability-row">
            <AbilityBox wis :ability="character.abilities.wis" />
            <AbilityBox cha :ability="character.abilities.cha" />
         </div>
      </section>

      <section class="skills">
         <p class="global-tip">
            Left box proficient, right box expertise. Header changes sort.
         </p>
         <div @click="changeSort" >
            <Skill isHeader :sort="sort" />
         </div>
         <Skill
            v-for="skill in sortedSkills"
            :key="skill.label"
            :skill="skill"
            :sort="sort"
         />
      </section>
   </div>
</template>

<style lang="scss" scoped>
@import '../../_a-variables.scss';

.stats {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
}

.hdLabel {
   width: 100%;
   margin-bottom: 6px;
   font-size: 14px;
   color: $grey;
}
.hit-die {
   width: 100%;
   margin-bottom: 6px;
}

.class-select {
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
}

.multiclass-buttons {
   height: 30px;
   width: 100%;
   display: flex;
   & span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      &.remove-class {
         background: $red;
         &.disabled { background: $grey; }
      }
      &.add-class { background: $green; }
   }
}

.abilities {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 30px;
   & .ability-row {
      width: 100%;
      display: flex;
      align-items: center;
   }
}

.skills {
   width: 100%;
   margin-top: 30px;
}
</style>
