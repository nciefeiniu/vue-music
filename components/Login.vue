<template>
  <van-dialog
    v-model="show"
    title="登录"
    :showConfirmButton="false"
    :before-close="closeAction"
    closeOnClickOverlay
  >
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-if="type === 'register'"
        type="email"
        v-model="email"
        name="email"
        label="邮箱地址"
        :rules="[{ validator, message: '请输入正确的邮箱' }]"
        placeholder="邮箱地址"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </van-dialog>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { mapMutations } from "vuex";

export default {
  props: { type: { default: "login" } },
  data() {
    return {
      username: null,
      password: null,
      email: null,
      show: true,
      success: false
    };
  },
  methods: {
    validator(val) {
      const result = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
        val
      );
      if (result === true) {
        this.success = true;
      } else {
        this.success = false;
      }
      return result;
    },
    onSubmit(values) {

      if (this.type === "register" && this.success === false) {
        return;
      }
      console.log("onSubmit:", values);
      if (this.type === "login") {
        this.login(values);
      } else {
        this.register(values);
      }
    },
    register(values) {
      this.$axios
        .$post("/api/v1/music/account/", values)
        .then(res => {
          Cookie.set("token", res.token);
          Cookie.set("userName", res.username);
          this.setToken(res.token);
          this.setUserName(res.username);
          this.$emit("loginClose", true);
        })
        .catch(err => {
          console.log(err);
          this.$emit("loginClose", false);
        });
    },
    login(values) {
      this.$axios
        .$post("/api/v1/api-token-auth/", values)
        .then(res => {
          Cookie.set("token", res.token);
          Cookie.set("userName", res.username);
          this.setToken(res.token);
          this.setUserName(res.username);
          this.$emit("loginClose", true);
        })
        .catch(err => {
          console.log(err);
          this.$emit("loginClose", false);
        });
    },
    closeAction(action, done) {
      console.log("关闭弹窗");

      this.$emit("loginClose", true);
      done();
    },
    ...mapMutations({
      setToken: "setToken",
      setUserName: "setUserName"
    })
  }
};
</script>

<style scoped>
</style>