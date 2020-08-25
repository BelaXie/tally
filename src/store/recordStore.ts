import clone from "@/lib/clone";

const localStorageKeyName = "records";

const recordStore = {
  records: [] as recordType[],
  fetchRecords() {
    this.records = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as recordType[];
    return this.records;
  },
  saveRecords() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.records)
    );
  },
  createRecord(record: recordType) {
    const record2: recordType = clone(record);
    record2.createdAt = new Date();
    this.records && this.records.push(record2);
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();

export default recordStore;
