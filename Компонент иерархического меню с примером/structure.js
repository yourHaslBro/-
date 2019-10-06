'use strict';

const comp = `<div>
  <a v-if="_.hasIn(structure, 'a')" :href='structure.a'>
    <div
      :class="[
        'left-border-title-structure',
        'title-size-structure',
        structure.color + '-border-title-structure'
      ]"
    > {{ structure.title }} </div>
  </a>
  <div v-else>
    <div>
      <div
        list
        :list-open="String(show)"
        :class="[
          'left-border-title-structure',
          'title-size-structure',
          structure.color + '-border-title-structure'
        ]"
        @click="show = !show"
      > {{ structure.title }} </div>
    </div>
    <div class="options-container-structure" v-if="show">
      <div v-for="r in structure.array">
        <a v-if="_.hasIn(r, 'val')" :href="r.a">
          <div
            :class="[
              'left-border-option-structure',
              'option-size-structure',
              structure.color + '-border-option-structure'
            ]"
          > {{ r.val }} </div>
        </a>
        <div v-else>
          <structure-menu :structure="r"></structure-menu>
        </div>
      </div>
    </div>
  </div>
</div>`;



const structureMenu = {
  props: {
    structure: {
      required: true,
      type: Object
    }
  },
  template: comp,
  name: 'structure-menu',
  data: () => ({show: false})
};
