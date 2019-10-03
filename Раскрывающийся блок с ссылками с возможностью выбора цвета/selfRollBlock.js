'use strict';

var vueSelfRollCourse = new Vue({
  data: {
    ulsArray: new Array(),
    selfRSearch: new String(),
    badSearch: false
  },
  components: {
    vueColorUl,
    vueTitle,
    textInput
  },
  el: '#vue-self-roll-course',
  computed: {
    searchComputed: {
      get() {
        return this.selfRSearch;
      },
      set: _.debounce(function(val) {
        this.selfRSearch = val;
      }, 500)
    },
    wrongSearchTextShow() {
      let chield = this.$children;
      let search = this.searchComputed;
      if (_.isEmpty(chield)) return;
      let filterChild = _.filter(chield, elem => _.hasIn(elem, 'forArray'));
      let childSize = _.size(filterChild);
      let checkArray = Array.apply(null, new Array(childSize));
      checkArray = _.map(checkArray, (elem, index) => _.get(filterChild[index], 'forArray'));
      _.remove(checkArray, elem => _.isEmpty(elem));
      return _.isEmpty(checkArray);
    }
  },
  methods: {
    haveScroll() {
      let have = null;
      if (/CSS/.test(document.compatMode)) {
        have = (document.documentElement.clientHeight< document.documentElement.scrollHeight);
      } else {
        have = (document.body.clientHeight< document.body.scrollHeight);
      }
      console.log(have);
      if (have) {
        document.body.style.width = document.documentElement.clientWidth;
      } else {
        document.body.style.width = document.documentElement.clientWidth - 17 + 'px';
      }
    }
	},
  created() {
		window.addEventListener('resize', this.haveScroll);
		this.haveScroll();
	},
	destroyed() {
		window.removeEventListener('resize', this.haveScroll);
	},
  watch: {
    selfRSearch: {
      immediate: true,
      handler(newVal) {
        this.haveScroll();
      }
    }
  },
  created() {
    //axios.get('custom_web_template.html?object_id=6711666676632019876&action=srcourse')
      //.then(response => this.ulsArray = response.data);
    this.ulsArray = [
      {
        color: 'red',
        info: {
          title: 'Новые курсы',
          elems: [
            '<a href="#">Вопросы профилактики терроризма</a>',
            '<a href="#">Инициативное бюджетирование как инструмент вовлечения граждан</a>'
          ]
        }
      },
      {
        color: 'tur',
        info: {
          title: 'Базовые профессиональные компетенции',
          elems: [
            '<a href="#">Введение в должность государственного гражданского служащего</a>',
            '<a href="#">Деловой стиль государственного гражданского служащего</a>'
          ]
        }
      },
      {
        color: 'blue',
        info: {
          title: 'Информационные технологии',
          elems: [
            '<a href="#">Информационная безопасность</a>',
            '<a href="#">Подготовка презентаций в органах власти</a>'
          ]
        }
      },
      {
        color: 'green',
        info: {
          title: 'Личная эффективность',
          elems: [
            '<a href="#">Подготовка презентаций в органах власти</a>',
            '<a href="#">Тайм-менеджмент</a>'
          ]
        }
      },
      {
        color: 'azure',
        info: {
          title: 'Математические методы',
          elems: [
            '<a href="#">Математика и статистика в системе государственного и муниципального управления</a>',
            '<a href="#">Основы анализа данных</a>'
          ]
        }
      },
      {
        color: 'sea',
        info: {
          title: 'Общекультурные компетенции',
          elems: [
            '<a href="#">7 секретов управления знаниями</a>',
            '<a href="#">Русский язык на государственной гражданской службе</a>'
          ]
        }
      },
      {
        color: 'yellow',
        info: {
          title: 'Общие процессы органов власти',
          elems: [
            '<a href="#">Методы оценки кандидатов при отборе на государственную и муниципальную службу</a>',
            '<a href="#">Организация делопроизводства в органах власти Санкт-Петербурга</a>'
          ]
        }
      },
      {
        color: 'purple',
        info: {
          title: 'Управление проектами',
          elems: [
            '<a href="#">Проектное управление: введение в тему</a>',
            '<a href="#">Современные информационные технологии: Microsoft Project 2010</a>'
          ]
        }
      },
      {
        color: 'lilac',
        info: {
          title: 'Управление финансами',
          elems: [
            '<a href="#">Инициативное бюджетирование как инструмент вовлечения граждан</a>',
            '<a href="#">Управление государственными и муниципальными закупками</a>'
          ]
        }
      }
    ];
  }
});
