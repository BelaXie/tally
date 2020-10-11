<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const clientWidth = document.documentElement.clientWidth;
if (clientWidth > 762) {
  window.alert("为确保使用效果，建议在手机上浏览使用");
}
</script>

<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: #f5f5f5;
}
#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
