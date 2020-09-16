<template>
  <Layout>
    <div class="top">
      <DateRangeTabs :data-source="intervalType" :value.sync="currentInterval" />
      <em class="chooseTime" @click="chooseTime">
        <span v-if="dateRange.year">{{ year }}</span>
        <span v-if="dateRange.year">年</span>
        <span v-if="dateRange.month">{{ month }}</span>
        <span v-if="dateRange.month">月</span>
        <span v-if="dateRange.day">{{ day }}</span>
        <span v-if="dateRange.day">日</span>
        <span>&#x25BC;</span>
      </em>
    </div>
    <div class="chart-wrapper">
      <div class="chart-title">
        <span v-if="currentInterval === 'month'" class="subtitle">月度分析</span>
        <span v-if="currentInterval === 'year'" class="subtitle">年度分析</span>
        <AccountTypeTabs classPrefix="type" :data-source="accountType" :value.sync="currentAccount" />
      </div>
      <Chart :source="source" />
    </div>
    <DatePanel :isShowDatePanel.sync="isShowDatePanel" v-if="isShowDatePanel" />
    <Cover v-if="isShowDatePanel" :isShowDatePanel.sync="isShowDatePanel" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import DateRangeTabs from "@/components/analyze/DateRangeTabs.vue";
import AccountTypeTabs from "@/components/analyze/AccountTypeTabs.vue";
import intervalType from "../constants/intervalType";
import DatePanel from "../components/analyze/DatePanel.vue";
import store from "../store/index";
import Chart from "../components/analyze/Chart.vue";
import recordTypeList from "../constants/recordTypeList";
import Cover from "../components/Cover.vue";

@Component({
  components: { DateRangeTabs, DatePanel, Chart, AccountTypeTabs, Cover },
})
export default class Analyze extends Vue {
  intervalType = intervalType;
  currentInterval = "month";
  accountType = recordTypeList;
  currentAccount = "-";
  isShowDatePanel: boolean = false;
  source: sourceType[] = [];
  @Watch("currentInterval")
  onCurrentIntervalChanged(val: string) {
    this.source = [];
    this.getSource(val, this.year, this.month, this.currentAccount);
  }
  @Watch("year")
  onYearChanged(val: number) {
    this.source = [];
    this.getSource(this.currentInterval, val, this.month, this.currentAccount);
  }
  @Watch("month")
  onMonthChanged(val: number) {
    this.source = [];
    this.getSource(this.currentInterval, this.year, val, this.currentAccount);
  }
  @Watch("currentAccount")
  onCurrentAccountChanged(val: string) {
    this.source = [];
    this.getSource(this.currentInterval, this.year, this.month, val);
  }
  created() {
    store.commit("updateDbDate", "month");
    store.commit("fetchRecords");
    this.getSource(this.currentInterval, this.year, this.month, this.currentAccount);
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

  getSource(currentInterval: string, year: number, month: number, accoutType: string) {
    const records = store.state.records;
    const setSourceItem = function(createdYear: number, createdMonth: number, createdAccountType: string, fn: Function) {
      if (currentInterval === "month" && year === createdYear && month === createdMonth && accoutType === createdAccountType) {
        fn();
      } else if (currentInterval === "year" && year === createdYear && accoutType === createdAccountType) {
        fn();
      } else {
        return;
      }
    };
    for (let i = 0; i < records.length; i++) {
      const createdYear = new Date(records[i].createdAt!).getFullYear();
      const createdMonth = new Date(records[i].createdAt!).getMonth() + 1;
      const tagName = records[i].selectedTag!.name;
      const createdAccountType = records[i].type;
      const index = this.isExistInSource(tagName);
      const { source } = this;
      if (index === -1) {
        setSourceItem(createdYear, createdMonth, createdAccountType, () => {
          const obj: sourceType = {
            tagName,
            count: records[i].amount,
            proportion: null,
          };
          source.push(obj);
        });
      } else {
        setSourceItem(createdYear, createdMonth, createdAccountType, () => {
          source[index].count += records[i].amount;
        });
      }
    }
    this.computeProportion();
    this.source = this.sortByCount(this.source);
  }
  sortByCount(source: sourceType[]) {
    if (source.length <= 1) {
      return source;
    }
    let index = Math.floor(source.length / 2);
    let left: sourceType[] = [];
    let right: sourceType[] = [];
    let pivot = source.splice(index, 1)[0];
    for (let i = 0; i < source.length; i++) {
      if (source[i].count > pivot.count) {
        left.push(source[i]);
      } else {
        right.push(source[i]);
      }
    }
    const resultArray: sourceType[] = this.sortByCount(left).concat(pivot, this.sortByCount(right));
    return resultArray;
  }
  computeProportion() {
    let sum = 0;
    for (let i = 0; i < this.source.length; i++) {
      sum += this.source[i].count;
    }
    for (let i = 0; i < this.source.length; i++) {
      const temp = this.source[i].count / sum;
      this.source[i].proportion = Math.round(temp * 10000) / 100 + "%";
    }
  }

  isExistInSource(tagName: string) {
    for (let i = 0; i < this.source.length; i++) {
      if (this.source[i].tagName === tagName) {
        return i;
      }
    }
    return -1;
  }

  chooseTime() {
    this.isShowDatePanel = true;
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
.chart-wrapper {
  > .chart-title {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    > .subtitle {
      font-size: 15px;
    }
  }
}
</style>
