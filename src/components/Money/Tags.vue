<template>
  <div class="tags">
    <div class="new">
      <router-link to="/labels" class="item">
        <button>管理标签</button>
      </router-link>
    </div>
    <ul class="current">
      <li v-for="tag in tags" :key="tag.id" @click="toggle(tag)" :class="{ selected: selectedTag === tag }">
        <Icon name="small-label" />
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import store from "../../store/index";
import Vue from "vue";

@Component
export default class Tags extends Vue {
  selectedTag: Tag | null = null;

  get tags() {
    return store.state.tags;
  }

  created() {
    store.commit("fetchTags");
  }

  toggle(tag: Tag) {
    if (this.selectedTag && tag.id === this.selectedTag.id) {
      this.selectedTag = null;
    } else {
      this.selectedTag = tag;
    }
    this.$emit("update:value", this.selectedTag);
  }
}
</script>
<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  background-color: white;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: rgb(226, 234, 241);
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($color: $bg, $amount: 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
