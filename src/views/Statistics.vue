<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="recordType" />
    <p v-if="groupedList.length===0" class="tips">提示：当前还没有任何内容哦</p>
    <ol v-else>
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.selectTags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "../constants/recordTypeList";
import intervalList from "../constants/intervalList";
import dayjs from "dayjs";
import clone from "../lib/clone";
@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  recordType = "-";
  interval = "day";
  recordTypeList = recordTypeList;
  intervalList = intervalList;

  beautify(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  tagString(tags: Tag[]) {
    if (tags.length === 0) {
      return "无";
    } else {
      return tags.map(item => item.name).join(",");
    }
  }

  get records() {
    return (this.$store.state as StateType).records;
  }

  get groupedList() {
    const { records } = this;
    if (records.length === 0) {
      return [];
    }
    const newList = clone(records)
      .filter(r => r.type === this.recordType)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    type Result = { title: string; total?: number; items: recordType[] }[];
    let result: Result = [];
    if (newList.length != 0) {
      result = [
        {
          title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
          items: [newList[0]]
        }
      ];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
          last.items.push(current);
        } else {
          result.push({
            title: dayjs(current.createdAt).format("YYYY-MM-DD"),
            items: [current]
          });
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      });
    }
    return result;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
}
</script>


<style scoped lang="scss">
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.tips {
  font-size: 14px;
  color: #18161669;
}
::v-deep .type-tabs-item {
  background: #c4c4c4;
  &.selected {
    background: white;
    &::after {
      display: none;
    }
  }
}
</style>