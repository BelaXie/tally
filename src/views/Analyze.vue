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
    <div class="chart-wrapper" @click="hideDatePanel">
      <div class="chart-title">
        <span class="subtitle">月度分析</span>
        <AccountTypeTabs classPrefix="type" :data-source="accountType" :value.sync="currentAccount" />
      </div>
      <Chart :source="source" />
    </div>
    <div class="category">category</div>
    <DatePanel :isShowDatePanel.sync="isShowDatePanel" />
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

@Component({
  components: { DateRangeTabs, DatePanel, Chart, AccountTypeTabs },
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
            product: tagName,
            count: records[i].amount,
          };
          source.push(obj);
        });
      } else {
        setSourceItem(createdYear, createdMonth, createdAccountType, () => {
          source[index].count += records[i].amount;
        });
      }
    }
  }

  isExistInSource(tagName: string) {
    for (let i = 0; i < this.source.length; i++) {
      if (this.source[i].product === tagName) {
        return i;
      }
    }
    return -1;
  }

  chooseTime() {
    this.isShowDatePanel = true;
  }
  hideDatePanel() {
    this.isShowDatePanel = false;
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
