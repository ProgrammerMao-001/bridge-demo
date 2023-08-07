import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "index",
            meta: {
                title: "this is index"
            },
            component: () =>
                import(/* webpackChunkName: "aPage" */ "@/views/index.vue")
        },
        {
            path: "/aPage",
            name: "aPage",
            meta: {
                title: "this is aPage"
            },
            component: () =>
                import(/* webpackChunkName: "aPage" */ "@/views/aPage.vue")
        },
        {
            path: "/bPage",
            name: "bPage",
            meta: {
                title: "this is bPage"
            },
            component: () =>
                import(/* webpackChunkName: "aPage" */ "@/views/bPage.vue")
        },
        {
            path: "/cPage",
            name: "cPage",
            meta: {
                title: "this is cPage"
            },
            component: () =>
                import(/* webpackChunkName: "aPage" */ "@/views/cPage.vue")
        },
        {
            path: "/useCesium",
            name: "useCesium",
            meta: {
                title: "this is useCesium"
            },
            component: () =>
                import(/* webpackChunkName: "aPage" */ "@/components/useCesium")
        },
    ]
});
