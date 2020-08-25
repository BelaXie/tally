const localStorageKey = "tags";
type TagsModel = {
  data: string[];
  create: (value: string) => "success" | "duplicated";
  fetch: () => string[];
  save: () => void;
};
const tagsModel: TagsModel = {
  data: [],
  create(value) {
    if (this.data.indexOf(value) >= 0) {
      return "duplicated";
    } else {
      this.data.push(value);
      this.save();
      return "success";
    }
  },
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKey) || "[]"
    );
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
  },
};
export default tagsModel;
