import createId from "@/lib/createId";

const localStorageKeyName = "tags";

const tagStore = {
  tags: [] as Tag[],
  fetchTags() {
    this.tags = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.tags;
  },
  findTag(id: string) {
    return this.tags.filter((t) => t.id === id)[0];
  },
  createTag(name: string) {
    const names = this.tags.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert("标签名重复了");
      return "duplicated";
    }
    const id = createId().toString();
    this.tags.push({ id, name: name });
    this.saveTags();
    window.alert("添加成功");
    return "success";
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].id === id) {
        index = i;
        break;
      }
    }
    this.tags.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tags.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tags.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.tags.filter((item) => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return "success";
      }
    } else {
      return "not found";
    }
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tags));
  },
};

tagStore.fetchTags();

export default tagStore;
