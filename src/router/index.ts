import Vue from "vue";
import VueRouter from "vue-router";
import developerRoutes from "../module/Developer/developerRoutes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    ...developerRoutes,
  ]
});

export default router;
