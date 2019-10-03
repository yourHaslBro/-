'use strict';

const vueColorUlTemplate = `
<div class="font-color-ul">
  <div
    :class="['flex-container', 'main-block', 'main-block-text-size', havePointer]"
    @click="showLi = !showLi"
  >
    <div :class="[pieceClass, 'piece-size']"></div>
    <div class="title-div-padding"> {{ mainInfo[fK] }} </div>
    <div
      v-if="haveElems"
      :class="[
        'right-close-open',
        'right-close-open-padding',
        rightCloseClass,
        'right-close-open-size'
      ]"
    > {{closeText}} </div>
  </div>
  <transition-group name="fade" tag="div">
    <div
      :class="['li-block-text-size', havePadding]"
      v-if="showLi"
      :key="_.random(20, true)"
    >
      <div
        :class="[liClass, 'li-padding-margin']"
        v-for="li in forArray"
        v-html="li"
      ></div>
    </div>
  </transition-group>
</div>
`;

const vueColorUl = {
  props: {
    mainInfo: {
      type: Object,
      required: true,
      validator: obj => {
        let objKey = _.keys(obj);
        let objSize = _.size(obj);
        let firstKey = obj[objKey[0]];
        let secondKey = obj[objKey[1]];
        let validObjSize = _.isEqual(objSize, 2);
        let validFirstKey = _.isString(firstKey);
        let validSecondKey = _.isArray(secondKey);
        let validSecondKeyValue = _.every(secondKey, str => _.isString(str));
        if (!validObjSize) console.error(`Количество ключей у объекта должно быть равным двум, сейчас - ${objSize}`);
        if (!validFirstKey) console.error(`Значения первого ключа объекта должно быть строкой, сейчас - ${typeof firstKey}`);
        if (!validSecondKey) console.error(`Значения второго ключа объекта должно быть массивом, сейчас - ${typeof secondKey}`);
        if (!validSecondKeyValue) console.error('Все значения в массиве (второй ключ) должны быть строками');
        return validObjSize && validFirstKey && validSecondKey && validSecondKeyValue;
      }
    },
    mainColor: {
      type: String,
      required: true,
      validator: str => {
        let colorArray = [
          'red', 'tur', 'blue',
          'green', 'azure', 'sea',
          'yellow', 'purple', 'lilac'
        ];
        let validatorColor = _.includes(colorArray, str);
        if (!validatorColor) console.error(`Цвет ${str} не попадает в список допустимых значений ${_.slice(colorArray)}`);
        return validatorColor;
      }
    },
    searchStr: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => ({
    showLi: false,
    rightCloseClass: new String(),
    liClass: new String()
  }),
  computed: {
    fK() {
      let mainInfoKey = _.keys(this.mainInfo);
      return mainInfoKey[0];
    },
    sK() {
      let mainInfoKey = _.keys(this.mainInfo);
      return mainInfoKey[1];
    },
    forArray() {
      if (_.isEmpty(this.searchStr)) return this.mainInfo[this.sK];
      let lowerWValue = this.searchStr.toLowerCase();
      if (_.isEmpty(lowerWValue)) {
        return this.mainInfo[this.sK];
      } else {
        return _.filter(this.mainInfo[this.sK], elem => {
          let replaceVal = elem.replace(/(<a.*?>)(.+?)(<\/a.*?>)/, '$2');
          let lowerRVal = replaceVal.toLowerCase();
          return _.includes(lowerRVal, lowerWValue);
        });
      }
    },
    haveElems() {
      if (_.size(this.forArray)) return true;
    },
    havePointer() {
      if (!this.haveElems) {
        return 'no-poiner';
      } else {
        return this.liClass;
      }
    },
    havePadding() {
      if (this.haveElems) return 'li-block-padding';
    },
    closeText() {
      if (this.showLi) {
        return 'скрыть';
      } else {
        return 'показать';
      }
    }
  },
  watch: {
    searchStr: {
      handler(val) {
        let noEmpty = !_.isEmpty(this.forArray);
        let noEmptySearch = !_.isEmpty(val);
        let noShow = !this.showLi;
        if (noEmpty && val && noShow) this.showLi = true;
        if (!val) this.showLi = false;
      }
    }
  },
  created() {
    this.rightCloseClass = this.mainColor + '-right-close';
    this.liClass = this.mainColor + '-li';
    this.pieceClass = this.mainColor + '-piece';
  },
  template: vueColorUlTemplate
};
