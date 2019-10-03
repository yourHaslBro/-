'use strict';

const contextBodyTemplate = `
<div class="body-window" ref="bodyWindow">
  <div v-if="!multiplay">
    <radio-button-checkbox-vue
      v-for="elem in pageArray"
      v-model="model"
      class="line_break size-radio-div"
      :key="elem.id"
      :value="elem.id"
      :label="elem.value"
    > </radio-button-checkbox-vue>
  </div>
  <div v-else>
    <radio-button-checkbox-vue
      v-model="selectAll"
      @change="selectAllMethod()"
      input-type="checkbox"
      class="line_break size-radio-div"
      value="select-all"
      label="Выбрать все"
    > </radio-button-checkbox-vue>
    <radio-button-checkbox-vue
      v-for="elem in pageArray"
      v-model="model"
      input-type="checkbox"
      class="line_break size-radio-div"
      :key="elem.id"
      :value="elem.id"
      :label="elem.value"
    > </radio-button-checkbox-vue>
  </div>
</div>
`;

const contextBody = {
  model: {
    prop: 'value',
    event: 'return-value-body'
  },
  props: {
    pageArray: {
      required: true,
      type: Array
    },
    multiplay: {
      type: Boolean
    },
    value: {
      type: [String, Array]
    },
    allId: {
      type: Array
    }
  },
  data: () => ({
    model: null,
    selectAll: new Array()
  }),
  components: {
    radioButtonCheckboxVue
  },
  methods: {
    selectAllMethod() {
      if(!_.isEmpty(this.selectAll)) {
        this.model = this.allId;
      } else {
        this.model = new Array();
      }
    }
  },
  watch: {
    model: {
      immediate: true,
      handler(newVal) {
        this.$emit('return-value-body', newVal);
        orderEqual = (elem1, elem2) => _.isEqual(_.orderBy(elem1), _.orderBy(elem2));
        if(orderEqual(newVal, this.allId)) {
          this.selectAll = ['select-all'];
        } else {
          this.selectAll.shift();
        }
      }
    },
    value: {
      immediate: true,
      handler(newVal) {
        this.model = newVal;
      }
    }
  },
  template: contextBodyTemplate
};
