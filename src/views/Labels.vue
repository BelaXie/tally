<template>
  <Layout>
    <div class="tags">
      <router-link v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`" class="item">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import store from "../store";
import { mixins } from "vue-class-component";
import { CreateTag } from "../mixins/createTag";

@Component
export default class Labels extends mixins(CreateTag) {
  get tags() {
    return store.state.tags;
  }
  created() {
    store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .item {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      // color: #666;
      margin-right: 16px;
    }
  }
}
</style>
