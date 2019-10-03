'use strict';

const sortWrapperVueTemplate = `
<div class="sort-div">
  <text-input
    v-model="inputModel"
    placeholder="поиск по названию"
    class="size-sort-div"
  ></text-input>
  <vue-select
    v-if="selectObject.if"
    class="size-sort-div"
    :select-array="selectObject.selectArray"
    v-model="selectModel"
  ></vue-select>
</div>
`;

const sortWrapperVue = {
  model: {
    prop: 'currPage',
    event: 'changePage'
  },
  data: () => ({
    selectModel: 'Все',
    inputModel: ''
  }),
  props: {
    selectObject: {
      type: Object
    },
    mainArray: {
      type: Array
    }
  },
  computed: {
    filterByInputArray() {
      let spreadIncludes = _.spread(_.includes);
      return _.filter(this.filterBySelectArray, elem => spreadIncludes(_.lowerCaseAll(elem.value, this.inputModel)));
    },
    filterBySelectArray() {
      if (_.isEqual(this.selectModel, 'Все')) return this.mainArray;
      let spreadEqual = _.spread(_.isEqual);
      return _.filter(this.mainArray, elem => spreadEqual(_.lowerCaseAll(elem.sort, this.selectModel)));
    }
  },
  watch: {
    filterByInputArray: {
      deep: true,
      handler(newVal, oldVal) {
        this.$emit('sort-filter', newVal);
      }
    }
  },
  created() {
    this.$emit('sort-filter', this.filterByInputArray);
  },
  components: {
    textInput,
    vueSelect
  },
  template: sortWrapperVueTemplate
};
