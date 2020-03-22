<template>
<div>
  <van-search
    v-model="searchVal"
    @search="onSearch"
    @cancel="onCancel"
    @focus='onFocus'
    show-action
    shape="round"
    placeholder="搜索"
    style="font-size: 16px!important;"
  />
  <Musics :musicList="musicList" v-show="showMusic"/>
</div>
</template>

<script>
import Musics from '~/components/Musics.vue';

export default {
  components: {
    Musics
  },
  data() {
    return {
      searchVal: "",
      showMusic: false,
      musicList: []
    };
  },
  methods: {
    onFocus() {
      console.log('点击输入框')
      this.showMusic = true;
    },
    onSearch(val) {
      const that = this;
      console.log(val);
      this.$axios.$get("/api/v1/music/search" + '?keyword=' + val).then((res) => {
        console.log(res);
        if (res.code === 200) {
          that.musicList = res.data;
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    onCancel() {
      console.log('取消搜索')
      this.showMusic = false;
    }
  }
};
</script>

<style scoped>
</style>