<template>
  <div>
    <transition appear name="slide-fade">
      <Header height="25">
        Это пример использования компонента Vue для FanTune. Приложение не
        полноценно. Подбор вентилятора не работает.
      </Header>
    </transition>

    <FanTune
      :query="query"
      :result="result"
      :searching="searching"
      :notFound="notFound"
      :connected="connected"
      :online="online"
      @changeInputParams="onInput"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import FanTune from "./components/FanTune.vue";

import favicon from "./assets/favicon.svg";

import FanQuery from "./models/fanQuery.js";
import exampleOfResult from "./models/exampleOfResult.js";

export default {
  data() {
    return {
      query: new FanQuery(),
      result: {},
      searching: false,
      notFound: false,
      connected: false, // факт подключения к серверу
      online: false, // серверу доступны базы данных
    };
  },
  computed: {
    favicon() {
      return favicon;
    },
  },
  methods: {
    setFavicon(href) {
      let favicon = document.head.querySelector("link[rel~='icon']");
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = href;
    },
    setTitle(title) {
      let titleElement = document.head.querySelector("title");
      if (!titleElement) {
        titleElement = document.createElement("title");
        document.head.appendChild(titleElement);
      }
      titleElement.innerHTML = title;
    },
    onInput() {
      // Эта функция вызывается, когда пользователь меняет значение в форме подбора вентилятора
      this.notFound = true;
      this.result = {};
    },
  },
  mounted() {
    this.setTitle("FanTune");
    this.setFavicon(favicon);
    setTimeout(() => (this.connected = true), 3000);
    setTimeout(() => (this.online = true), 6000);
    setTimeout(() => (this.searching = true), 9000);
    setTimeout(() => {
      this.searching = false;
      this.result = exampleOfResult;
    }, 12000);
  },
  components: {
    Header,
    FanTune,
  },
};
</script>
