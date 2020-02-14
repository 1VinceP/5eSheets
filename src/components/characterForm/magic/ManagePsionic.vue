<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import { Button, Entry, Input, Select } from '@/components/common';

export default {
   name: 'manage-psionic',

   data: () => ({
      orders: [
         'Avatar',
         'Awakened',
         'Immortal',
         'Nomad',
         'Wu Jen',
      ],
   }),

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['psiTalents', 'psiDisciplines']),

      psionic() {
         const { id, psiType } = this.$route.query;
         const psionics = this[psiType];
         const psionic = psionics.find(p => p.id === id);
         return psionic;
      },

      info() {
         const { id, psiType } = this.$route.query;
         return { id, psiType };
      },
   },

   methods: {
      ...mapMutations('character', ['removePsionic', 'editPsionic']),

      handleDelete() {
         const confirmed = window.confirm('Your psionic ability will be gone forever.');
         if (confirmed) {
            const { id, psiType } = this.$route.query;
            this.handleReturn();
            this.removePsionic({ psiType, id });
         }
      },
   },

   components: { Button, Entry, Input, Select },

   props: {
      handleReturn: Function,
   },
};
</script>

<template>
   <div class="psionic">
      <Entry
         height="400px"
         :entry="psionic"
         :night="night"
         @titleInput="value => editPsionic({ ...info, prop: 'title', value,})"
         @contentInput="value => editPsionic({ ...info, prop: 'content', value,})"
      />
      <div v-show="$route.query.psiType === 'psiDisciplines'" class="discipline-features">
         <Select
            class="select"
            name="order"
            label="Order"
            :options="orders"
            :value="psionic.order"
            :night="night"
            @change="value => editPsionic({ ...info, prop: 'order', value })"
         />
         <Input
            textarea
            autocomplete="off"
            height="100px"
            name="focus"
            label="Focus Details"
            :value="psionic.focus"
            :night="night"
            @input="value => editPsionic({ ...info, prop: 'focus', value,})"
         />
      </div>

      <Button class="delete" red full @click="handleDelete">Remove</Button>
   </div>
</template>

<style lang="scss" scoped>
.psionic {
   width: 100%;
}

.discipline-features {
   width: 100%;
   & .select {
      margin-bottom: 40px;
   }
}

.delete { margin-top: 10px; }
</style>
