<template>
  <van-popup v-model="showPop" closeable position="bottom" @closed="popClosed" :style="{ height: '60%' }">
    <SongSheet
      v-for="songSheet in mySongSheetList"
      :key="songSheet.id"
      :url="songSheet.img_url"
      :title="songSheet.sheet_name"
      :desc="songSheet.song_sheet_desc"
      @click.native="add2SongSheet(songSheet.id)"
    />
  </van-popup>
</template>

<script>
import SongSheet from "~/components/SongSheet.vue";
import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify);

export default {
  props: {musicId: {default: null}},
  components: {
    SongSheet
  },
  data() {
    return {
      showPop: true,
      mySongSheetList: []
    };
  },
  created() {
    this.getMySongSheets()
  },
  methods: {
    popClosed() {
      this.$emit("addSongSheetClosed", true)
    },
    getMySongSheets() {
      this.$axios
        .$get("/api/v1/music/song_sheets/")
        .then(resp => {
          if (resp.code === 200) {
            this.mySongSheetList = resp.data;
          }
        })
        .catch(err => {});
    },
    add2SongSheet(songSheetID) {
      console.log("请求添加API")
      if (!this.musicId) {
        return
      }
      this.$axios.$post("/api/v1/music/songsheet/music/", {music_id: this.musicId, song_sheet_id: songSheetID}).then(resp => {
        console.log(resp);
        if(resp.code === 200) {
          Notify({ type: 'success', message: '成功添加音乐到歌单' });
          this.showPop = false;
        } else {
          Notify({ type: 'danger', message: '添加失败，请稍后再试' });
        }
      }).catch(err => {
        Notify({ type: 'danger', message: '请求后端服务器失败，请稍后再试。' });
      })
    }
  }
};
</script>

<style>
</style>