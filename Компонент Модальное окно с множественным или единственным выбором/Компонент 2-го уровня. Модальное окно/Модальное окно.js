'use strict';
Vue.component('width-height-counter', {
	data: () => ({
		window: {
			width: 0,
			height: 0
		}
	}),
	template:'<div></div>',
	methods: {
		handleResize() {
			this.window.width = window.innerWidth;
			this.window.height = window.innerHeight;
			this.$emit('window-return',this.window);
		}
	},
  created() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	destroyed() {
		window.removeEventListener('resize', this.handleResize);
	}
});

const contextWindowWithRadioCheckboxTemplate = `
<div>
<width-height-counter @window-return="window = $event"></width-height-counter>
  <transition-group name="window-fade">
    <div
      class="body-back-from-context-window-vue"
      ref="layot"
      @click="$emit('close')"
      key="back"
      v-if="propShow"
    ></div>
  </transition-group>
  <transition-group name="window-slide">
    <div v-if="propShow" key="window" class="body-window-from-context-window-vue">
      <div class="body-main-title-from-context-window-vue body-text-size-from-context-window-vue">
        <slot> </slot>
      </div>
      <div class="body-scroll-from-context-window-vue body-direction-from-context-window-vue">
        <div class="body-content-from-context-window-vue">
          <sort-wrapper-vue
            class="shrink-from-context-window-vue"
            :select-object="selectObject"
            :main-array="mainArray"
            @sort-filter="sortEvent($event)"
          ></sort-wrapper-vue>
          <context-body
            v-if="!_.isUndefined(pageArrays[currPage-1])"
            :page-array="pageArrays[currPage-1]"
            :multiplay="multiplay"
            v-model="model"
            :all-id="allId"
            class="shrink-from-context-window-vue"
          > </context-body>
          <div v-else class="checkbox-custom-label-vue off-pointer size-radio-div">
            Нет результатов.
          </div>
        </div>
        <div class="shrink-from-context-window-vue">
          <page-comp-vue v-model="currPage" :page-count="pageArraysCount"> </page-comp-vue>
          <div
            class="body-buttons-wrapper-from-context-window-vue
            body-text-size-from-context-window-vue
            shrink-from-context-window-vue"
          >
            <div
              class="body-button-from-context-window-vue body-blue-button-from-context-window-vue"
              @click="saveResult()"
            > Сохранить </div>
            <div
              class="body-button-from-context-window-vue body-gray-button-from-context-window-vue"
              @click="$emit('close')"
            > Отменить </div>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</div>
`;

