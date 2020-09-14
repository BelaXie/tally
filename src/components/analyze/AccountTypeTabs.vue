<template>
  <ul class="types">
    <li
      v-for="item in dataSource"
      :key="item.value"
      :class="liClass(item)"
      @click="select(item.value)"
    >
      <button></button>
      <span>{{item.text}}</span>
    </li>
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
  display: flex;
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    margin-right: 10px;
    color: #999;
    &.selected {
      color: black;
      opacity: 1;
      > button {
        background: #89b8e0;
      }
    }
    > button {
      width: 40px;
      height: 20px;
      border: none;
      border-radius: 5%;
      background: white;
      margin-right: 10px;
    }
  }
}
</style>
