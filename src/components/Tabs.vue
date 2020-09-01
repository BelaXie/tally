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
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #5594CB;
    }
  }
}
</style>
