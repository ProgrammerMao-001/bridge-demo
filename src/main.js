import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCesium from 'vue-cesium'

Vue.config.productionTip = false
Vue.use(VueCesium, {
  // cesiumPath 是指引用的Cesium.js路径，如
  // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
  // cesiumPath: /static/Cesium/Cesium.js
  // 个人在线Cesium Build包：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
  // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
  // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
  // 官方在线Cesium Build包，有CDN加速，推荐用这个：
  cesiumPath: 'https://unpkg.com/cesium@1.100/Build/Cesium/Cesium.js',
  // 指定Cesium.Ion.defaultAccessToken，使用Cesium ion的数据源需要到https://cesium.com/ion/申请一个账户，获取Access Token。不指定的话可能导致 Cesium 在线影像加载不了
  // https://ion.cesium.com/tokens?page=1   ===> token注册地址
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NTFlNTExYS0zNGVjLTRlYzQtODRlMy0xNmVjMGUxNmU0Y2UiLCJpZCI6MTU4NjI2LCJpYXQiOjE2OTEzOTEzOTh9.o5SZzuP4kSm86AkWMlTHWW-frZnzswk7fnRWO5sjWQw'
})
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
