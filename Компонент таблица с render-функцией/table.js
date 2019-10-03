'use strict';

const typeTable = {
  props: {
    head: {
      type: Object,
      required: true,
      validator: obj => {
        let plainObj = _.isPlainObject(obj);
        let sortName = _.every(obj, (elem, key) => /^\w+Sort(String|Date|Number|Score)$/.test(key));
        let format = _.every(obj, elem => _.isString(elem) || _.isNumber(elem));
        return plainObj && format && sortName;
      }
    },
    body: {
      type: Array,
      required: true,
      validator: arr => {
        return _.every(arr, obj => {
          let plainObj = _.isPlainObject(obj);
          let sortName = _.every(obj, (elem, key) => /^\w+Sort(String|Date|Number|Score)$/.test(key));
          let format = _.every(obj, elem => _.isString(elem) || _.isNumber(elem));
          return plainObj && format && sortName;
        });
      }
    },
    columnStyle: {
      type: Object,
      required: true,
      validator: obj => {
        let format = _.every(obj, arr => {
          let isArray = _.isArray(arr);
          let allString = _.every(arr, str => _.isString(str));
          return isArray && allString;
        });
        let size = _.size(obj);
        let normalSize = _.isEqual(size, 2);
        return format && normalSize;
      }
    },
    mobileVersion: {
      type: Object,
      required: false,
      validator: obj => {
        let sizeObject = _.isEqual(_.size(obj), 2);
        let stringObject = _.every(obj, elem => _.isString(elem));
        return sizeObject && stringObject;
      },
      default: () => {}
    },
    columnSort: {
      type: Object,
      required: false,
      validator: obj => _.every(obj, bool => _.isBoolean(bool)),
      default: () => {}
    },
    color: {
      type: String,
      required: false,
      validator: str => {
        let colorArray = [
          'green', 'sea'
        ];
        let validatorColor = _.includes(colorArray, str);
        if (!validatorColor) console.error(`Цвет ${str} не попадает в список допустимых значений ${_.slice(colorArray)}`);
        return _.includes(colorArray, str);
      },
      default: 'green'
    }
  },
  data: () => ({
    currSortOrder: '',
    currSortKey: '',
    currSortIterator: 'String',
    sortRegex: new RegExp('^\\w+Sort(String|Date|Number|Score)$')
  }),
  methods: {
    changeSort(key) {
      if (!this.columnSort[key]) return;
      let pureEqual = _.isEqual(this.currSortKey, key);
      if (pureEqual) {
        switch (this.currSortOrder) {
          case '':
            this.currSortOrder = 'asc';
          break;
          case 'asc':
            this.currSortOrder = 'desc';
          break;
          case 'desc':
            this.currSortOrder = 'asc';
          break;
        }
      } else {
        this.currSortOrder = 'asc';
      }
      this.currSortKey = key;
      this.currSortIterator = _.replace(key, this.sortRegex, '$1');
    }
  },
  computed: {
    orderBody() {
      switch (this.currSortIterator) {
        case 'String':
          return _.orderBy(this.body, elem => {
            let replaceAElem = _.replace(String(elem[this.currSortKey]), /<a.*?>(.+?)<\/a>/, '$1');
            return new String(replaceAElem);
          }, this.currSortOrder);
        break;
        case 'Number':
          return _.orderBy(this.body, elem => {
            let replaceAElem = _.replace(String(elem[this.currSortKey]), /<a.*?>(.+?)<\/a>/, '$1');
            return new Number(replaceAElem);
          }, this.currSortOrder);
        break;
        case 'Date':
          return _.orderBy(this.body, elem => {
            let replaceAElem = _.replace(String(elem[this.currSortKey]), /<a.*?>(.+?)<\/a>/, '$1');
            return new Date(_.replace(replaceAElem, /(\d{2})\.(\d{2})\.(\d{2,4})/, '$3/$2/$1'));
          }, this.currSortOrder);
        break;
        case 'Score':
          return _.orderBy(this.body, elem => {
            let replaceAElem = _.replace(String(elem[this.currSortKey]), /<a.*?>(.+?)<\/a>/, '$1');
            return new Number(_.replace(replaceAElem, /(\d+).+/, '$1'));
          }, this.currSortOrder);
        break;
      }
    },
    mainColor() {
      return this.color + '_color_type_table';
    }
  },
  render(h) {
    let tableHead = this.head;
    let tableBody = this.body;
    let widthArray = this.columnStyle.width;
    let alignArray = this.columnStyle.align;
    let headWidthIndex = -1;
    let mobileWidthLayot = new String();
    let mobileWidthRow = new String();
    let scroll = new String();
    let scrollClass = this.color + '_color_scroll_type_table main_type_table';
    if (!_.isEmpty(this.mobileVersion)) {
      let fKey = _.keys(this.mobileVersion)[0];
      let sKey = _.keys(this.mobileVersion)[1];
      mobileWidthLayot = this.mobileVersion[fKey];
      mobileWidthRow = this.mobileVersion[sKey];
      scroll = 'scroll';
    }
    return h(
      'div', {
        class: scrollClass,
        style: {
          width: mobileWidthLayot,
          overflowX: scroll
        },
        attrs: {
          id: 'foo'
        }
      },
      [
        h(
          'div', {
            class: 'head_cert_type_table',
            style: {
              width: mobileWidthRow
            }
          },
          _.map(tableHead, (val, index, obj) =>  {
            let currSrc = new String;
            let sImg = null;
            let spanClass = this.mainColor + ' ';
            let lastKey = _.findLastKey(obj);
            let equalSortArrow = _.isEqual(this.currSortKey, index);
            headWidthIndex++;
            if (_.isEqual(lastKey, index)){
              spanClass += 'border_green_left_type_table border_green_right_type_table';
            } else {
              spanClass += 'border_green_left_type_table';
            }
            if (equalSortArrow) {
              switch (this.currSortOrder) {
                case '':
                  currSrc = './both.png';
                break;
                case 'asc':
                  currSrc = './asc.png';
                break;
                case 'desc':
                  currSrc = './desc.png';
                break;
              }
            } else {
              currSrc = './both.png';
            }
            if (this.columnSort[index]) {
              spanClass += ' pointer_type_table';
              sImg = h(
                'img', {
                  class: 'sort_img_type_table',
                  attrs: {
                    src: currSrc,
                    sort_value: index
                  }
                }
              );
            }
            return h(
              'span', {
                class: spanClass,
                style: {
                  width: widthArray[headWidthIndex],
                  justifyContent: 'center'
                },
                attrs: {
                  sort_value: index
                },
                on: {
                  click: event => this.changeSort(index)
                }
              },
              [h('span', {domProps: {innerHTML: val}}), sImg]
            )
          })
        ),
        _.map(this.orderBody, (val, index) => {
          let bodyWidthIndex = -1;
          return h(
            'div', {
              class: 'head_cert_type_table',
              style: {
                width: mobileWidthRow
              }
            },
            [
              _.map(val, (val, index, obj) => {
                let spanClass = new String();
                let lastKey = _.findLastKey(obj);
                if (_.isEqual(lastKey, index)){
                  spanClass = 'border_gray_left_type_table border_gray_right_type_table';
                } else {
                  spanClass = 'border_gray_left_type_table';
                }
                bodyWidthIndex++;
                return h(
                  'span', {
                    class: spanClass,
                    style: {
                      width: widthArray[bodyWidthIndex],
                      justifyContent: alignArray[bodyWidthIndex]
                    },
                    domProps: {
                      innerHTML: val
                    }
                  }
                )
              })
            ]
          )
        })
      ]
    )
  }
};
