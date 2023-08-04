import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
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
    ]
});
