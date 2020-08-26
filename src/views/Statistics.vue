<template>
  <Layout>
    <Tabs :dataSource="recordTypeList" :value.sync="recordType" classPrefix="type" />
    <Tabs :dataSource="intervalList" :value.sync="interval" classPrefix="interval" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "../constants/recordTypeList";
import intervalList from "../constants/intervalList";
@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  recordType = "-";
  interval = "day";
  recordTypeList = recordTypeList;
  intervalList = intervalList;
}
</script>
<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>
