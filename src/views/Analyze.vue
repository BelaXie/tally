<template>
  <Layout>
    <div class="top">
      <LittleTabs classPrefix="type" :data-source="intervalType" :value.sync="currentInterval" />
      <em class="chooseTime" @click="chooseTime">
        <span v-if="dateRange.year">{{year}}</span>
        <span v-if="dateRange.year">年</span>
        <span v-if="dateRange.month">{{month}}</span>
        <span v-if="dateRange.month">月</span>
        <span v-if="dateRange.day">{{day}}</span>
        <span v-if="dateRange.day">日</span>
        <span>&#x25BC;</span>
      </em>
    </div>
    <div class="chart" @click="hideDatePanel">chart</div>
    <div class="category">category</div>
    <DatePanel :isShowDatePanel.sync="isShowDatePanel" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import LittleTabs from "@/components/analyze/LittleTabs.vue";
import intervalType from "../constants/intervalType";
import DatePanel from "../components/analyze/DatePanel.vue";
import store from "../store/index";

@Component({
  components: { LittleTabs, DatePanel }
})
export default class Analyze extends Vue {
  intervalType = intervalType;
  currentInterval = "month";
  isShowDatePanel: boolean = false;
  created() {
    store.commit("updateDbDate", "month");
  }
  get year() {
    return store.state.currentDate.year;
  }
  get month() {
    return store.state.currentDate.month;
  }
  get day() {
    return store.state.currentDate.day;
  }
  get dateRange() {
    return store.state.dateRange;
  }
  chooseTime() {
    this.isShowDatePanel = true;
  }
  hideDatePanel() {
    console.log("进来了");
    this.isShowDatePanel = false;
    console.log(this.isShowDatePanel);
  }
}
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  background-color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  > .chooseTime {
    color: #5594cb;
  }
}
</style>