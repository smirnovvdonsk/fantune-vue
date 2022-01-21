<template>
  <header class="navbar navbar-expand navbar-light shadow p-1">
    <a v-if="href" type="button" class="btn btn-outline-primary nav-link p-1" :href="href">
      <span class="home">
        <i class="fas fa-home"></i>
      </span>
      На главную
    </a>
    <span class="mx-1"></span>
    <img v-if="img" :src="img" :height="height" /><span>&nbsp;</span>
    <span class="mx-1"></span>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["href", "img", "height"],
};
</script>

<style scoped lang="scss">
@import "@fortawesome/fontawesome-free/css/fontawesome.css";
@import "@fortawesome/fontawesome-free/css/solid.css";
header {
  $header-bg: #e3f2fd !default;
  background-color: $header-bg;
}
.home {
  font-size: 16px;
  color: inherit;
}
</style>
