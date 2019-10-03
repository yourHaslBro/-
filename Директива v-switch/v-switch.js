'use strict';
//Используется директива v-case вместо атрибута case на объектах
//с целью скрытия возможных значений от пользователя, т. к. значения будут
//находиться внутри vnode, что делает невозможных их просмотр
//через панель разработчика в браузере
Vue.directive('case', {});
Vue.directive('switch', {
  inserted: (el, binding, vnode) => {
    //Записи в консоль об ошибках можно включить или отключить с помощью модификатора dev
    let developMod = binding.modifiers.dev;
    let nChield = vnode.children;
    let searchStr = binding.value;
    //Если в директиву изначально или в дальнейшем было передано значение
    //с восклицательным знаком в начале строки - после изменения значения
    //текущий блок не будет изменяться в дальнейшем при передаче директиве другого значения
    if(_.isString(searchStr) && /^!/.test(searchStr)) searchStr = searchStr.slice(1);
    //Блок валидации передаваемого значения
    // -------- //
    let allCaseValues = _.compact(
      _.map(nChield, chield => {
        let getValue = null;
        if(_.has(chield, 'data.directives[0].value')) {
          getValue = _.get(chield, 'data.directives[0].value');
        }
        return getValue;
      })
    );
    let caseValuesWithTypes = _.map(allCaseValues, elem => `${elem} (${typeof elem})`);
    if(!_.isString(searchStr) && !_.isNumber(searchStr)) {
      developMod && console.error(`Передаваемое значение ${typeof searchStr} не соответствует допустимому типу (number||string)!`);
      return;
    }
    if(!_.includes(allCaseValues, searchStr)) {
      developMod && console.error(`Передаваемое значение ${searchStr} (${typeof searchStr}) не входит в возможный набор значений - ${_.slice(caseValuesWithTypes)}`);
      binding.value = binding.oldValue;
      return;
    }
    // -------- //
    //Скрытие элементов, значение директивы v-case
    //которых не соответствует переданному в директиву
    _.forEach(nChield, chield => {
      let getValue = searchStr;
      if(_.has(chield, 'data.directives[0].value')) {
        getValue = _.get(chield, 'data.directives[0].value');
      }
      if(!_.isEqual(getValue, searchStr)) el.removeChild(chield.elm);
    });
  },
  componentUpdated: (el, binding, vnode) => {
    let developMod = binding.modifiers.dev;
    let searchStr = binding.value;
    let nChield = vnode.children;
    if(_.isString(searchStr) && /^!/.test(searchStr)) searchStr = searchStr.slice(1);
    //Блок валидации передаваемого значения
    // -------- //
    if(/^!/.test(binding.oldValue)) {
      developMod && console.warn(`Значение ${binding.value} не произведёт изменение, так как
        предыдущее значение ${binding.oldValue} имело идентификатор '!'`
      );
      binding.value = binding.oldValue;
      return;
    }
    let allCaseValues = _.compact(
      _.map(nChield, chield => {
        let getValue = null;
        if(_.has(chield, 'data.directives[0].value')) {
          getValue = _.get(chield, 'data.directives[0].value');
        }
        return getValue;
      })
    );
    let caseValuesWithTypes = _.map(allCaseValues, elem => `${elem} (${typeof elem})`);
    if(!_.isString(searchStr) && !_.isNumber(searchStr)) {
      developMod && console.error(`Передаваемое значение ${typeof searchStr} не соответствует допустимому типу (number||string)!`);
      return;
    }
    if(!_.includes(allCaseValues, searchStr)) {
      developMod && console.error(`Передаваемое значение ${searchStr} (${typeof searchStr}) не входит в возможный набор значений - ${_.slice(caseValuesWithTypes)}`);
      binding.value = binding.oldValue;
      return;
    }
    // -------- //
    //Элемент, соответствующий передаваемому в директиву значению
    let putElem = _.find(nChield, chield => {
      let getValue = null;
      if(_.has(chield, 'data.directives[0].value')) {
        getValue = _.get(chield, 'data.directives[0].value');
      }
      if(_.isEqual(getValue, searchStr)) return true;
    }).elm;
    //Текущий элемент на странице
    let replaceElem = _.find(nChield, chield => {
      if(_.has(chield, 'data.directives[0].value')) return el.contains(chield.elm);
    }).elm;
    el.replaceChild(putElem, replaceElem);
  }
});

var vSwitch = new Vue({
  el:'#v-switch',
  data:{
    firstSwitch:'!w',
    secondSwitch:'3'
  }
});

//vSwitch.firstSwitch = 'q';
//не произведёт изменения
//vSwitch.secondSwitch = 2;
//отобразит блок с case=2
//vSwitch.secondSwitch = '!3';
//остановит дальнейшее изменение второго switch после отображения case='3'
