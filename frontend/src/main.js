import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'





createApp(App).use(store).use(router).mount('#app')

import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);

import Vue from "vue"
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);