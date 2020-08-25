<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" placeholder="请输入标签名" :value="tag.name" @update:value="updateTag" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagsModel from "../models/tagsModel";
import FormItem from "@/components/FormItem.vue";

@Component({
  components: { FormItem }
})
export default class EditLabel extends Vue {
  tag?: { id: string; name: string };
  created() {
    const id = this.$route.params.id;
    tagsModel.fetch();
    const tag = tagsModel.data.filter(item => item.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404"); //不用push，防止用户不能直接回退
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      tagsModel.update(this.tag.id, name);
    }
  }
}
</script>
<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>