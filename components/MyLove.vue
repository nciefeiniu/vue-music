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