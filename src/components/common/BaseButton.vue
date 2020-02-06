<script>
/* eslint-disable */
import Spinner from './BaseSpinner.vue';

export default {
  name: 'base-button',

  components: { Spinner },

  props: {
    id: String,
    name: String,
    primary: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    lg: { type: Boolean, default: false },
    sm: { type: Boolean, default: false },
    green: { type: Boolean, default: false },
    orange: { type: Boolean, default: false },
    red: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    link: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    night: { type: Boolean, default: false },
  },
};
</script>

<template>
  <button
    :id="id"
    :name="name"
    :class="['button', { primary, full, lg, sm, green, orange, red, isDelete, link, loading, round, night }]"
    @click="$emit('click', $event.target.name)"
    :disabled="disabled || loading"
  >
    <div v-if="loading" class="spinner"><Spinner name="spinner" /></div>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import "../../a-variables";

.button {
  height: 40px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $blue;
  border-radius: 3px;
  padding: 0 20px;
  color: $blue;
  font-size: 16px;
  cursor: pointer;
  &:active {
    background: $blue-faded;
  }
  &.loading { position: relative; }
  &.night { color: #fff; }

  &.primary {
    background: $blue;
    border: none;
    color: #fff;
    &:hover { background: #1ebdfc; }
    &:active { background: $blue; }
    &[disabled] {
      background: $grey-disabled;
      color: $grey;
    }
    &.loading { color: $grey-disabled; }
  }

  &.full {
    width: 100%;
  }

  &.round {
     height: 60px;
     width: 60px;
     border-radius: 50%;
  }

  &.lg {
    height: 46px;
    font-size: 18px;
  }

  &.sm {
    height: 30px;
    font-size: 14px;
    &.round {
      //  height: 10px;
       width: 30px;
    }
  }

  &.green {
    background: $green;
    border: none;
    color: #fff;
    &:hover { background: lighten(#17AE82, 2%); }
    &:active { background: $green; }
    &[disabled] {
      background: $grey-disabled;
      color: #fff;
    }
  }

  &.orange {
    background: $orange;
    border: none;
    color: #fff;
    &:hover { background: #ff9100; }
    &:active { background: $orange; }
    &[disabled] {
      background: $grey-disabled;
      color: #fff;
    }
  }

  &.red {
    background: $red;
    border: none;
    color: #fff;
    &:hover { background: #db4256; }
    &:active { background: $red; }
    &[disabled] {
      background: $grey-disabled;
      color: #fff;
    }
  }

  &.isDelete {
    color: $red;
    font-size: 17px;
  }

  &.link {
    background: transparent;
    border: none;
    outline: none;
    color: $blue;
    &:hover { text-decoration: underline; }
    &[disabled] {
      border: none;
      color: $grey;
      text-decoration: none;
    }
  }

  &[disabled] {
    color: $grey-disabled;
    border: 1px solid $grey;
    cursor: default;
  }

  & .spinner {
    position: absolute;
    top: 25%;
    left: 40%;
  }
}
</style>
