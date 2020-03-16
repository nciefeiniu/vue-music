<template>
  <h2 class="van-doc-demo-block__title">
    <span class="title">{{title}}</span>
    <span class="more">更多></span>
  </h2>
</template>

<script>
export default {
  props: {title: {default: ''}}
}
</script>

<style scoped>
.van-doc-demo-block__title {
    margin: 0;
    padding: 16px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    /* font-size: 14px; */
    line-height: 16px;
}
.title{
  color: black;
  font-size: 16px!important;
  line-height: 16px;
}
.more{
  font-size: 14px;
  float: right;
  line-height: 16px;
}

</style>