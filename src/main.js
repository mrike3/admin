import { createApp } from 'vue'
import App from './App.vue'

import router from './routers/router.js'
// 导入ElementPlus
import ElementPlus, {ElNotification} from 'element-plus' // 导入ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 导入ElementPlus图标
import 'element-plus/dist/index.css' // 导入ElementPlus样式
import 'element-plus/theme-chalk/dark/css-vars.css' //暗黑主题
import './styles/index.scss' // 导入自定义样式

// 导入IconPark
import '@icon-park/vue-next/styles/index.css'
import { install } from '@icon-park/vue-next/es/all.js'

//导入pinia
import { createPinia } from 'pinia'

import i18n from './locales/language.js'

import 'nprogress/nprogress.css'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
    ElNotification.error({
        message: err,
        title: i18n.global.t('error'),
        position: 'bottom-right'
    })
}

install(app)
app.use(ElementPlus)
// 注册ElementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 注册pinia
app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
