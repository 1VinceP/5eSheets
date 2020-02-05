<script>
/* eslint-disable */
import EyeIcon from 'vue-material-design-icons/Eye.vue';
import EyeOffIcon from 'vue-material-design-icons/EyeOff.vue';
import Button from './BaseButton.vue';

export default {
  name: 'base-input',
  data: () => ({
    showError: false,
    maskText: false,
  }),

  computed: {
    computedType() {
      let value = this.type;
      if (this.type === 'password' && this.maskText) value = 'password';
      else if (this.type === 'password' && !this.maskText) value = 'input';

      return value;
    },
  },

  mounted() {
    if (this.type === 'password') this.maskText = true;
    if (this.autofocus) {
      this.$nextTick(() => this.$refs.input.focus());
    }
  },

  methods: {
    changeMask() {
      this.maskText = !this.maskText;
    },

    onBlur() {
      if (!this.errorMessage && !this.validation) {
        this.showError = false;
      } else if ((this.errorMessage && this.validation) && !this.liveValidation) {
        this.showError = !this.validation(this.value);
      } else if (!this.liveValidation) {
        console.error('You must provide a validation function and message to display an error');
      }
    },
  },

  watch: {
    value(newValue) {
      if (this.liveValidation) {
        if (!this.errorMessage || !this.validation) {
          console.error('You must provide a validation function and message to display an error');
        } else {
          this.showError = !this.validation(newValue);
        }
      }
    },
  },

  components: { Button, EyeIcon, EyeOffIcon },

  props: {
    autocomplete: String,
    errorMessage: String,
    label: String,
    name: String,
    placeholder: String,
    type: String,
    min: String,
    max: String,
    value: [String, Number],
    buttonLabel: { type: String, default: '' },
    autofocus: { type: Boolean, default: false },
    textarea: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    green: { type: Boolean, default: false },
    orange: { type: Boolean, default: false },
    red: { type: Boolean, default: false },
    night: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isError: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    // evaluates validation function as user types
    liveValidation: { type: Boolean, default: false },
    // will show error if function returns false
    validation: Function,
  },
};
</script>

<template>
  <div
    :class="[
      'input-container',
      {
        hasLabel: !!label,
        hasError: showError || isError,
        green,
        orange,
        red: red || showError,
        night,
        disabled: disabled || loading,
        textarea,
      }
    ]"
  >
    <div v-show="label" :class="['label', { required, night }]">{{ label }}</div>

    <textarea v-if="textarea"
      :name="name"
      :class="[
        'textarea',
        {
          hasLabel: !!label,
          hasError: showError || isError,
          readonly,
          night,
        },
      ]"
      @input="$emit('input', $event.target.value, $event.target.name, $event.target.type)"
      @keyup.enter="$emit('enter', $event.target.value, $event.target.name)"
      @blur="onBlur"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled || loading"
    />
    <input v-else
      ref="input"
      :name="name"
      :class="[
        'input',
        {
          hasButton: buttonLabel,
          hasIcons: type === 'password',
          hasLabel: !!label,
          hasError: showError || isError,
          readonly,
          night,
        },
      ]"
      @input="$emit('input', $event.target.value, $event.target.name, $event.target.type)"
      @keyup.enter="$emit('enter', $event.target.value, $event.target.name)"
      @blur="onBlur"
      :value="value"
      :placeholder="placeholder"
      :type="computedType"
      :autocomplete="autocomplete || (type === 'password' && 'off')"
      :readonly="readonly"
      :disabled="disabled || loading"
      :min="min"
      :max="max"
    />

    <span v-show="(buttonLabel || type === 'password') && !textarea" class="accessories">
      <Button
        v-show="buttonLabel && !readonly"
        link
        :disabled="disabled"
        :loading="loading"
        @click="$emit('button', value)"
      >
        {{ buttonLabel }}
      </Button>
      <span v-show="type === 'password'" class="icons" @click="changeMask">
        <EyeOffIcon v-if="maskText" title="Show Password" />
        <EyeIcon v-else title="Hide Password" />
      </span>
    </span>

    <div v-show="(showError || isError) && !readonly" class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../a-variables";

.input-container {
  width: 400px;
  max-width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid $grey;
  border-radius: 50px;
  margin: 20px 0;
  &.textarea { border-radius: 10px; }
  &.hasLabel {
    border-top-left-radius: 0;
    margin-top: 30px;
  }
  &.hasError {
    border: 1px solid $red;
    border-bottom-right-radius: 0;
    margin-bottom: 30px;
  }
  &.hasLabel.hasError { border-radius: 0 20px; }
  &.textarea.hasLabel.hasError { border-radius: 0 10px; }
  &.disabled {
    background: $grey-disabled;
    &.night { background: #fff3; }
  }
  &.green:focus-within { border: 1px solid $green; }
  &.orange:focus-within { border: 1px solid $orange; }
  &.red:focus-within { border: 2px solid $red; }
  &.night:focus-within { border: 1px solid $blue; }
  &:focus-within { border: 1px solid $blue; }

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

  & .input {
    height: 40px;
    width: 500px;
    max-width: 100%;
    background: transparent;
    border: none;
    padding: 0 16px;
    font-size: 16px;
    outline: none;
    &.hasButton { padding-right: 0; }
    &.readonly {
      border: none !important;
      cursor: default;
    }
    &.night { color: #eee; }
  }

  & .textarea {
    height: 80px;
    width: 500px;
    max-width: 100%;
    background: transparent;
    border: none;
    padding: 4px 8px;
    font-size: 16px;
    outline: none;
    &.readonly {
      border: none !important;
      cursor: default;
    }
    &.night { color: #eee; }
  }

  & .accessories {
    height: 90%;
    display: flex;
    align-items: center;
    & .icons {
      padding-top: 4px;
      margin-right: 16px;
      margin-left: -6px;
      color: $grey;
      cursor: pointer;
    }
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
