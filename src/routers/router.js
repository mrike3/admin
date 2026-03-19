import { createRouter, createWebHistory } from "vue-router";
import admin from "@/layouts/index.vue";
import NotFound from "@/components/NotFound.vue";
import BlankPage from "@/components/BlankPage.vue";

import Nprogress from "nprogress";

import { routes as childRoutes } from "./unit/pages.js";

const menuRoutes = [
    {
        path: "blankpage",
        component: BlankPage,
    },
    ...childRoutes,
];

const routes = [
    {
        path: "/",
        component: admin,
        children: menuRoutes,
    },
    {
        path: "/:pathMatch(.*)*", // 捕获所有未匹配的路由
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory("admin"),
    routes,
});

router.beforeEach(() => {
    Nprogress.start();
});
router.afterEach(() => {
    setTimeout(() => {
        Nprogress.done();
    }, 1000);
});

export default router;
