'use strict';

const vueModalWindowTemplate = `
<div>
  <div v-cloak @click="$emit('close-window')" class="background-modal"></div>
  <div class="window-modal">
    <div class="head-modal">
      <div class="close-modal" @click="$emit('close-window')"></div>
    </div>
    <div class="text-modal">
      <div><slot name="title"></slot></div>
      <div><slot name="body"></slot></div>
    </div>
  </div>
</div>
`;

const vueModalWindow = {
  template: vueModalWindowTemplate
};
