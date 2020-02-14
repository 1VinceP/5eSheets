<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import { Button, Entry, Input } from '@/components/common';

export default {
   name: 'spell-manager',

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['spellsList']),

      spell() {
         const { level, id } = this.$route.query;
         const spell = this.spellsList[level].spells.find(s => s.id === id);
         return spell;
      },

      info() {
         const { level, id } = this.$route.query;
         return { level, id };
      },
   },

   methods: {
      ...mapMutations('character', ['deleteSpell', 'editSpell']),

      handleDelete() {
         const confirmed = window.confirm('Your spell will be gone forever.');
         if (confirmed) {
            const { level, id } = this.$route.query;
            this.handleReturn();
            this.deleteSpell({ level, id });
         }
      },
   },

   components: { Button, Entry, Input },

   props: {
      handleReturn: Function,
   },
};
</script>

<template>
   <div class="spell">
      <Entry
         height="200px"
         :entry="spell"
         :night="night"
         @titleInput="value => editSpell({ ...info, prop: 'title', value })"
         @contentInput="value => editSpell({ ...info, prop: 'content', value })"
      />

      <section class="components">
         <div class="component">
            <span>Prepared</span>
            <input
               type="checkbox"
               :checked="spell.prepared"
               @change="editSpell({ ...info, prop: 'prepared', value: !spell.prepared })"
            />
         </div>
         <div class="component">
            <span>Concentration</span>
            <input
               type="checkbox"
               :checked="spell.conc"
               @change="editSpell({ ...info, prop: 'conc', value: !spell.conc })"
            />
         </div>
         <div class="component">
            <span>Ritual</span>
            <input
               type="checkbox"
               :checked="spell.ritual"
               @change="editSpell({ ...info, prop: 'ritual', value: !spell.ritual })"
            />
         </div>
      </section>

      <div class="inputs">
         <Input
            autocomplete="off"
            class="input"
            name="time"
            label="Casting Time"
            placeholder="1A, 10m, etc."
            :value="spell.time"
            :night="night"
            @input="(value, prop) => editSpell({ ...info, prop, value })"
         />
         <Input
            autocomplete="off"
            class="input"
            name="range"
            label="Range"
            :value="spell.range"
            :night="night"
            @input="(value, prop) => editSpell({ ...info, prop, value })"
         />
      </div>
      <Input
         autocomplete="off"
         name="duration"
         label="Duration"
         :value="spell.duration"
         :night="night"
         @input="(value, prop) => editSpell({ ...info, prop, value })"
      />

      <section class="components">
         <div class="component">
            <span>Verbal</span>
            <input
               type="checkbox"
               :checked="spell.verbal"
               @change="editSpell({ ...info, prop: 'verbal', value: !spell.verbal })"
            />
         </div>
         <div class="component">
            <span>Somatic</span>
            <input
               type="checkbox"
               :checked="spell.somatic"
               @change="editSpell({ ...info, prop: 'somatic', value: !spell.somatic })"
            />
         </div>
         <div class="component">
            <span>Material</span>
            <input
               type="checkbox"
               :checked="spell.material"
               @change="editSpell({ ...info, prop: 'material', value: !spell.material })"
            />
         </div>
         <Input
            autocomplete="off"
            name="materialComponents"
            label="Material Components"
            :value="spell.materialComponents"
            :night="night"
            :disabled="!spell.material"
            @change="(value, prop) => editSpell({ ...info, prop, value })"
         />
      </section>

      <Button class="delete" red full @click="handleDelete">Remove</Button>
   </div>
</template>

<style lang="scss" scoped>
.spell {
   width: 100%;
}

.prepared {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.inputs {
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   & .input { width: 48%; }
}

.components {
   width: 100%;
   & .component {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
   }
}

.delete { margin-top: 10px; }
</style>
