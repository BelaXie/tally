const localStorageKey = "records";
const recordsModel = {
  clone(data: recordType[] | recordType) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKey) || "[]"
    ) as recordType[];
  },
  save(value: recordType[]) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(value));
  },
};
export default recordsModel;
