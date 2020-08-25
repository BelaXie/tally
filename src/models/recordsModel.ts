import clone from "../lib/clone";

const localStorageKey = "records";

const recordsModel = {
  data: [] as recordType[],

  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKey) || "[]"
    );
    return this.data;
  },

  create(record: recordType) {
    record.createdAt = new Date();
    const record2 = clone(record);
    this.data.push(record2);
  },

  save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
  },
};
export default recordsModel;
