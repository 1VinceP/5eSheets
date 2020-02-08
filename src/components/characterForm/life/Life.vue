<script>
import { mapMutations, mapGetters } from 'vuex';
import moment from 'moment';
import { Input, Select } from '@/components/common';
import AlignmentRadio from './AlignmentRadio.vue';
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

   computed: {
      ...mapGetters(['night']),
   },

   methods: {
      ...mapMutations('character', ['editProp']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },
   },

   components: { Input, Select, AlignmentRadio },

   props: {
      character: { type: Object },
   },
};
</script>

<template>
   <div class="life">
      <Input
         autocomplete="off"
         name="playerName"
         label="Player Name"
         :value="character.playerName"
         @input="editField"
         :night="night"
      />

      <Input
         autocomplete="off"
         name="xp"
         label="Experience Points"
         type="number"
         :value="character.xp"
         @input="(value, name) => editField(Number(value), name)"
         :night="night"
      />

      <Select
         name="background"
         label="Background"
         :value="character.background"
         :options="backgroundList"
         optionKey="name"
         @change="editField"
         :night="night"
      />

      <section class="alignment">
         <span>Alignment</span>
         <div class="alignment-grid">
            <!-- top row -->
            <div class="empty" />
            <div class="box label">L</div>
            <div class="box label">N</div>
            <div class="box label">C</div>
            <!-- second row -->
            <div class="box reverse-label">G</div>
            <AlignmentRadio
               value="LG"
               :checked="character.alignment === 'LG'"
               @change="editField"
               :night="night"
            />
            <AlignmentRadio
               value="NG"
               :checked="character.alignment === 'NG'"
               @change="editField"
               :night="night"
            />
            <AlignmentRadio
               value="CG"
               :checked="character.alignment === 'CG'"
               @change="editField"
               :night="night"
            />
            <!-- thrid row -->
            <div class="box reverse-label">N</div>
            <AlignmentRadio
               value="LN"
               :checked="character.alignment === 'LN'"
               @change="editField"
               :night="night"
            />
            <AlignmentRadio
               value="N"
               :checked="character.alignment === 'N'"
               @change="editField"
               :night="night"
            />
            <AlignmentRadio
               value="CN"
               :checked="character.alignment === 'CN'"
               @change="editField"
               :night="night"
            />
            <!-- last row -->
            <div class="box reverse-label">E</div>
            <AlignmentRadio
               value="LE"
               :checked="character.alignment === 'LE'"
               @change="editField"
               :night="night"
            />
            <AlignmentRadio
               value="NE"
               :checked="character.alignment === 'NE'"
               @change="editField"
               :night="night"
            />
            <AlignmentRadio
               value="CE"
               :checked="character.alignment === 'CE'"
               @change="editField"
               :night="night"
            />
         </div>
      </section>

      <div class="appearance-block">
         <Input
            autocomplete="off"
            name="age"
            label="Age"
            :value="character.age"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
         <Input
            autocomplete="off"
            name="gender"
            label="Gender"
            :value="character.gender"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
      </div>
      <div class="appearance-block">
         <Input
            autocomplete="off"
            name="height"
            label="Height"
            :value="character.height"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
         <Input
            autocomplete="off"
            name="weight"
            label="Weight"
            :value="character.weight"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
      </div>
      <div class="appearance-block">
         <Input
            autocomplete="off"
            name="size"
            label="Size"
            :value="character.size"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
         <Input
            autocomplete="off"
            name="hair"
            label="Hair"
            :value="character.hair"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
      </div>
      <div class="appearance-block">
         <Input
            autocomplete="off"
            name="eyes"
            label="Eyes"
            :value="character.eyes"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
         <Input
            autocomplete="off"
            name="skin"
            label="Skin"
            :value="character.skin"
            @input="editField"
            :night="night"
            style="width: 45%;"
         />
      </div>

      <Input
         autocomplete="off"
         textarea
         name="appearance"
         label="Appearance"
         height="200px"
         :value="character.appearance"
         @input="editField"
         :night="night"
      />
      <Input
         autocomplete="off"
         textarea
         name="personalityTraits"
         label="Personality Traits"
         :value="character.personalityTraits"
         @input="editField"
         :night="night"
      />
      <Input
         autocomplete="off"
         textarea
         name="ideal"
         label="Ideal"
         :value="character.ideal"
         @input="editField"
         :night="night"
      />
      <Input
         autocomplete="off"
         textarea
         name="bond"
         label="Bond"
         :value="character.bond"
         @input="editField"
         :night="night"
      />
      <Input
         autocomplete="off"
         textarea
         name="flaw"
         label="Flaw"
         :value="character.flaw"
         @input="editField"
         :night="night"
      />
      <Input
         autocomplete="off"
         textarea
         name="story"
         label="Story"
         height="400px"
         :value="character.story"
         @input="editField"
         :night="night"
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

   & .alignment {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & .alignment-grid {
         display: grid;
         grid-template-columns: repeat(4, 20px);
         grid-template-rows: repeat(4, 20px);
         margin-top: -5px;
         margin-right: 10px;
         transform: rotate(45deg);

         & .box {
            display: flex;
            justify-content: center;
            align-items: center;
            &.reverse-label { transform: rotate(-90deg); }
         }
      }
   }

   & .appearance-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
   }
}
</style>
