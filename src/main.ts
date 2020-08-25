import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "./components/Layout.vue";
import Icon from "./components/Icon.vue";
import Button from "./components/Button.vue";
import tagsModel from "./models/tagsModel";

Vue.config.productionTip = false;
Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);
Vue.component("Button", Button);

window.tags = tagsModel.fetch();

window.createTag = (name: string) => {
  const info = tagsModel.create(name);
  if (info === "duplicated") {
    window.alert("标签名重复");
  } else {
    window.alert("创建成功");
  }
};

window.findTag = (id: string) => {
  return window.tags.filter((item) => item.id === id)[0];
};

window.updateTag = (id: string, name: string) => {
  return tagsModel.update(id, name);
};

window.removeTag = (id: string) => {
  return tagsModel.remove(id);
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
