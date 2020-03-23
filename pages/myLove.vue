<template>
  <div>
    <van-nav-bar title="我喜欢的音乐" left-text="返回" left-arrow @click-left="onClickLeft" />
    <Musics :musicList="musicList" />
  </div>
</template>

<script>
import Musics from "~/components/Musics.vue";

export default {
  components: {
    Musics
  },
  data() {
    return {
      musicList: []
    };
  },
  created() {
    this.$axios
      .$get("/api/v1/music/love_music")
      .then(resp => {
        this.musicList = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {}
  }
};
</script>

<style scoped>
</style>