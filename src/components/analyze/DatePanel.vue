<template>
  <div class="panel">
    <div class="top">
      <span class="now" @click="now">当前</span>
      <em class="chosen">
        <span v-if="dateRange.year">{{ year }}</span>
        <span v-if="dateRange.month">-</span>
        <span v-if="dateRange.month">{{ month }}</span>
        <span v-if="dateRange.day">-</span>
        <span v-if="dateRange.day">{{ day }}</span>
      </em>
      <span class="ok" @click="ok">确定</span>
    </div>
    <div class="main">
      <DateList v-if="dateRange.year" :value.sync="year" :initialValue="year" :dataSource="dateRange.year" />
      <DateList v-if="dateRange.month" :value.sync="month" :initialValue="month" :dataSource="dateRange.month" />
      <DateList v-if="dateRange.day" :value.sync="day" :initialValue="day" :dataSource="dateRange.day" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import DateList from "./DateList.vue";
import store from "@/store/index";

@Component({ components: { DateList } })
export default class DatePanel extends Vue {
  @Prop({ type: Boolean, required: true }) isShowDatePanel!: boolean;
  get year() {
    return store.state.currentDate.year;
  }
  set year(newValue) {
    store.state.currentDate.year = newValue;
  }
  get month() {
    return store.state.currentDate.month;
  }
  set month(newValue) {
    store.state.currentDate.month = newValue;
  }
  get day() {
    return store.state.currentDate.day;
  }
  set day(newValue) {
    store.state.currentDate.day = newValue;
  }
  get dateRange() {
    return store.state.dateRange;
  }
  ok() {
    this.$emit("update:isShowDatePanel", false);
  }
  now() {
    store.state.currentDate.year = new Date().getFullYear();
    store.state.currentDate.month = new Date().getMonth() + 1;
    store.state.currentDate.day = new Date().getDate();
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.panel {
  width: 100%;
  max-width: 500px;
  background-color: white;
  position: absolute;
  z-index: 1;
  bottom: 0px;
  > .top {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    > .now {
      color: #ee6b8c;
    }
    > .chosen {
      font-size: 18px;
    }
    > .ok {
      color: #5594cb;
    }
  }
  > .main {
    $itemHeight: 30px;
    height: $itemHeight * 5;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    max-width: 100%;
  }
}
</style>
