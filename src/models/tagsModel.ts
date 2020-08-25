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
  update: (id: string, name: string) => "success" | "duplicated" | "not found";
};
const tagsModel: TagsModel = {
  data: [],
  create(value) {
    const names = this.data.map((item) => item.name);
    if (names.indexOf(value) >= 0) {
      return "duplicated";
    } else {
      this.data.push({ id: value, name: value });
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
  update(id: string, name: string) {
    const ids = this.data.map((item) => item.id);
    if (ids.indexOf(id) >= 0) {
      const names = this.data.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.name = name;
        this.save();
        return "success";
      }
    } else {
      return "not found";
    }
  },
};
export default tagsModel;
