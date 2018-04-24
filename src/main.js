// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$axios = axios

import jQuery from 'jquery'
Vue.prototype.$ = jQuery

// import QRCode from 'qrcode'
// Vue.use(QRCode)


import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
require('swiper/dist/css/swiper.css')

import FontAwesome from "./assets/font-awesome-4.7.0/css/font-awesome.css"
import bootstrapCss from "./assets/bootstrap/css/bootstrap.css"
import bootstrapJs from "./assets/bootstrap/js/bootstrap.js"

import { AlertPlugin,ToastPlugin,ConfirmPlugin,LoadingPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)

import store from './vuex/store'
Vue.prototype.$store = store
import storage from './vuex/storage'
Vue.prototype.$storage = storage

import { httpUrl } from "./api.js"
Vue.prototype.$httpUrl = httpUrl


import { Swipe, SwipeItem } from 'vant'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
import { SubmitBar } from 'vant'
Vue.component(SubmitBar.name, SubmitBar)
import { Tab, Tabs } from 'vant'
Vue.component(Tab.name, Tab)
Vue.component(Tabs.name, Tabs)
import { Checkbox, CheckboxGroup } from 'vant'
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)
import { Search } from 'vant'
Vue.component(Search.name, Search)
import { Radio } from 'vant'
Vue.component(Radio.name, Radio)
import { Popup } from 'vant'
Vue.component(Popup.name, Popup)
import { Dialog } from 'vant'
Vue.prototype.$dialog = Dialog
import { NumberKeyboard } from 'vant';
import { PasswordInput, NumberKeyBoard } from 'vant';
Vue.component(PasswordInput.name,PasswordInput);
Vue.component(NumberKeyboard.name,NumberKeyboard);
import { Card } from 'vant';
Vue.component(Card.name,Card);
import { Button } from 'vant';
Vue.component(Button.name,Button);
import { CouponCell, CouponList } from 'vant';
Vue.component(CouponCell.name,CouponCell);
Vue.component(CouponList.name,CouponList);
import { Cell, CellGroup } from 'vant';
Vue.component(Cell.name,Cell);
Vue.component(CellGroup.name,CellGroup);


import AMap from 'vue-amap'
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '7e77988ab7c3c95989e653a380fe86a8',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Driving']
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
