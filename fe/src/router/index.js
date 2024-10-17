import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes.js";

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    },
});

export default router;
