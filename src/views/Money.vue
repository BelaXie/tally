<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onNotesChanged" />
    <Tags :dataSource.sync="tags" @update:value="onTagsChanged" />
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import recordsModel from "../models/recordsModel";

@Component({
  components: { NumberPad, Types, Notes, Tags }
})
export default class Money extends Vue {
  name = "Money";
  tags = ["衣", "食", "住", "行", "旅游"];
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
