<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="music_name"
      name="music_name"
      label="歌曲名"
      placeholder="歌曲名"
      :rules="[{ required: true, message: '请填写歌曲名' }]"
    />
    <van-field
      v-model="music_auth"
      name="music_auth"
      label="作者"
      placeholder="作者"
      :rules="[{ required: true, message: '请填写作者' }]"
    />
    <van-uploader accept="audio/*" max-count="1" :after-read="afterRead">
      <van-button icon="video-o" type="primary">上传音乐</van-button>
    </van-uploader>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script>
export default {
  data() {
    return {
      music_name: null,
      music_auth: null
    }
  },
  methods: {
    onSubmit() {
      console.log("提交")
    },
    afterRead(file) {
      if (this.music_name === null || this.music_name === '' || this.music_name === undefined) {
        return
      }
      if (this.music_auth === null || this.music_auth === '' || this.music_auth === undefined) {
        return
      }

      file.status = "uploading";
      file.message = "上传中...";

      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formData = new FormData();
      formData.append("music_name", this.music_name);
      formData.append("file", file.file);
      formData.append("music_auth", this.music_auth)
      let conf = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const that = this;
      this.$axios
        .$post("/api/v1/music/upload/music/", formData, conf)
        .then(resp => {
          console.log(resp);
          Notify({ type: "primary", message: "上传音乐成功" });
          const baseurl = process.env.APIURL || "http://127.0.0.1:8000/";
          console.log(resp);
        })
        .catch(err => {
          Notify({ type: "danger", message: "上传失败" });
        });
    }
  }
};
</script>

<style>
</style>