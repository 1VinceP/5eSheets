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

      handleButton() {
         this.$emit('button', { title: this.entry.title, content: this.entry.content });
      },
   },

   props: {
      buttonLabel: String,
      titlePlaceholder: { type: String, default: 'Title' },
      contentPlaceholder: { type: String, default: 'Content' },
      height: { type: String, default: '400px' },
      entry: Object,
      autofocus: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
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
         :buttonLabel="buttonLabel"
         :placeholder="titlePlaceholder"
         :inputStyle="{ paddingLeft: '8px' }"
         :value="entry.title"
         :disabled="disabled"
         :night="night"
         @input="handleTitle"
         @button="handleButton"
      />
      <Input
         textarea
         autocomplete="off"
         class="entry-content"
         :placeholder="contentPlaceholder"
         :value="entry.content"
         :height="height"
         :disabled="disabled"
         :night="night"
         @input="handleContent"
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
