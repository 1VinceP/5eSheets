<script>
export default {
   name: 'counter',

   props: {
      name: String,
      value: [String, Number],
      min: [String, Number],
      max: [String, Number],
      label: String,
      disableDecrease: { type: Boolean, default: false },
      disableIncrease: { type: Boolean, default: false },
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
      <div class="display">
         <input
            v-if="value >= 0"
            class="input"
            :min="min"
            :max="max"
            :name="name"
            :value="value"
            @input="$emit('input', $event.target.value, $event.target.name)"
         />
         <div :class="['label', { full: !(value >= 0) }]">
            {{ label }}
         </div>
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
@import '../../_a-variables.scss';

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
      color: #fff;

      & .input {
         height: 100%;
         width: 50%;
         background: transparent;
         border: none;
         color: #fff;
         text-align: right;
         font-size: 16px;
      }

      & .label {
         width: 50%;
         text-align: left;
         &.full {
            width: 100%;
            text-align: center;
         }
      }
   }
}
</style>
