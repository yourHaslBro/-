'use strict';

const vueSelectTemplate = `
<div class="main-select-vue">
  <div
    :class="[selectedClass, 'select-vue', 'size-select-vue']"
    @click="openList()"
  > {{txtCash}} </div>
  <div
    class="body-option-select-vue"
    v-show="showOptionBool"
  >
    <div
      v-for="p in selectArray"
      class="option-select-vue size-select-vue"
      @click="optionClick(p[valKey])"
    >
      {{ p[txtKey] }}
    </div>
  </div>
</div>
`;

const vueSelect = {
  props: {
    selectArray: {
      type: Array,
      validator: array => {
        return _.every(array, obj => {
          let sizeObj = _.size(obj);
          let correctSize = _.isEqual(sizeObj, 2);
          let strOrNum = _.every(obj, elem => _.isNumber(elem) || _.isString(elem));
          if (!correctSize) console.error(`Количество ключей объекта должно быть равно двум,
          сейчас - ${sizeObj}`);
          if (!strOrNum) {
            let incorrectElem = _.find(obj, elem => !_.isNumber(elem) && !_.isString(elem));
            console.error(`В значениях объекта допускаются только строки или числа,
            сейчас присутствует ${typeof incorrectElem}`);
          }
          return correctSize && strOrNum;
        });
      },
      required: true
    },
    value: {
      type: [String, Number]
    }
  },
  data: function () {
   return {
      valKey:'',
      txtKey:'',
      txtCash:'',
      showOptionBool:false
    }
  },
  methods: {
    optionClick(clickVal) {
      this.$emit('input', clickVal);
      this.makeCash(clickVal);
      this.showOptionBool = false;
    },
    makeCash(newVal) {
      let searchObj = _.find(this.selectArray, elem => elem[this.valKey] === newVal) || {};
      this.txtCash = searchObj[this.txtKey] || '';
    },
    outClick(event) {
      let check = _.find(event.path, this.$el);
      if(_.isUndefined(check)) this.showOptionBool = false;
    },
    openList() {
      this.showOptionBool = !this.showOptionBool;
    }
  },
  mounted() {
    this.valKey = _.keys(this.selectArray[0])[0];
    this.txtKey = _.keys(this.selectArray[0])[1];
    document.addEventListener('click', this.outClick);
  },
  updated() {
    this.makeCash(this.value);
  },
  destroyed() {
    document.removeEventListener('click', this.outClick);
  },
  computed: {
    selectedClass() {
      if (this.showOptionBool) return 'select-selected-vue';
    }
  },
  template: vueSelectTemplate
};
