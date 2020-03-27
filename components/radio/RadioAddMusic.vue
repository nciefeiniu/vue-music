<template>
  <van-popup v-model="showPop" closeable position="bottom" @closed="popClosed" :style="{ height: '60%' }">
    <Radio
      v-for="songSheet in mySongSheetList"
      :key="songSheet.id"
      :url="baseURL + songSheet.img_url"
      :title="songSheet.sheet_name"
      :desc="songSheet.song_sheet_desc"
      @click.native="add2SongSheet(songSheet.id)"
    />
  </van-popup>
</template>

<script>
import Vue from 'vue';
import { Notify } from 'vant';
import Radio from "~/components/Radio.vue";


Vue.use(Notify);

export default {
  props: {musicId: {default: null}},
  components: {
    Radio
  },
  data() {
    return {
      baseURL: process.env.APIURL || "http://127.0.0.1:8000",
      showPop: false,
      mySongSheetList: []
    };
  },
  created() {
    this.getMySongSheets()
  },
  mounted() {
    this.showPop = true;
  },
  methods: {
    popClosed() {
      this.$emit("addSongSheetClosed", true)
    },
    getMySongSheets() {
      this.$axios
        .$get("/api/v1/music/radio_list/")
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
      this.$axios.$post("/api/v1/music/radio/music/", {music_id: this.musicId, radio_station_id: songSheetID}).then(resp => {
        console.log(resp);
        if(resp.code === 200) {
          Notify({ type: 'success', message: '成功添加音乐到电台' });
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