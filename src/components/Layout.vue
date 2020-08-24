<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot />
    </div>
    <Nav></Nav>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
}
.content {
  flex-grow: 1;
}
</style>
