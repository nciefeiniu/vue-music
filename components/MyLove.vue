<template>
  <div style="margin-top: 30px;">
    <Musics :musicList="musicList" :actions="actions" />
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
      musicList: [],
      actions: [
          { name: "播放", id: "play" },
          { name: "加入播放列表", id: "add_plays" },
        ]
    };
  },
  mounted() {
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