import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as fb from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created()
  {
    const firebaseConfig = {
      apiKey: "AIzaSyBdgJ2nDmVHuCXIdY5wGC8Kpt1KtIuxizU",
      authDomain: "vue-start-project.firebaseapp.com",
      databaseURL: "https://vue-start-project.firebaseio.com",
      projectId: "vue-start-project",
      storageBucket: "vue-start-project.appspot.com",
      messagingSenderId: "412659603744",
      appId: "1:412659603744:web:9237b3a9c3137db85d1f45",
      measurementId: "G-NJT686ZRKS"
    }
    fb.initializeApp(firebaseConfig);
  }
}).$mount('#app')
