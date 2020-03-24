<template>
  <div style="margin-top: 30px;">
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
  mounted() {
    const that = this;
    this.$axios
      .$get("/api/v1/music/hot")
      .then(resp => {
        that.musicList = resp.data;
        console.log("这是热歌：", that.musicList)
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