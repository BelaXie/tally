<template>
  <div class="wrapper">
    <ul
      class="list"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      :style="{top:currentTop+'px',transition}"
    >
      <li v-for="item in dataSource" :key="item">{{item}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class DatePanel extends Vue {
  @Prop({ type: Number, required: true }) readonly initialValue!: number;
  @Prop({ type: Array, required: true }) readonly dataSource!: number[];
  startPoint: number = 0;
  currentTop: number = 0;
  transition: string = "";
  style = {
    top: this.currentTop + "px",
    transition: ""
  };
  created() {
    this.initialMove(this.initialValue);
  }

  @Watch("initialValue")
  onChangeList(newValue: number) {
    this.initialMove(newValue);
  }

  initialMove(value: number) {
    const valueIndex = this.dataSource.indexOf(value);
    this.currentTop = -(valueIndex * 30);
  }

  touchStart(e: TouchEvent) {
    this.startPoint = e.changedTouches[0].pageY;
    e.preventDefault();
  }
  touchMove(e: TouchEvent) {
    const limitRange = 50;
    const minTop = -(this.dataSource.length - 1) * 30 - limitRange;
    const maxTop = limitRange;
    let top = this.currentTop + e.changedTouches[0].pageY - this.startPoint;
    top = top < minTop ? minTop : top;
    top = top > maxTop ? maxTop : top;
    this.currentTop = top;
    e.preventDefault();
  }
  touchEnd(e: TouchEvent) {
    this.currentTop > 0 && (this.currentTop = 0);
    let index = -Math.round(this.currentTop / 30);
    index >= this.dataSource.length && (index = this.dataSource.length - 1);
    this.currentTop = -index * 30;
    this.style.transition = "top 200ms ease-in";
    e.preventDefault();
    this.$emit("update:value", this.dataSource[index]);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.wrapper {
  width: 45%;
  position: relative;
  height: $itemHeight;
  border-top: 1px solid #5594cb;
  border-bottom: 1px solid #5594cb;
  display: flex;
  justify-content: center;
  > .list {
    position: absolute;
    width: 100%;
    li {
      height: $itemHeight;
      line-height: $itemHeight;
      text-align: center;
    }
  }
}
</style>