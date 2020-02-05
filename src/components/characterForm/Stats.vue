<script>
import { mapMutations } from 'vuex';
import map from 'lodash/map';
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

      hitDiceArray() {
         return map(this.character.hitDice);
      },
   },

   created() {
      if (localStorage.getItem('skillSort')) {
         const sort = JSON.parse(localStorage.getItem('skillSort'));
         this.sort = sort;
      }
   },

   methods: {
      ...mapMutations(
         'character',
         ['editProp', 'editHitDie', 'editClassProp', 'addClass', 'removeClass'],
      ),

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      editClass(value, prop, type) {
         const index = prop.split('-')[1];
         this.editClassProp({ prop: type, value, index });
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

      <div v-if="hitDiceArray.some(hd => hd.max > 0)" class="hd-label">Hit Dice</div>
      <div class="hd-container">
         <div v-for="(dieSet, i) in hitDiceArray" :key="`hitdie-${i}`" class="hit-die">
            <Counter
               v-if="dieSet.max > 0"
               :key="i"
               :name="dieSet.dieValue.toString()"
               :value="dieSet.current"
               min="0"
               :label="`d${dieSet.dieValue}`"
               :disableDecrease="dieSet.current === 0"
               :disableIncrease="dieSet.current >= dieSet.max"
               @onDecrease="editHitDie({ direction: 'decrease', dieValue: dieSet.dieValue })"
               @onIncrease="editHitDie({ direction: 'increase', dieValue: dieSet.dieValue })"
            />
         </div>
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
            label="Level"
            type="number"
            min="0"
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
      <Counter
         label="Multiclass"
         :disableDecrease="character.classes.length <= 1"
         @onDecrease="removeClass"
         @onIncrease="addClass"
      />

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

.hd-label {
   width: 100%;
   margin-bottom: 6px;
   font-size: 14px;
   color: $grey;
}
.hd-container {
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   & .hit-die {
      width: 47%;
      margin-bottom: 6px;
   }
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
      &.label { background: #0004; }
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
      justify-content: space-between;
      align-items: center;
   }
}

.skills {
   width: 100%;
   margin-top: 30px;
}
</style>
