'use strict';

const pageCompVueTemplate = `
<div class="main-page-for-context-window-vue" ref="pageWindow">
  <div
    class="sub-page-for-context-window-vue"
    v-if="pageCount !== 1 && pageCount !== 0"
  >
    <span class="page-for-context-window-vue">Страница:</span>
    <span
      :class="[
        'page-for-context-window-vue',
        isActive(n),
        'page-numbers-for-context-window-vue'
      ]"
      v-for="n in vForPage"
      @click="$emit('changePage', n)"
    > {{ n }} </span>
  </div>
</div>
`;

const pageCompVue = {
  model: {
    prop: 'currPage',
    event: 'changePage'
  },
  props: {
    pageCount: {
      type: Number
    },
    currPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    isActive(n) {
      if (this.currPage === n) return 'page-active-for-context-window-vue';
    }
  },
  mounted() {
    let pageWindow = this.$refs.pageWindow;
    let pageWindowHeight = pageWindow.offsetHeight;
    pageWindow.style.minHeight = (pageWindowHeight + 5) + 'px';
  },
  computed: {
    vForPage() {
      let cP = this.currPage;
      if (1 < cP && cP < this.pageCount) {
        return [cP-1, cP, cP+1];
      }
      if (this.pageCount < 3) {
        let arr = Array.from(new Array(this.pageCount + 1).keys());
        arr.shift()
        return arr;
      }
      if (cP === 1) {
        return [1, 2, 3];
      }
      if (cP === this.pageCount) {
        return [cP - 2, cP - 1, cP];
      }
    }
  },
  template: pageCompVueTemplate
};
