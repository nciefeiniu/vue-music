<template>
  <van-search
    v-model="searchVal"
    @search="onSearch"
    @cancel="onCancel"
    shape="round"
    placeholder="搜索"
  />
</template>

<script>
export default {
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
    onSearch(val) {
      console.log(val);
    },
    onCancel() {
      console.log('取消搜索')
    }
  }
};
</script>

<style scoped>
</style>