<template>
  <div class="container">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Main from "~/components/Main.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    Main,
    Header,
    Footer
  }
};
</script>

<style>
.container {
  margin: 5px;
  margin-bottom: 55px;
  /* min-height: 100vh; */
}
input {
  font-size: 16px !important;
}
</style>
