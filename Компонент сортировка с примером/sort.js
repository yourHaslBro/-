'use strict';
//Часть разработки, с условием написания кода без использования доп. библиотек (Pure JS/Vue.js)
//Сортировка копирует работу функции библиотеки Lodash - _.orderBy

const vueSortMixin = {
  methods: {
    sortArray: function(array, property, type) {
      if (array === undefined) return;
      let sArr = array.slice();
      let sType = type || 'asc';
      let sProp = property || Object.keys(sArr[0])[0];
      switch (sType){
        case 'asc':
          return sArr.sort(function(fVal, sVal){
            if (fVal[sProp] > sVal[sProp]) return 1;
            if (fVal[sProp] < sVal[sProp]) return -1;
            return 0;
          });
        break;
        case 'desc':
          return sArr.sort(function(fVal, sVal){
            if (fVal[sProp] > sVal[sProp]) return -1;
            if (fVal[sProp] < sVal[sProp]) return 1;
            return 0;
          });
        break;
      }
    }
  }
};

const vueSortTemplate = `
<div v-cloak class="main-vue-selectors size-vue-selectors" ref="mainDiv" :style="heightDiv">
  <div
    :class="mainColorClass"
  > <slot></slot> </div>
  <span v-for="(val, index) in fieldArray">
    <span
      @click="changeField(val.fieldSortName, val.descriptionType)"
      :class="[subColorClass, classReturn(emitInfo.currField, val.fieldSortName)]"
    > {{val.fieldName}} </span>
    <span v-if="slashShow(index, fieldArray)"> / </span>
  </span>
  <div v-if="showSort" class="sort-centr-vue-selectors">
    <span v-for="(val, key) in sortDescription" v-if="sortType === key">
      <span
        @click="changeSort(sortValues.fType)"
        :class="[subColorClass, classReturn(emitInfo.currSort, sortValues.fType)]"
      > {{val.fT}} </span>
      <span> / </span>
      <span
        @click="changeSort(sortValues.sType)"
        :class="[subColorClass, classReturn(emitInfo.currSort, sortValues.sType)]"
      > {{val.sT}} </span>
    </span>
  </div>
</div>
`;

const vueSort = {
  props: {
    fieldArray: {
      type: Array,
      required: true,
      validator: array => array.every(array, item => item === 3)
    },
    hoverColor: {
      type: String,
      required: true
    }
  },
  data: () => ({
    mainColorClass: new String(),
    subColorClass: new String(),
    heightDiv: '0px',
    emitInfo: {currField: '', currSort: ''},
    sortType: new String(),
    sortValues: {fType: 'asc', sType: 'desc'},
    sortDescription: {
      num: {fT: 'по возрастанию', sT: 'по убыванию'},
      rT: {fT: 'а-я', sT: 'я-а'},
      eT: {fT: 'a-z', sT: 'z-a'}
    }
  }),
  methods: {
    classReturn(fV, sV) {
      if (fV === sV) {
        return this.mainColorClass;
      } else {
        return '';
      }
    },
    slashShow(index, object) {
      let objSize = Object.keys(object).length;
      let elNumber = index + 1;
      return elNumber !== objSize;
    },
    changeField(name, type) {
      this.emitInfo.currField = name;
      this.sortType = type;
    },
    changeSort(sortValue) {
      this.emitInfo.currSort = sortValue;
    }
  },
  computed: {
    showSort() {
      let field = this.emitInfo.currField;
      if (!field) return;
      return true;
    }
  },
  watch: {
    emitInfo: {
      deep: true,
      handler(val, oldVal) {
        let sort = val.currSort;
        if (!sort) return;
        this.$emit('sort-change', val);
      }
    }
  },
  created() {
    switch (this.hoverColor) {
      case 'gray':
        this.mainColorClass = 'gray-color-vue-selectors';
        this.subColorClass = 'gray-pointer-vue-selectors';
      break;
      case 'green':
        this.mainColorClass = 'green-color-vue-selectors';
        this.subColorClass = 'green-pointer-vue-selectors';
      break;
    }
  },
  mounted() {
    let initH = this.$refs.mainDiv.offsetHeight;
    if (this.descriptionTag === 'div') {
      this.heightDiv = initH + initH / 2;
      this.heightDiv = 'height: ' + this.heightDiv + 'px';
    } else {
      this.heightDiv = initH + initH;
      this.heightDiv = 'height: ' + this.heightDiv + 'px';
    }
  },
  template: vueSortTemplate
};

var sortExample = new Vue({
  el: '#sort-example',
  data: {
    forSort: [
      {fieldName: 'Возраст', fieldSortName: 'num', descriptionType: 'num'},
      {fieldName: 'Имя', fieldSortName: 'name', descriptionType: 'rT'}
    ],
    sortList: [
      {name: 'Ольга', num: 15},
      {name: 'Евгения', num: 30},
      {name: 'Олег', num: 14},
      {name: 'Станислав', num: 52},
      {name: 'Николай', num: 27}
    ],
    sortObj: {currField: '', currSort: ''}
  },
  mixins: [vueSortMixin],
  components: {
    vueSort
  },
  computed: {
    forVForArray() {
      return this.sortArray(this.sortList, this.sortObj.currField, this.sortObj.currSort);
    }
  }
});
