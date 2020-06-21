import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './Guard/GuardAuth'
import Home from "../components/AppHome";
import Ad from "../components/Ad/AdItem";
import AdList from "../components/Ad/AdList";
import NewAd from "../components/Ad/AdCreateItem";
import Login from "../components/Auth/AuthLogin";
import Registration from "../components/Auth/AuthRegistration";
import Orders from "../components/User/UserOrders";
import Logout from "../components/Auth/AuthLogout";
import DoubleAuthGuard from "./Guard/GuardDeniedDoubleAuth";
import AdEditItem from "../components/Ad/AdEditItem";
import AdMyAdsList from "../components/Ad/AdMyAdList";
import AccessEditAd from "./Guard/GuardAdEdit"
import multiguard from 'vue-router-multiguard';
import AdBuy from "../components/Ad/AdBuy";
import AccessBuyAd from "./Guard/GuardAccessAdBuy"
Vue.use(VueRouter);
/**
 * Сердце передвижение пользователя,а также его контроль (AuthGuard, DoubleAuthGuard,AccessEditAd,AccessBuyAd);
 */
export default new VueRouter(

    {
      routes:[
          {
              path:'',
              name:'Home',
              component:Home,
          },
          {
              path:'/ad/:id',
              name:'Ad',
              props:true,
              component:Ad,
              children : [
                  {
                      path:'edit',
                      name:'AdEdit',
                      props:true,
                      component:AdEditItem,
                      beforeEnter: multiguard([AuthGuard, AccessEditAd]),
                  },
                  {
                      path:'buy',
                      name:'AdBuy',
                      component:AdBuy,
                      beforeEnter: multiguard([AuthGuard,AccessBuyAd]),
                  }
              ]
          },
          {
              path:'/list',
              name:'AdList',
              component:AdList,
              beforeEnter:AuthGuard,
          },
          {
              path:'/new',
              name:'newAd',
              component:NewAd,
              beforeEnter:AuthGuard,
          },
          {
              path:'/myAds',
              name:'myAds',
              component:AdMyAdsList,
              beforeEnter:AuthGuard,
          },
          {
              path:'/login',
              name:'Login',
              component:Login,
              beforeEnter:DoubleAuthGuard,
          },
          {
              path:'/registration',
              name:'Registration',
              component:Registration,
              beforeEnter:DoubleAuthGuard,
          },
          {
              path:'/orders',
              name:'Orders',
              component:Orders,
              beforeEnter:AuthGuard,
          },
          {
              path:'/logout',
              name:'Logout',
              component: Logout,
          }
      ],
        mode:'history',
    },
);
