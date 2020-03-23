<template>
  <div style="margin-bottom: 160px;">
    <div :class="{user_box: !hasLogin, uesr_box_login: hasLogin}">
      <van-button type="primary" round @click="showButton" v-if="!hasLogin">立即登录</van-button>
      <div v-else>
        <van-image round width="50px" height="50px" src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
        <div class="text">啦啦啦</div>
      </div>
    </div>
    <van-grid icon-size="24px">
      <van-grid-item icon="like-o" @click="goToLove" text="喜欢" />
      <van-grid-item icon="clock-o" text="最近" />
      <van-grid-item icon="points" text="本地" />
      <van-grid-item icon="star-o" text="关注" />
    </van-grid>

    <van-tabs @click="onTabsClick" style="margin-top: 10px;">
      <van-tab title="我的歌单"></van-tab>
      <van-tab title="我的电台">
        <Radio />
      </van-tab>
    </van-tabs>

    <Login @loginClose="loginClose" v-if="showLoginPage" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Login from "~/components/Login.vue";
import Radio from "~/components/Radio.vue";

export default {
  data() {
    return {
      tabsName: ["我的歌单", "我的电台"],
      showLoginPage: false,
      hasLogin: true
    };
  },
  middleware: "checkIsLogin",
  components: {
    Login,
    Radio
  },
  async created() {
    const tokenVer = this.checklogin();
    console.log("this.checklogin()", tokenVer);
    console.log(this.hasLogin);
  },
  mounted() {
    const userName = this.getUserName();
    const isLogin = this.isLogin();
    this.hasLogin = isLogin;
    console.log("my page ", userName, isLogin, this.getUserName());
  },
  methods: {
    goToLove() {
      this.$router.push('/myLove');
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
      console.log("传递过来的登录是否成功:", isLogin)
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