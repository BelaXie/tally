import Vue from "vue";
import Component from "vue-class-component";
import store from "../store/index";

@Component
export class CreateTag extends Vue {
  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    } else {
      store.commit("createTag", name);
    }
  }
}
