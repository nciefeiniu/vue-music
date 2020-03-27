<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="songSheetInfo.sheet_name"
      name="歌单名"
      label="歌单名"
      placeholder="歌单名"
      :rules="[{ required: true, message: '请填写歌单名' }]"
    />
    <van-field
      v-model="songSheetInfo.song_sheet_desc"
      autosize
      rows="2"
      label="简介"
      type="textarea"
      placeholder="请输入歌单介绍"
      :rules="[{ required: true, message: '请输入歌单介绍' }]"
    />
    <!-- 上传图片 -->
    <van-uploader :after-read="afterRead" v-model="fileList" :max-count="1" />

    <van-radio-group icon-size="15px" v-model="songSheetInfo.is_public" direction="horizontal">
      <van-radio name="true">公开</van-radio>
      <van-radio name="false">不公开</van-radio>
    </van-radio-group>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify);

export default {
  data() {
    return {
      songSheetInfo: {
        sheet_name: "",
        img_url: "",
        song_sheet_desc: "",
        is_public: focus
      },
      fileList: []
    };
  },
  methods: {
    onSubmit() {
      console.log("当前填写的信息：", this.songSheetInfo);
      if (this.songSheetInfo.is_public === "true") {
        this.songSheetInfo.is_public = true;
      } else {
        this.songSheetInfo.is_public = false;
      }
      this.$axios
        .$post("/api/v1/music/song_sheet/", this.songSheetInfo)
        .then(resp => {
          if (resp.code === 200) {
            Notify({ type: 'success', message: '创建歌单成功' });
          } else {
            Notify({ type: 'warning', message: '创建歌单失败' });
          }
        })
        .catch(err => {
          console.log(err);
          Notify({ type: 'warning', message: '请求创建歌单失败，请稍后再试。' });
        });
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formData = new FormData();
      formData.append("name", "test");
      formData.append("file", file.file);
      let conf = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const that = this;
      this.$axios
        .$post("/api/v1/music/upload_image/", formData, conf)
        .then(resp => {
          console.log(resp);
          if (! process.client) {
            console.log(process.env)
          console.log("环境变量", process.env.APIURL)
          }
          console.log(process.env)
          console.log("环境变量", process.env.APIURL)
          const baseurl = process.env.APIURL || "http://127.0.0.1:8000/";
          that.fileList = [
            {
              url: baseurl + resp.relative_url,
              status: "done",
              message: "上传ok"
            }
          ];
          that.songSheetInfo.img_url = baseurl + resp.relative_url;
          console.log(this.fileList);
        })
        .catch(err => {
          that.fileList = [
            {
              url: "",
              status: "failed",
              message: "上传失败"
            }
          ];
        });
    }
  }
};
</script>

<style scoped>
</style>