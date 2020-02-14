<script>
import Input from './BaseInput.vue';

export default {
   name: 'entry',

   components: { Input },

   methods: {
      handleTitle(value) {
         this.$emit('titleInput', value);
      },

      handleContent(value) {
         this.$emit('contentInput', value);
      },
   },

   props: {
      titlePlaceholder: { type: String, default: 'Title' },
      contentPlaceholder: { type: String, default: 'Content' },
      height: { type: String, default: '400px' },
      entry: Object,
      autofocus: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="entry">
      <Input
         :autofocus="autofocus"
         autocomplete="off"
         class="entry-title"
         :placeholder="titlePlaceholder"
         :inputStyle="{ paddingLeft: '8px' }"
         :value="entry.title"
         @input="handleTitle"
         :night="night"
      />
      <Input
         textarea
         autocomplete="off"
         class="entry-content"
         :placeholder="contentPlaceholder"
         :value="entry.content"
         @input="handleContent"
         :height="height"
         :night="night"
      />
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.entry {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   & .entry-title {
      border-bottom: none;
      border-radius: 10px 10px 0px 0px;
   }

   & .entry-content {
      margin-top: -20px;
      margin-bottom: 10px;
      border-radius: 0px 0px 10px 10px !important; // override common componentStyles
   }

   & .tags {
      width: 100%;
      display: flex;
      & .tag {
         background: #323231;
         border-radius: 3px;
         margin-right: 6px;
         margin-bottom: 3px;
         padding: 3px 6px;
         color: $blue;
         font-size: 13px;
      }
   }
}
</style>
