'use strict';

var tableExample = new Vue({
  el: '#table-example',
  data: {
    sort: {
      startSortDate: true,
      scoreSortScore: true,
      nameSortString: true,
      stateSortString: true
    },
    style: {
      width: ['50%', '23%', '12%', '15%'],
      align: ['left', 'center', 'center', 'center']
    },
    head: {
      nameSortString: 'Электронный курс',
      startSortDate: 'Дата начала',
      scoreSortScore: 'Баллы',
      stateSortString: 'Статус'
    },
    body: [
      {
        nameSortString: '<a href="#"> Электронный курс социальной адаптации </a>',
        startSortDate: '10.12.2018',
        scoreSortScore: '1 из 15',
        stateSortString: 'Назначен'
      },
      {
        nameSortString: '<a href="#"> Портал и интуитивный онлайн-конструктор учебного контента </a>',
        startSortDate: '10.11.2018',
        scoreSortScore: '12 из 15',
        stateSortString: 'В процессе'
      },
      {
        nameSortString: '<a href="#"> Ежегодная оценка деятельности </a>',
        startSortDate: '10.12.2017',
        scoreSortScore: '15 из 15',
        stateSortString: 'Назначен'
      }
    ]
  },
  components: {
    typeTable,
    vueTitle
  }
});
