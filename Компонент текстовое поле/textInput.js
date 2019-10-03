'use strict';

const textInputTemplate = `
<div vue-comp="text-input" class="boder-text-input-vue">
  <div @click="$refs.input.focus()" img-for-input="true" img-loope="true"></div>
  <input
    v-bind="$attrs"
    ref="input"
    type="text"
    :value="value"
    v-on="inputListeners"
    class="outline-hide-text-input-vue text-input-vue"
  >
  <div @click="clearInput()" img-for-input="true" img-cross="true"></div>
</div>
`;

const textInput = {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      required: false
    },
  },
  methods: {
    clearInput() {
      this.$refs.input.value = '';
      let input = new Event('input', { bubbles: true});
      this.$refs.input.dispatchEvent(input);
    }
  },
  computed: {
    inputListeners: function() {
      return _.assign(this.$listeners, {
        input: event => this.$emit('input', event.target.value)
      });
    },
  },
  template: textInputTemplate
};
