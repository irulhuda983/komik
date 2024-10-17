const routes = [
    {
        meta: { title: "Layout" },
        path: "/",
        name: "layout",
        redirect: "/",
        component: () => import("@/components/layouts/Base.vue"),
        children: [
            {
                meta: {
                    title: "Dashboard",
                    breadcrumb: ["Dashboard", null],
                    mainMenu: true,
                    menu: 'dashboard'
                },
                path: "/",
                name: "dashboard",
                component: () => import("@/pages/dashboard/Index.vue"),
            },
            {
                meta: {
                    title: "Daftar Komik",
                    breadcrumb: ["Komik", null],
                    mainMenu: true,
                    menu: 'komik'
                },
                path: "/komik",
                name: "listKomik",
                component: () => import("@/pages/dashboard/ListKomik.vue"),
            },
            {
                meta: {
                    title: "Detail Komik",
                    breadcrumb: ["Komik", null],
                    mainMenu: true,
                    menu: 'komik'
                },
                path: "/komik/:slug",
                name: "detailKomik",
                component: () => import("@/pages/komik/DetailKomik.vue"),
            },
            {
                meta: {
                    title: "Favorit",
                    breadcrumb: ["Favorit", null],
                    mainMenu: true,
                    menu: 'favorit'
                },
                path: "/favorit",
                name: "favorit",
                component: () => import("@/pages/dashboard/Favorit.vue"),
            },
            {
                meta: {
                    title: "History",
                    breadcrumb: ["Favorit", null],
                    mainMenu: true,
                    menu: 'history'
                },
                path: "/history",
                name: "history",
                component: () => import("@/pages/dashboard/History.vue"),
            },
        ],
    },
    {
        name: "viewer",
        path: "/viewer/:slug",
        component: () => import("@/pages/viewer/Index.vue"),
    },
    {
        name: "404",
        path: "/:catchAll(.*)",
        component: () => import("@/pages/404.vue"),
    },
];

export default routes;
