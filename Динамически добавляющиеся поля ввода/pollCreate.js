'use strict';

var createPoll = new Vue({
  el: '#create-poll',
  data: {
    menuObject: {
      enterFT: 'Входная анкета очного обучения',
      exitFT: 'Выходная анкета очного обучения',
      exitDist: 'Выходная анкета дистанционного обучения'
    },
    menuObjectLastIndex: new Number(),
    currWindow: 'enterFT',
    enterFTData: {
      action: 'enterFTPoll',
      name: '',
      task: ['']
    },
    exitFTData: {
      action: 'exitFTPoll',
      name: '',
      task: [''],
      teach: ['']
    },
    exitDistData: {
      action: 'exitDistPoll',
      name: '',
      task: ['']
    },
    axiosUrl: 'custom_web_template.html?object_id=6704213422276703763',
    axiosFeedback: {
      error: false,
      success: false,
      empty: {
        show: false,
        filed: ''
      }
    }
  },
  components: {
    'vue-modal-window': vueModalWindow
  },
  methods: {
    classBind(key) {
      if (this.currWindow === key) return 'head-text-poll-create';
    },
    changeWindow(menuKey) {
      this.currWindow = menuKey;
      //startPrelouder();
    },
    changePollArray(inputVal, elIndex, arrayType) {
      let currArray = _.get(this, arrayType);
      let taskIndex = _.size(currArray) - 1;
      let isLastElement = _.isEqual(taskIndex, elIndex);
      if (inputVal && isLastElement) {
        //создание нового элемента в массиве
        currArray[elIndex] = inputVal;
        currArray.push('');
      }
      if (inputVal && !isLastElement) {
        //изменение значения элемента по индексу
        currArray[elIndex] = inputVal;
      }
      if (!inputVal) {
        //удаление элемента по индексу
        this.$delete(currArray, elIndex);
      }
    },
    postAxios(pollType) {
      let currObject = _.get(this, pollType);;
      let teachExist = _.has(currObject, 'teach');
      let emptyElement = _.findKey(currObject, elem => {
        let value = elem;
        if (_.isArray(elem)) value = _.initial(elem);
        return _.isEmpty(value);
      });
      if (emptyElement) {
        this.axiosFeedback.empty.show = true;
        switch (emptyElement) {
          case 'task':
            this.axiosFeedback.empty.field = 'Наименование тем программ';
            break;
          case 'name':
            this.axiosFeedback.empty.field = 'Название';
            break;
          case 'teach':
            this.axiosFeedback.empty.field = 'Преподаватели';
            break;
        }
        return;
      }
      //startPrelouder(2);
      let axiosObject = _.mapValues(currObject, (elem, key) => _.isArray(elem)? _.initial(elem):elem);
      /*axios.post(this.axiosUrl, JSON.stringify(axiosObject))
      .then(response => {
        if (response.data === 'success') {
          this.axiosFeedback.success = true;
        } else {
          this.axiosFeedback.error = true;
        }
      });*/
      this.axiosFeedback.success = true;
      currObject = _.mapValues(currObject, (elem, key) => {
        if (key === 'action') return this.$set(currObject, key, elem);
        if (_.isArray(elem)) {
          return this.$set(currObject, key, ['']);
        } else {
          return this.$set(currObject, key, '');
        }
      });
    }
  },
  created() {
    this.menuObjectLastIndex = _.size(this.menuObject) - 1;
  },
  beforeCreate() {
    //startPrelouder();
  }
});
