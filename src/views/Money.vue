<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="createRecord" />
    <Tabs :value.sync="record.type" :dataSource="recordTypeList" />
    <FormItem @update:value="onNotesChanged" fieldName="备注" placeholder="在这里输入备注" />
    <Tags @update:value="onTagsChanged" />
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "../store";
import recordTypeList from "../constants/recordTypeList";

@Component({
  components: { NumberPad, FormItem, Tags, Tabs }
})
export default class Money extends Vue {
  record: recordType = {
    selectedTag: null,
    notes: "",
    type: "-",
    amount: 0
  };
  recordTypeList = recordTypeList;
  get records() {
    return store.state.records;
  }
  created() {
    store.commit("fetchRecords");
  }

  onNotesChanged(value: string) {
    this.record.notes = value;
  }

  onTagsChanged(value: Tag) {
    this.record.selectedTag = value;
  }

  createRecord() {
    if (this.record.selectedTag === null) {
      window.alert("你还没有选择标签哦！");
    } else {
      store.commit("createRecord", this.record);
      window.alert("添加成功！");
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped></style>
