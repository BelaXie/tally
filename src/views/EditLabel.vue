<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goback" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" placeholder="请输入标签名" :value="tag.name" @update:value="updateTag" />
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";
import store from "../store/index";

@Component({
  components: { FormItem }
})
export default class EditLabel extends Vue {
  get tag() {
    return store.state.currentTag;
  }

  created() {
    store.commit("fetchTags");
    store.commit("setCurrentTag", this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404"); //不用push，防止用户不能直接回退
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      store.commit("updateTag", { id: this.tag.id, name });
    }
  }

  removeTag() {
    if (this.tag) {
      store.commit("removeTag", this.tag.id);
      this.$router.back();
    }
  }

  goback() {
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>