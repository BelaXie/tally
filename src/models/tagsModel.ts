import createId from "../lib/createId";
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
  remove: (id: string) => boolean;
};
const tagsModel: TagsModel = {
  data: [],
  create(value) {
    const names = this.data.map((item) => item.name);
    const id = createId().toString();
    if (names.indexOf(value) >= 0) {
      return "duplicated";
    } else {
      this.data.push({ id, name: value });
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
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
};
export default tagsModel;
