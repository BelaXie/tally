<template>
  <div class="cover" @click="hideDatePanel"></div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class test extends Vue {
  hideDatePanel() {
    this.$emit("update:isShowDatePanel", false);
  }
}
</script>
<style lang="scss" scoped>
.cover {
  background-color: black;
  filter: opacity(50%);
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 500px;
  top: 0;
}
</style>
