<template>
  <div class="chart" id="chart"></div>
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
  @Watch("source")
  onOptionChanged(source: sourceType[]) {
    this.option.dataset.source = source;
    this.myChart.setOption(this.option);
  }
  mounted() {
    this.myChart = echarts.init(document.querySelector("#chart"), "light");
    this.myChart.setOption(this.option);
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 250px;
}
</style>
