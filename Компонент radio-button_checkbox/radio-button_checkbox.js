'use strict';

const radioButtonCheckboxVueTemplate = `
<div class="selector-radio-checkbox-custom-vue">
  <input
    :id="value"
    :class="inputClass"
    :type="inputType"
    :checked="shouldBeChecked()"
    :value="value"
    @change="emit($event.target.checked)"
  >
  <label :for="value" :class="[labelClass, 'text-radio-checkbox-vue']">
    {{ label }}
  </label>
</div>
`;

const radioButtonCheckboxVue = {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: String,
    },
    modelValue: {
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    inputType: {
      default: 'radio'
    }
  },
  methods: {
    shouldBeChecked() {
      if(_.isEqual(this.inputType, 'radio')) {
        return this.shouldBeCheckedRadio;
      } else {
        return this.shouldBeCheckedCheckbox;
      }
    },
    emit(checked) {
      if(_.isEqual(this.inputType, 'radio')) {
        this.$emit('change', this.value);
      } else {
        let pushArray = _.clone(this.modelValue);
        let afterPush = new Array();
        if (checked) {
          pushArray.push(this.value);
        } else {
          pushArray = _.filter(pushArray, elem => !_.isEqual(elem, this.value));
        }
        let uniqEmit = _.uniq(pushArray);
        this.$emit('change', uniqEmit);
      }
    }
  },
  computed: {
    shouldBeCheckedRadio() {
      return _.isEqual(this.modelValue, this.value);
    },
    shouldBeCheckedCheckbox() {
      return _.includes(this.modelValue, this.value);
    },
    labelClass() {
      if (this.inputType === 'radio') {
        return 'radio-custom-label-vue';
      } else {
        return 'checkbox-custom-label-vue';
      }
    },
    inputClass() {
      if (this.inputType === 'radio') {
        return 'radio-custom-vue';
      } else {
        return 'checkbox-custom-vue';
      }
    }
  },
  template: radioButtonCheckboxVueTemplate
};
