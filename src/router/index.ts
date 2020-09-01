import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import Detail from "@/views/Detail.vue";
import Notfound from "@/views/Notfound.vue";
import EditLabel from "../views/EditLabel.vue";
import Analyze from "../views/Analyze.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/money",
  },
  {
    path: "/money",
    component: Money,
  },
  {
    path: "/labels",
    component: Labels,
  },
  {
    path: "/detail",
    component: Detail,
  },
  {
    path: "/analyze",
    component: Analyze,
  },
  {
    path: "/labels/edit/:id",
    component: EditLabel,
  },
  {
    path: "*",
    component: Notfound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
