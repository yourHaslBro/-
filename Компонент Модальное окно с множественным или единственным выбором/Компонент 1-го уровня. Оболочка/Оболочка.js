'use strict';
const returnValuesFromContextTemplate = `
<div>
  <div
    @click="show = true"
    class="text-size-from-contex-window-vue show-component-from-contex-window-vue"
  >
    <slot name="preview"> </slot>
  </div>
  <context-window-with-radio-checkbox
    key="context-window"
    :prop-show="show"
    @close="show = false"
    v-bind="$props"
    v-model="model"
  >
    <slot name="title"> </slot>
  </context-window-with-radio-checkbox>
  <div class="model-block-from-context-window-vue">
    <div
      v-for="(value, index) in findValueArray"
      class="return-from-contex-window-vue text-size-from-contex-window-vue"
      @click="removeElem(index)"
    > {{ value }} <img src="./close black.png"></div>
  </div>
</div>
`;

const returnValuesFromContext = {
  model: {
    prop: 'value',
    event: 'model-values-from-context'
  },
  props: ['mainArray', 'selectObject', 'multiplay', 'value', 'elemsOnPage'],
  data: () => ({
    model: null,
    show: false
  }),
  methods: {
    //Функция удаления элементов из массива, служащего источником отрисовки блоков
    removeElem(index) {
      if (this.multiplay) {
        this.$delete(this.model, index);
      } else {
        this.model = '';
      }
    }
  },
  computed: {
    //Поиск значений элементов из главного массива по значениям id, получаемых через v-model
    findValueArray() {
      let filter = null;
      if(this.multiplay) {
        let clone = _.clone(this.model);
        filter = _.filter(this.mainArray, elem => _.includes(clone, elem.id));
      } else {
        filter = _.filter(this.mainArray, elem => this.model === elem.id);
      }
      return _.map(filter, elem => elem.value);
    }
  },
  watch: {
    //Функция, осуществляющуя переназначение входного параметра в переменную,
    //чтобы исключить прямое изменение
    value: {
      immediate: true,
      handler(newVal) {
        this.model = newVal;
      }
    },
    model: {
      handler(newVal) {
        this.$emit('model-values-from-context', newVal);
      }
    }
  },
  components: {
    contextWindowWithRadioCheckbox
  },
  template: returnValuesFromContextTemplate
};
