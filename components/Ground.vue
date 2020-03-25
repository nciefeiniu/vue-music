<template>
  <div style="margin-bottom: 110px;">
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img
            style="width: 100%; height: 150px; transform: translateX(0px);"
            fit="contain"
            v-lazy="image"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-grid icon-size="24px">
        <van-grid-item icon="friends" text="歌手" />
        <van-grid-item icon="music" @click="showHotMusic" text="热歌" />
        <van-grid-item icon="bars" text="分类" />
        <van-grid-item icon="audio" @click="goToRadio" text="电台" />
      </van-grid>
    </div>
    <!-- 分割线 -->
    <DividingLine title="为你推荐歌单" />
    <!-- 歌单 -->
    <SongSheet
      v-for="songSheet in publicSongSheetList"
      :key="songSheet.id"
      :url="songSheet.img_url"
      :title="songSheet.sheet_name"
      :desc="songSheet.song_sheet_desc"
      @click.native="clickSongSheet(songSheet.id)"
    />

    <!-- 热歌 -->
    <van-popup v-model="hotMusicShow" position="top" closeable :style="{ height: '100%' }">
      <HotMuisc />
    </van-popup>

    <!-- 歌单音乐弹窗 -->
    <SongSheetMusics v-if="songSheetShow" :sid="currentSongSheetID" @songSheetMusicsClosed="songSheetMusicsClosed" />
  </div>
</template>

<script>
import DividingLine from "~/components/DividingLine.vue";
import SongSheet from "~/components/SongSheet.vue";
import HotMuisc from "~/components/HotMusic.vue";
import { mapMutations } from "vuex";
import SongSheetMusics from '~/components/song_sheet/SongSheetMusics.vue'


import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);

export default {
  components: {
    DividingLine,
    SongSheet,
    HotMuisc,
    SongSheetMusics
  },
  data() {
    return {
      songSheetShow: false,
      currentSongSheetID: null,
      publicSongSheetList: [],
      hotMusicShow: false,
      images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]
    };
  },
  mounted(){
    this.getPublicSongSheet();
  },
  methods: {
    clickSongSheet(sid) {
      this.currentSongSheetID = sid;
      this.songSheetShow = true;
    },
    songSheetMusicsClosed() {
      this.songSheetShow = false
    },
    getPublicSongSheet() {
      this.$axios
        .$get("/api/v1/music/public_song_sheet/")
        .then(resp => {
          if (resp.code === 200) {
            this.publicSongSheetList = resp.data;
          }
        })
        .catch(err => {});
    },
    showHotMusic() {
      this.hotMusicShow = true;
    },
    ...mapMutations({
      change: "pages/change"
    }),
    goToRadio() {
      this.change(1);
    }
  }
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>