<template>
  <div style="margin-bottom: 160px;">
    <div :class="{user_box: !hasLogin, uesr_box_login: hasLogin}">
      <van-button type="primary" round @click="showButton" v-if="!hasLogin">立即登录</van-button>
      <div v-else @click="clickPhoto">
        <van-image round width="50px" height="50px" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
        <div class="text">{{userName}}</div>
      </div>
    </div>
    <van-grid icon-size="24px">
      <van-grid-item icon="like-o" @click="goToLove" text="喜欢" />
      <van-grid-item icon="clock-o" text="最近" />
      <van-grid-item icon="points" text="本地" />
      <van-grid-item icon="star-o" text="关注" />
    </van-grid>

    <van-tabs @click="onTabsClick" style="margin-top: 10px;">
      <van-tab title="我的歌单">
        <SongSheet
          v-for="songSheet in mySongSheetList"
          :key="songSheet.id"
          :url="baseURL + songSheet.img_url"
          :title="songSheet.sheet_name"
          :desc="songSheet.song_sheet_desc"
          @click.native="clickSongSheet(songSheet.id)"
        />
      </van-tab>
      <van-tab title="我的电台">
        <Radio v-for="songSheet in myRadios"
          :key="songSheet.id"
          :url="baseURL + songSheet.img_url"
          :title="songSheet.sheet_name"
          :desc="songSheet.song_sheet_desc"
          @click.native="clickRadio(songSheet.id)"
          />
      </van-tab>
    </van-tabs>

    <Login @loginClose="loginClose" v-if="showLoginPage" />

    <!-- 我喜欢的音乐弹出 -->
    <van-popup v-model="myLoveShow" position="top" closeable :style="{ height: '100%' }">
      <MyLove />
    </van-popup>

    <!-- 左侧菜单弹出 -->
    <Menu @leftMenuClosed="leftMenuClosed" v-if="showLeftMenu" />

    <!-- 歌单音乐弹窗 -->
    <SongSheetMusics v-if="songSheetShow" :sid="currentSongSheetID" @songSheetMusicsClosed="songSheetMusicsClosed" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Login from "~/components/Login.vue";
import Radio from "~/components/Radio.vue";
import MyLove from "~/components/MyLove.vue";
import Menu from "~/components/left_pop/Menu.vue";
import SongSheet from "~/components/SongSheet.vue";
import Musics from "~/components/Musics.vue";
import SongSheetMusics from '~/components/song_sheet/SongSheetMusics.vue'

export default {
  middleware: "checkIsLogin",
  components: {
    Musics,
    Login,
    Radio,
    MyLove,
    Menu,
    SongSheet,
    SongSheetMusics
  },
  data() {
    return {
      baseURL: process.env.APIURL || "http://127.0.0.1:8000",
      myLoveShow: false,
      songSheetShow: false,
      tabsName: ["我的歌单", "我的电台"],
      showLoginPage: false,
      hasLogin: true,
      userName: "",
      showLeftMenu: false,
      mySongSheetList: [],
      songSheetMusics: [],
      currentSongSheetID: null,
      songSheetMusicActions: [
        { name: "播放", id: "play" },
        { name: "播放全部", id: "playall" }
      ],
      myRadios: []
    };
  },
  async created() {
    const tokenVer = this.checklogin();
    console.log("this.checklogin()", tokenVer);
    console.log(this.hasLogin);
  },
  mounted() {
    const userName = this.getUserName();
    const isLogin = this.isLogin();
    this.userName = userName;
    this.hasLogin = isLogin;
    console.log("my page ", userName, isLogin, this.getUserName());
    this.getMyRadio();
    this.$axios
      .$get("/api/v1/music/song_sheets/")
      .then(resp => {
        if (resp.code === 200) {
          this.mySongSheetList = resp.data;
        }
      })
      .catch(err => {});
  },
  computed: {
    storeUserName() {
      return this.$store.state.userName;
    }
  },
  watch: {
    storeUserName(newVal, oldVal) {
      this.userName = newVal;
    }
  },
  methods: {
    clickRadio(radioID) {
      console.log('点击电台')
    },
    getMyRadio() {
      // 获取我创建的电台
      this.$axios.$get("/api/v1/music/radio/").then(resp => {
        if (resp.code === 200) {
          this.myRadios = resp.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    clickSongSheet(sid) {
      this.currentSongSheetID = sid;
      this.songSheetShow = true;
    },
    songSheetMusicsClosed() {
      this.songSheetShow = false
    },
    clickPhoto() {
      this.showLeftMenu = true;
      this.myLoveShow = false;
      this.showLoginPage = false;
    },
    leftMenuClosed() {
      this.showLeftMenu = false;
    },
    goToLove() {
      this.myLoveShow = true;
      this.showLeftMenu = false;
    },
    onTabsClick() {
      console.log("as");
    },
    async checklogin() {
      await this.$axios
        .$post("/api/v1/api-token-verify/", { token: this.$store.state.token })
        .then(res => {
          this.hasLogin = true;

          return true;
        })
        .catch(err => {
          this.hasLogin = false;
          return false;
        });
    },
    showButton() {
      console.log(this.showLoginPage);
      this.showLoginPage = true;
    },
    loginClose(isLogin) {
      this.showLoginPage = !isLogin;
      this.hasLogin = isLogin;
      console.log("传递过来的登录是否成功:", isLogin);
    },
    ...mapGetters({
      getUserName: "getUserName",
      isLogin: "isLogin"
    })
  }
};
</script>

<style scoped>
.uesr_box {
  height: 100px;
  width: 100%;
  margin: 8px;
  text-align: center;
  line-height: 100px;
}
.uesr_box_login {
  height: 100px;
  width: 100%;
  margin: 8px;
  text-align: center;
}
.text {
  margin-top: 5px;
  color: #646566;
  font-size: 14px;
  text-align: center;
}
</style>