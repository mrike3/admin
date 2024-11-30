import {createRouter, createWebHistory} from 'vue-router'
import admin from '@/layouts/index.vue'
import NotFound from "@/components/NotFound.vue";
import BlankPage from '@/views/BlankPage.vue'

import Nprogress from 'nprogress'

import menuList from '@/assets/json/menuList.json'

const modules = import.meta.glob('@/views/**/*.vue')

const menuRoutes = [
    {
        path: 'blankpage',
        component: BlankPage,
    }
]

createMenuRoutes(menuList.data)

function createMenuRoutes(menuArray) {
    menuArray.forEach((item) => {
        if(item.children!==undefined) {
            createMenuRoutes(item.children)
        }else{
            const route = {
                path: item.path,
                component: modules['/src/views'+item.component+'.vue'],
            }
            menuRoutes.push(route)
        }

    })
}



const routes = [
    {
        path: '/',
        component: admin,
        children: menuRoutes
    },
    {
        path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory('admin'),
    routes
})

router.beforeEach(()=> {
    Nprogress.start()
})
router.afterEach(()=> {
    setTimeout(() => {
        Nprogress.done()
    }, 1000)
})


export default router