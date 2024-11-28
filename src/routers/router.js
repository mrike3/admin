import {createRouter, createWebHistory} from 'vue-router'
import admin from '../layouts/index.vue'
import NotFound from "../components/NotFound.vue";

import Nprogress from 'nprogress'

import menuList from '/src/assets/json/menuList.json'

const menuRoutes = [
    {
        path: '/admin/blankpage',
        component: () => import(/* @vite-ignore */'/src/views/BlankPage.vue'),
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
                component: () => import(/* @vite-ignore */'/admin/src/views' + item.component+'.vue'),
            }
            menuRoutes.push(route)
        }

    })
}



const routes = [
    {
        path: '/admin',
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
    history: createWebHistory(),
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