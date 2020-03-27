<template>
  <!-- 歌单音乐弹窗 -->
  <van-popup
    v-model="songSheetShow"
    position="top"
    closeable
    @closed="songSheetMusicsClosed"
    :style="{ height: '100%' }"
  >
    <van-nav-bar title="歌单歌曲" />
    <div style="margin-top: 30px;">
      <Musics :musicList="songSheetMusics" :actions="songSheetMusicActions" />
    </div>
  </van-popup>
</template>

<script>
import Musics from "~/components/Musics.vue";

export default {
  props: { sid: { default: null } },
  components: {
    Musics
  },
  data() {
    return {
      songSheetShow: false,
      songSheetMusics: [],
      songSheetMusicActions: [
        { name: "播放", id: "play" },
        { name: "播放全部", id: "playall" }
      ]
    };
  },
  created() {
    this.getSongSheetMusics();
  },
  mounted() {
    this.songSheetShow = true;
  },
  methods: {
    getSongSheetMusics() {
      this.$axios
        .$get("/api/v1/music/radio/music/" + this.sid + "/")
        .then(resp => {
          if (resp.code === 200) {
            this.songSheetMusics = resp.data;
          }
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    },
    songSheetMusicsClosed() {
      console.log("关闭歌单的弹窗");
      this.$emit("songSheetMusicsClosed", true);
    }
  }
};
</script>

<style>
</style>