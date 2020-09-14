<template>
  <ul class="types">
    <li
      v-for="item in dataSource"
      :key="item.value"
      :class="liClass(item)"
      @click="select(item.value)"
    >{{item.text}}</li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "../../store/index";

type DataSourceType = {
  text: string;
  value: string;
};

@Component
export default class Tabs extends Vue {
  @Prop(String) value!: string;
  @Prop({ type: Array, required: true }) dataSource!: DataSourceType[];
  @Prop(String) classPrefix?: string;

  select(value: string) {
    if (["day", "week", "month"].indexOf(value) >= 0) {
      store.commit("updateDbDate", value);
    }
    this.$emit("update:value", value);
  }

  liClass(item: DataSourceType) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: this.value === item.value
    };
  }
}
</script>
<style lang="scss" scoped>
.types {
  background: #f5f5f5;
  height: 24px;
  display: flex;
  > .type-tabs-item {
    background: #fcfcfc;
  }
  > li {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected {
      background: #89b8e0;
    }
  }
}
</style>
