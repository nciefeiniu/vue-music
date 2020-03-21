<template>
  <div>
    <van-button type="primary" @click="showButton">显示登录</van-button>
    <Login @loginClose="loginClose" v-if="showLoginPage" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Login from "~/components/Login.vue";

export default {
  data() {
    return {
      showLoginPage: false
    };
  },
  middleware: "checkIsLogin",
  components: {
    Login
  },
  mounted() {
    const userName = this.getUserName();
    const isLogin = this.isLogin();
    console.log('my page ',userName, isLogin, this.getUserName());
    this.checklogin()
  },
  methods: {
    checklogin(){
      this.$axios.$post('/api/v1/api-token-verify/', {token: this.$store.state.token})
    },
    showButton() {
      console.log(this.showLoginPage);
      this.showLoginPage = true;
    },
    loginClose() {
      this.showLoginPage = false;
    },
    ...mapGetters({
      getUserName: "getUserName",
      isLogin: "isLogin"
    })
  }
};
</script>

<style scoped>
</style>