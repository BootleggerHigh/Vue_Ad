import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueTelInput from 'vue-tel-input'
/**
 *
 * Необходимое,для данной  работы с FireBase;
 *
 */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

Vue.config.productionTip = false
Vue.use(VueTelInput,vuetify);
const firebaseConfig = {
    apiKey: "AIzaSyBdgJ2nDmVHuCXIdY5wGC8Kpt1KtIuxizU",
    authDomain: "vue-start-project.firebaseapp.com",
    databaseURL: "https://vue-start-project.firebaseio.com",
    projectId: "vue-start-project",
    storageBucket: "vue-start-project.appspot.com",
    messagingSenderId: "412659603744s",
    appId: "1:412659603744:web:9237b3a9c3137db85d1f45",
    measurementId: "G-NJT686ZRKS"
}
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(async user=>{
        if(user)
        {
            await store.dispatch('authLogin',user);
            await store.dispatch('fetchAds');
        }
   new Vue({
        router,
        store,
        vuetify,
        render: h => h(App),
    }).$mount('#app');
});

