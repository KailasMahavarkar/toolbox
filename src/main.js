import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Fragment from 'vue-fragment';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";

// require styles
import './app.css';

// plugins
Vue.use(Fragment.Plugin);

// configs
Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas, fab);


// filters
Vue.filter('maxLimit64', function (value) {
    if (!value) return ''
    value = value.toString()
    if (value.length > 64) {
        return value.slice(0, 64) + '............'
    }
    return value
})

// create vue instance
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
