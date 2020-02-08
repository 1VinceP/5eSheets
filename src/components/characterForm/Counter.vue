<script>
export default {
   name: 'counter',

   props: {
      name: String,
      value: [Number],
      label: String,
      secondaryName: [String],
      min: [String, Number],
      max: [String, Number],
      secondaryValue: [Number],
      disableDecrease: { type: Boolean, default: false },
      disableIncrease: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="counter">
      <div
         :class="['button down', { disabled: disableDecrease }]"
         @click="!disableDecrease && $emit('onDecrease', name)"
      >
         -
      </div>
      <div :class="['display', { night }]">
         <input
            v-show="value >= 0"
            :class="['input', { full: !label }]"
            type="number"
            :min="min"
            :max="max"
            :name="name"
            :value="value"
            @input="$emit('input', $event.target.value, $event.target.name)"
         />

         <div
            v-show="!!label"
            :class="['label', { full: !(value >= 0), secondary: secondaryValue >= 0 }]"
         >
            {{ label }}
         </div>

         <input
            v-if="secondaryValue >= 0"
            class="secondary-input"
            type="number"
            :name="secondaryName"
            :value="secondaryValue"
            @input="$emit('secondaryInput', $event.target.value, $event.target.name)"
         />
      </div>
      <div
         :class="['button up', { disabled: disableIncrease }]"
         @click="!disableIncrease && $emit('onIncrease', name)"
      >
         +
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.counter {
   height: 30px;
   width: 100%;
   display: flex;
   border-radius: 3px;
   position: relative;

   & .button {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      color: #eee;
      &.down { background: $red; }
      &.up { background: $green; }
      &.disabled { background: $grey; }
   }

   & .display {
      height: 100%;
      flex: 2;
      background: #0004;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $navy;
      & input { color: $navy; }
      &.night, &.night input {
         color: #eee;
      }

      & .input {
         height: 100%;
         width: 50%;
         background: transparent;
         border: none;
         text-align: right;
         font-size: 16px;
      }

      & .label {
         width: 50%;
         text-align: left;
         &.secondary {
            width: 10px;
            text-align: center;
         }
      }

      & .full {
         width: 100%;
         text-align: center;
      }

      & .secondary-input {
         height: 100%;
         width: calc(50% - 10px);
         background: transparent;
         border: none;
         text-align: left;
         font-size: 16px;
      }
   }
}
</style>
