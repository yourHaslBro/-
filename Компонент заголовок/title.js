'use strict';

const vueTitle = {
  functional: true,
	props: {
    imgUrl: {
      type: String,
      required: true
    },
    color: {
      type: String,
      validator: str => {
        let colorArray = ['green', 'black', 'sea'];
        let include = _.includes(colorArray, str);
        if (!include) {
          console.error(`Цвет ${str} не попадает в список
          допустимых значений ${colorArray.slice()}`);
        }
        return include;
      },
      default: 'green'
    }
  },
  render: (h, context) => {
    let mainColor = context.props.color + '-color-vue-top-line';
    return h(
      'div', {
        class: ['vue-top-line', mainColor]
      }, [
        h('img', {
          class: "icon-img-vue-top-line",
          attrs: {
            src: context.props.imgUrl
          }
        }), h('span', context.slots().default)
      ]
    );
  }
};
