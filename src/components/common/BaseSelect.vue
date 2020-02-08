<script>
export default {
   name: 'base-select',

   computed: {
      formattedOptions() {
         if (typeof this.options[1] === 'string') {
            return this.options;
         }

         if (!this.optionKey) {
            throw new Error('optionKey required when options are objects');
         }
         return this.options.map(option => option[this.optionKey]);
      },
   },

   props: {
      name: String,
      value: String,
      errorMessage: String,
      label: String,
      type: String,
      options: { type: [Array, Object], required: true },
      optionKey: { type: String }, // when options is an object
      required: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      showError: { type: Boolean, default: false },
      isError: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      disableDefault: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div
      :class="[
         'select-container',
         {
            hasLabel: !!label,
            hasError: showError || isError,
            disabled,
            night,
         },
      ]"
   >
      <div v-show="label" :class="['label', { required, night }]">{{ label }}</div>

      <select
         :name="name"
         :value="value"
         :class="{ night }"
         :disabled="disabled"
         @change="$emit('change', $event.target.value, $event.target.name)"
      >
         <option
            v-show="!disableDefault"
            value=""
            :class="{ night }"
         >
            Select
         </option>
         <option
            v-for="o in formattedOptions"
            :key="o"
            :class="{ night }"
            :value="o"
         >
            {{ o }}
         </option>
      </select>

      <div v-show="(showError || isError) && !readonly" class="errorMessage">
         {{ errorMessage }}
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '../../_a-variables.scss';

.select-container {
   height: 40px;
   width: 400px;
   max-width: 100%;
   display: flex;
   align-items: center;
   position: relative;
   border: 1px solid $grey;
   border-radius: 50px;
   margin: 20px 0;
   padding: 6px 16px;
   &.hasLabel {
      border-top-left-radius: 0;
      margin-top: 30px;
   }
   &.hasError {
      border: 1px solid $red;
      border-bottom-left-radius: 0;
      margin-bottom: 30px;
   }
   &.hasLabel.hasError { border-radius: 0 20px; }
   &.textarea.hasLabel.hasError { border-radius: 0 10px; }
   &.disabled {
      background: $grey-disabled;
      &.night {
         background: #fff3;
      }
   }
   &.green:focus-within { border: 1px solid $green; }
   &.orange:focus-within { border: 1px solid $orange; }
   &.red:focus-within { border: 2px solid $red; }
   &.night:focus-within { border: 1px solid $blue; }
   &:focus-within { border: 1px solid $blue; }

   & select {
      height: 100%;
      width: 100%;
      background: transparent;
      border: none;
      font-size: 16px;
      outline: none;
      &.night {
         color: #fff;
      }
      & option {
         &.night {
            background: #323231;
            color: #fff;
         }
      }
   }

   & .label {
      display: flex;
      align-items: center;
      position: absolute;
      top: -20px;
      left: 0px;
      font-size: 14px;
      color: $navy;
      &.required::after {
         content: "*";
         margin-left: 2px;
         color: $red;
      }
      &.night { color: $grey; }
   }

   & .errorMessage {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      right: 0px;
      bottom: -20px;
      color: $red;
      font-size: 13px;
   }
}
</style>