const contextWindowWithRadioCheckbox = {
  model: {
    prop: 'value',
    event: 'return-context-window-with-radio-checkbox'
  },
  props: {
    mainArray: {
      required: true,
      type: Array,
      validator: arr => {
        if (_.isEmpty(arr)) return true;
        //Размер первого элемента массива, устанавливается типовым
        let firstElemSize = _.size(arr[0]);
        //Проверка на соответствие всех элементов одному размеру
        let allElemSize = _.every(arr, elem => _.size(elem) === firstElemSize);
        //Ключи первого элемента, устанавливаются типовыми
        let objectKeys = _.keys(arr[0]);
        //Проверка на соответствие всех элементов одному массиву ключей
        let allElemKeys = _.every(arr, elem => {
          let elemKeys = _.keys(elem);
          return _.isEqual(elemKeys, objectKeys);
        });
        //Возможные вариации ключей в элементах
        let availableKeysFirstOption = ['value', 'id'];
        let availableKeysSecondOption = ['value', 'id', 'sort'];
        //Проверка на соответствие вариациям
        let firstOptionEqual = _.isEqual(objectKeys, availableKeysFirstOption);
        let secondOptionEqual = _.isEqual(objectKeys, availableKeysSecondOption);
        let correctKeys = (firstOptionEqual || secondOptionEqual);
        //Проверка на соответствие типам всех значений в элементах
        let correctElemsType = _.every(arr, elem => {
          let value = true;
          let id = true;
          let sort = true;
          if(_.hasIn(elem, 'value')) {
            value = (_.isString(elem.value) || _.isNumber(elem.value));
          }
          if(_.hasIn(elem, 'id')) {
            id = (_.isString(elem.id) || _.isNumber(elem.id));
          }
          if(_.hasIn(elem, 'sort')) {
            sort = (_.isString(elem.sort) || _.isNumber(elem.sort));
          }
          return value && id && sort;
        });
        if (!allElemSize) console.error(`У каждого элемента в массиве должно быть
          одинаковое количество ключей`);
        if (!allElemKeys) console.error(`У каждого элемента в массиве должно быть
          одинаковое наименование ключей`);
        if (!correctKeys) console.error(`У каждого элемента в массиве ключи должны
          совпадать с ${availableKeysFirstOption.join()} или ${availableKeysSecondOption.join()},
          сейчас ${objectKeys.join()}`);
        if (!correctElemsType) console.error(`Допустимые значения в объектах - строки и числа.`);
        return allElemSize && allElemKeys && correctKeys && correctElemsType;
      }
    },
    selectObject: {
      required: false,
      type: Object,
      validator: obj => {
        //Валидация не проводится, если параметр, отвечающий за отрисовку, false
        if (!obj.if) return true;
        //Массив ключей объекта
        let currMainKeys = _.keys(obj);
        //Возможная вариация ключей и проверка на соответствие
        let availableMainKeys = ['if', 'selectArray'];
        let correctMainKeys = _.isEqual(availableMainKeys, currMainKeys);
        //Проверка массива данных для селекта
        let arr = obj.selectArray;
        //Типовой размер элемента и проверка всех элементов на соответствие
        //и корректный размер
        let firstElemSize = _.size(arr[0]);
        let allElemSize = _.every(arr, elem => _.size(elem) === firstElemSize);
        let correctSize = (firstElemSize === 2);
        //Проверка на сохранение одинаковости ключей в элементах
        let objectKeys = _.keys(arr[0]);
        let allElemKeys = _.every(arr, elem => {
          let elemKeys = _.keys(elem);
          return _.isEqual(elemKeys, objectKeys);
        });
        //Проверка на соответствие типам всех значений в элементах
        let correctElemsType = _.every(arr, elem => {
          let fKey = objectKeys[0];
          let sKey = objectKeys[1];
          let correctTypeFKey = (_.isNumber(elem[fKey]) || _.isString(elem[fKey]));
          let correctTypeSKey = (_.isNumber(elem[sKey]) || _.isString(elem[sKey]));
          return correctTypeFKey && correctTypeSKey;
        });
        if (!correctMainKeys) console.error(`У передаваемого входного параметра должны быть ключи ${availableMainKeys.join()},
          сейчас - ${currMainKeys.slice(0)}`);
        if (!allElemSize) console.error(`У каждого элемента в массиве должно быть
          одинаковое количество ключей`);
        if (!correctSize) console.error(`Количество ключей элементов в массиве должно
          быть равно 2, сейчас - ${firstElemSize}`);
        if (!allElemKeys) console.error(`У каждого элемента в массиве должно быть
          одинаковое наименование ключей`);
        if (!correctElemsType) console.error(`Допустимые значения в объектах - строки и числа.`);
        return correctMainKeys && allElemSize && correctSize && allElemKeys && correctElemsType;
      },
      default: () => ({if: false})
    },
    multiplay: {
      required: false,
      type: Boolean,
      default: false
    },
    value: {
      required: true,
      type: [String, Array]
    },
    elemsOnPage: {
      required: false,
      type: Number,
      validator: num => num < 16,
      default: 10
    },
    propShow: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    model: null,
    currPage: 1,
    filteredArray: new Array(),
    window: {width:0, height: 0}
  }),
  computed: {
    //Деление отфильтрованного отображаемого массива элементов на страницы
    pageArrays() {
      return _.chunk(this.filteredArray, this.elemsOnPage);
    },
    //Получение количества страниц
    pageArraysCount() {
      return _.size(this.pageArrays);
    },
    //Все переданные значения для функции Выделить все при типе checkbox
    allId() {
      return _.map(this.mainArray, elem => elem.id);
    }
  },
  methods: {
    saveResult() {
      this.$emit('return-context-window-with-radio-checkbox', this.model);
      this.$emit('close');
    },
    stopWheel(event) {
      let select = document.querySelector('.body-option-select-vue');
      if (_.includes(event.path, select) && this.propShow) return;
      if (_.includes(event.path, this.$refs.layot) && this.propShow && this.window.width < 481) event.preventDefault();
      if (this.window.width > 480 && this.propShow) event.preventDefault();
    },
    sortEvent(event) {
      this.filteredArray = event;
      this.currPage = 1;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.model = newVal;
      }
    }
  },
  mounted() {
    document.addEventListener('wheel', this.stopWheel, {passive: false});
  },
  destroyed() {
    document.removeEventListener('wheel', this.stopWheel, {passive: false});
  },
  components: {
    pageCompVue,
    sortWrapperVue,
    contextBody
  },
  template: contextWindowWithRadioCheckboxTemplate
};
