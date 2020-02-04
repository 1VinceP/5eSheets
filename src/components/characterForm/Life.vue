<script>
import { mapMutations } from 'vuex';
import moment from 'moment';
import { Input, Select } from '@/components/common';
import backgroundList from '@/constants/backgrounds.constants';

export default {
   name: 'life',

   data() {
      return {
         backgroundList,
         createdOn: moment(this.character.creationDate).format('DD MMM YYYY'),
         editedOn: moment(this.character.lastEdited).format('DD MMM YYYY'),
      };
   },

   methods: {
      ...mapMutations('character', ['editProp']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },
   },

   components: { Input, Select },

   props: {
      character: { type: Object },
      setView: { type: Function },
   },
};
</script>

<template>
   <div class="life">
      <h1 class="name">{{ character.name }}</h1>

      <Select
         name="background"
         label="Background"
         :value="character.background"
         :options="backgroundList"
         optionKey="name"
         @change="editField"
         night
      />

      <div class="appearance-block">
         <Input
            name="age"
            label="Age"
            :value="character.age"
            @input="editField"
            night
            style="width: 45%;"
         />
         <Input
            name="gender"
            label="Gender"
            :value="character.gender"
            @input="editField"
            night
            style="width: 45%;"
         />
      </div>
      <div class="appearance-block">
         <Input
            name="height"
            label="Height"
            :value="character.height"
            @input="editField"
            night
            style="width: 45%;"
         />
         <Input
            name="weight"
            label="Weight"
            :value="character.weight"
            @input="editField"
            night
            style="width: 45%;"
         />
      </div>

      <div class="appearance-block">
         <Input
            name="eyes"
            label="Eyes"
            :value="character.eyes"
            @input="editField"
            night
            style="width: 45%;"
         />
         <Input
            name="skin"
            label="Skin"
            :value="character.skin"
            @input="editField"
            night
            style="width: 45%;"
         />
      </div>

      <Input
         textarea
         name="appearance"
         label="Appearance"
         :value="character.appearance"
         @input="editField"
         night
      />
      <Input
         textarea
         name="personalityTraits"
         label="Personality Traits"
         :value="character.personalityTraits"
         @input="editField"
         night
      />
      <Input
         textarea
         name="ideal"
         label="Ideal"
         :value="character.ideal"
         @input="editField"
         night
      />
      <Input
         textarea
         name="bond"
         label="Bond"
         :value="character.bond"
         @input="editField"
         night
      />
      <Input
         textarea
         name="flaw"
         label="Flaw"
         :value="character.flaw"
         @input="editField"
         night
      />
      <Input
         textarea
         name="story"
         label="Story"
         :value="character.story"
         @input="editField"
         night
      />

      <span v-show="character.creationDate">Created: {{ createdOn }}</span>
      <span v-show="character.lastEdited">Last modified: {{ editedOn }}</span>
   </div>
</template>

<style lang="scss" scoped>
.life {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   & .name { font-size: 24px; }

   & .appearance-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
   }
}
</style>
