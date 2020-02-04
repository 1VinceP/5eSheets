<script>
export default {
   name: 'counter',

   props: {
      value: [String, Number],
      outOf: String,
   },
};
</script>

<template>
   <div class="counter">
      <div class="button down">-</div>
      <div class="display">
         <input
            class="input"
            :value="value"
         />
         {{ outOf }}
      </div>
      <div class="button up">+</div>
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
         width: 10px;
         background: transparent;
         border: none;
         color: #fff;
         text-align: right;
         font-size: 16px;
      }
   }
}
</style>
