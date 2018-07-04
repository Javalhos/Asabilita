import Vue from 'vue';

export const AppEvent = new class {
  constructor() {
    this.vue = new Vue();
  }

  listen(event, callback) {
    this.vue.$on(event, callback);
  }

  fire(event, data = null) {
    this.vue.$emit(event, data);
  }
};
