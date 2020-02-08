<script>
export default {
   name: 'alignement-radio',

   props: {
      value: String,
      checked: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="alignment-radio">
      <input
         name="alignment"
         type="radio"
         :class="['radio', { night }]"
         :id="value"
         :value="value"
         :checked="checked"
         @change="$emit('change', value, 'alignment')"
      />
      <label :for="value" />
   </div>
</template>

<style lang="scss" scoped>
.alignment-radio {
   display: flex;
   justify-content: center;
   align-items: center;

   & input {
      visibility: hidden;
      position: absolute;
   }

   & input + label::before {
      height: 12px;
      width: 12px;
      background: #eee;
      content: '';
      display: inline-block;
      vertical-align: baseline;
      border: 1px solid #323231;
      border-radius: 50%;
      &.night { border: 1px solid #eee; }
   }
   & input#LG:checked + label::before { background: #FFD700; }
   & input#NG:checked + label::before { background: #80EB80; }
   & input#CG:checked + label::before { background: #00ffff }
   & input#LN:checked + label::before { background: #FD9235; }
   & input#N:checked + label::before { background: grey; }
   & input#CN:checked + label::before { background: #9400D3; }
   & input#LE:checked + label::before { background: #fA4C69; }
   & input#NE:checked + label::before { background: #BD2635; }
   & input#CE:checked + label::before { background: #800000; }
}
</style>
