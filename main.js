import {createApp}  from 'vue'
//引入App.vue组件
import App from './App.vue'
//引入rem适配插件
import 'amfe-flexible'
// import 'postcss-pxtorem'
//引入基础样式
import './assets/base.css'
//引入路由
import router from './router/index.js';
//引入vant-ui组件、图标字体、轻提示
import { Button,Icon } from 'vant';
//引入store
import store from './store/index.js';
//引入vant-ui中的部分样式
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
//引入mock
import './api/mock.js';
const app = createApp(App);
app.use(Icon).use(Button);
app.use(router).use(store);
app.mount('#app');