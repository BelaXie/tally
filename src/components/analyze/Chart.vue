<template>
  <div>
    <div class="chart" id="chart"></div>
    <ul v-if="!isEmpty" class="detailList">
      <li class="detailItem" v-for="item in source" :key="item.tagName">
        <span class="proportion">{{ item.tagName }}：{{ item.proportion }}</span>
        <progress max="100" :value="getValue(item.proportion)"></progress>
        <p class="amount">支出金额：{{ item.count }}</p>
      </li>
    </ul>
    <p v-if="isEmpty" class="empty">当前数据为空</p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
var echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
require("echarts/lib/component/title");
@Component
export default class Chart extends Vue {
  @Prop({ type: Array, required: true }) readonly source!: sourceType[];
  myChart: any;
  isEmpty: boolean = false;
  option = {
    dataset: {
      source: this.source,
    },
    series: {
      type: "pie",
      radius: 60,
      center: "50%",
    },
  };
  getValue(value: string) {
    const result = parseFloat(value.substring(0, value.length - 1));
    return result;
  }
  @Watch("source")
  onOptionChanged(source: sourceType[]) {
    this.setIsEmpty();
    this.option.dataset.source = source;
    this.myChart.setOption(this.option);
  }
  created() {
    this.setIsEmpty();
  }
  mounted() {
    this.myChart = echarts.init(document.querySelector("#chart"), "light");
    this.myChart.setOption(this.option);
  }
  setIsEmpty() {
    if (this.source.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 200px;
}
.detailList {
  margin-top: 30px;
}
.detailItem {
  border-bottom: 1px #f6e3e3 solid;
  padding: 10px 20px;
  .proportion {
    font-weight: bold;
    display: inline-block;
    width: 140px;
  }
  progress {
    -webkit-appearance: none;
  }
  progress::-webkit-progress-value {
    height: 5px;
    background-color: #5594cb;
  }
  progress::-webkit-progress-bar {
    background-color: transparent;
  }
  .amount {
    font-size: 10px;
    color: #9d9393;
  }
}
.empty {
  text-align: center;
  color: #c7c2c2;
  font-size: 20px;
}
</style>
