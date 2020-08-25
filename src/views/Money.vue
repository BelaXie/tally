<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <FormItem @update:value="onNotesChanged" fieldName="备注" placeholder="在这里输入备注" />
    <Tags :dataSource.sync="tags" @update:value="onTagsChanged" />
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import recordsModel from "../models/recordsModel";
import tagsModel from "../models/tagsModel";

@Component({
  components: { NumberPad, Types, FormItem, Tags }
})
export default class Money extends Vue {
  name = "Money";
  tags = tagsModel.data.map(item => item.name);
  record: recordType = {
    selectTags: [],
    notes: "",
    type: "-",
    amount: 10
  };

  records = recordsModel.fetch();
  onNotesChanged(value: string) {
    this.record.notes = value;
  }
  onTagsChanged(value: string[]) {
    this.record.selectTags = value;
  }
  saveRecord() {
    this.record.createdAt = new Date();
    const record2 = recordsModel.clone(this.record);
    this.records.push(record2);
  }
  @Watch("records")
  onRecordsChange() {
    recordsModel.save(this.records);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped></style>
