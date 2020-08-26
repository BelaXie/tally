import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    records: [],
    tags: [],
    currentTag: undefined,
  } as StateType,
  mutations: {
    fetchRecords(state) {
      state.records = JSON.parse(
        window.localStorage.getItem("records") || "[]"
      );
    },
    saveRecords(state) {
      window.localStorage.setItem("records", JSON.stringify(state.records));
    },
    createRecord(state, record: recordType) {
      const record2: recordType = clone(record);
      record2.createdAt = new Date().toISOString();
      state.records && state.records.push(record2);
      store.commit("saveRecords");
    },
    fetchTags(state) {
      state.tags = JSON.parse(window.localStorage.getItem("tags") || "[]");
    },
    createTag(state, name: string) {
      const names = state.tags.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复了");
      } else {
        const id = createId().toString();
        state.tags.push({ id, name: name });
        store.commit("saveTags");
        window.alert("添加成功");
      }
    },
    saveTags(state) {
      window.localStorage.setItem("tags", JSON.stringify(state.tags));
    },

    updateTag(state, object: { id: string; name: string }) {
      const { id, name } = object;
      const idList = state.tags.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tags.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复");
        } else {
          const tag = state.tags.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tags.filter((t) => t.id === id)[0];
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tags.length; i++) {
        if (state.tags[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tags.splice(index, 1);
        store.commit("saveTags");
      } else {
        window.alert("删除失败");
      }
    },
  },
});
export default store;
