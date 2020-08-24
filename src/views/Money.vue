<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onNotesChanged" />
    <Tags :dataSource.sync="tags" @update:value="onTagsChanged" />
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
type recordType = {
  selectTags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
@Component({
  components: { NumberPad, Types, Notes, Tags },
})
export default class Money extends Vue {
  name = "Money";
  tags = ["衣", "食", "住", "行", "旅游"];
  record: recordType = {
    selectTags: [],
    notes: "",
    type: "+",
    amount: 10,
  };

  records: recordType[] = JSON.parse(
    window.localStorage.getItem("records") || "[]"
  );
  onNotesChanged(value: string) {
    this.record.notes = value;
  }
  onTagsChanged(value: string[]) {
    this.record.selectTags = value;
  }
  saveRecord() {
    this.record.createdAt = new Date();
    const record2 = JSON.parse(JSON.stringify(this.record));
    this.records.push(record2);
  }
  @Watch("records")
  onRecordsChange() {
    window.localStorage.setItem("records", JSON.stringify(this.records));
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
