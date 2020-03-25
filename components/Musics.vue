<template>
  <div>
    <van-list>
      <van-cell
        v-for="item in musicList"
        :key="item.id"
        clickable
        @click="addToMusic(item)"
        :title="item.music_name"
        :label="item.music_auth"
      >
        <template #right-icon>
          <van-icon name="like-o" style="line-height: inherit;" />
        </template>
      </van-cell>
    </van-list>
    <!-- 选择 -->
    <van-action-sheet v-model="showSelect" :actions="actions" @select="onSelect" />
    <!-- 添加歌曲到歌单 -->
    <Add2SongSheet
      :musicId="musicId"
      @addSongSheetClosed="addSongSheetClosed"
      v-if="showAddMusicSongSheet"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Add2SongSheet from "~/components/song_sheet/Add2SongSheet.vue";

export default {
  props: {
    musicList: {
      default: () => {
        return [];
      }
    },
    actions: {
      default: () => {
        return [
          { name: "播放", id: "play" },
          { name: "加入播放列表", id: "add_plays" },
          { name: "喜欢", id: "love" },
          { name: "加入歌单", id: "addSongSheet" }
        ];
      }
    }
  },
  components: {
    Add2SongSheet
  },
  data() {
    return {
      showAddMusicSongSheet: false,
      showSelect: false,
      currentMusicInfo: {},
      musicId: null
    };
  },
  methods: {
    onSelect(item) {
      console.log(item);
      this.showSelect = false;
      let musicInfo = this.currentMusicInfo;
      if (item.id === "play") {
        this.pushMusicList(musicInfo);
        this.setCurrentName(musicInfo.music_name);
        console.log("vuex: ", this.getMusicList());
        this.setCurrentID(musicInfo.id);
        // this.setCurrentName(musicInfo.music_name);
      } else if (item.id === "add_plays") {
        this.pushMusicListWait(musicInfo);
      } else if (item.id === "love") {
        this.addToMyLoveMusic(item);
      } else if (item.id === "addSongSheet") {
        console.log("添加音乐到歌单", musicInfo);
        this.showSelect = false;
        this.musicId = musicInfo.id;
        this.showAddMusicSongSheet = true;
      } else if (item.id === "playall") {
        this.setMusicList(this.musicList)
        this.setCurrentName(this.musicList[0].music_name);
        console.log("vuex: ", this.getMusicList());
        this.setCurrentID(this.musicList[0].id);
      }
    },
    addSongSheetClosed() {
      this.showAddMusicSongSheet = false;
    },
    addToMyLoveMusic(item) {
      this.$axios
        .$post("/api/v1/music/love_music/", this.currentMusicInfo)
        .then(resp => {
          console.log(resp);
          Toast.success("添加到喜欢歌曲OK");
        })
        .catch(err => {
          console.log(err);
        });
    },
    addToMusic(musicInfo) {
      // 播放音乐
      console.log("点击音乐", musicInfo);
      this.currentMusicInfo = musicInfo;
      this.showSelect = true;
    },
    ...mapMutations({
      setMusicList: "music/setMusicList",
      pushMusicList: "music/pushMusicList",
      setCurrentName: "music/setCurrentName",
      setCurrentID: "music/setCurrentID",
      pushMusicListWait: "music/pushMusicListWait"
    }),
    ...mapGetters({
      getMusicList: "music/getMusicList"
    })
  }
};
</script>

<style scoped>
.music_name {
  font-size: 14px;
  color: black;
  font-weight: 400;
}
.music_auth {
  font-size: 12px;
}
</style>