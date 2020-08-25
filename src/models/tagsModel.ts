const localStorageKey = "tags";
type Tag = {
  id: string;
  name: string;
};
type TagsModel = {
  data: Tag[];
  create: (value: string) => "success" | "duplicated";
  fetch: () => Tag[];
  save: () => void;
};
const tagsModel: TagsModel = {
  data: [],
  create(value) {
      const names=this.data.map(item=>item.name)
    if (names.indexOf(value) >= 0) {
      return "duplicated";
    } else {
      this.data.push({id:value,name:value});
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
