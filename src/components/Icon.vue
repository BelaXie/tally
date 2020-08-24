<template>
  <svg class="icon">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script lang="ts">
// 将icons目录下所有的svg文件一次性导入
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: ["name"]
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
