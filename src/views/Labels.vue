<template>
  <Layout>
    <div class="navBar">
      <router-link to="/money" class="left">
        记一笔
      </router-link>
      <span class="title">标签列表</span>
      <span class="rightIcon"></span>
    </div>
    <div class="tags">
      <router-link v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`" class="item">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "../store";

@Component
export default class Labels extends Vue {
  get tags() {
    return store.state.tags;
  }
  created() {
    store.commit("fetchTags");
  }
  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    } else {
      store.commit("createTag", name);
      if (store.state.createInfo === "duplicate tag name") {
        window.alert("标签名重复了");
      } else if (store.state.createInfo === "success") {
        window.alert("创建成功");
      }
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
  > .left {
    font-size: 13px;
    font-weight: bold;
    color: rgb(137, 184, 224);
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.tags {
  margin-top: 8px;
  background: white;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  > .item {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
