<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg" ref="selectionCol">
          <transition appear name="fade-scale">
            <PageCard header="Подбор:" v-show="connected && online">
              <QueryForm
                :query="query"
                :result="result"
                :cookiePrefix="cookiePrefix"
                @change="onChangeInputParams"
              />
            </PageCard>
          </transition>

          <transition appear name="fade-scale">
            <div v-if="connected && online">
              <transition appear name="fade-scale" mode="out-in">
                <PageCard
                  header="Подобранный вентилятор:"
                  v-if="result?.optimalFan?.scheme || searching"
                >
                  <ResultFanCard :fan="result?.optimalFan" />
                </PageCard>
                <PageCard v-else>
                  <ResultIsAbsentCard :result="result" />
                </PageCard>
              </transition>
            </div>
          </transition>
        </div>

        <div class="col-lg-8">
          <transition appear name="fade-scale">
            <PageCard
              header="Аэродинамическая характеристика:"
              v-if="connected && online && result?.optimalFan?.graph"
            >
              <Graph
                :fan="result?.optimalFan"
                graphid="fantune-vega-natural-chart"
              />
            </PageCard>
          </transition>
        </div>
      </div>

      <div class="row">
        <div class="col-lg">
          <transition appear name="fade-scale">
            <PageCard
              header="Шумовая характеристика:"
              v-if="connected && online && result?.optimalFan?.noise"
            >
              <Noise
                :fan="result?.optimalFan"
                :mufflers="mufflers"
                :cookie="`${cookiePrefix}noise`"
              />
            </PageCard>
          </transition>
        </div>
      </div>
    </div>

    <!-- Информация о серверах -->
    <transition appear name="fade-scale">
      <div
        v-if="!connected"
        class="bg-danger text-white rounded m-2 p-2 align-baseline"
      >
        <div
          class="spinner-border align-middle text-white mx-2"
          role="status"
        ></div>
        <div class="d-inline align-middle mx-2">Соединяемся с сервером...</div>
      </div>
    </transition>
    <transition appear name="fade-scale">
      <div
        v-if="connected && !online"
        class="bg-danger text-white rounded m-2 p-2"
      >
        <div
          class="spinner-border align-middle text-white mx-2"
          role="status"
        ></div>
        <div class="d-inline align-middle mx-2">
          Сервер пытается получить доступ к базе данных...
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PageCard from "./PageCard.vue";
import PhysInput from "./PhysInput.vue";
import PhysOutput from "./PhysOutput.vue";
import QueryForm from "./QueryForm.vue";
import ResultFanCard from "./ResultFanCard.vue";
import ResultIsAbsentCard from "./ResultIsAbsentCard.vue";
import Graph from "./Graph/Graph.vue";
import Noise from "./Noise/Noise.vue";

import Mufflers from "../models/mufflers.js";

export default {
  name: "FanTune",
  props: {
    query: Object,
    result: Object,
    searching: Boolean,
    notFound: Boolean,
    connected: Boolean, // факт подключения к серверу
    online: Boolean, // серверу доступны базы данных
  },
  data() {
    return {
      mufflers: new Mufflers(),
    };
  },
  computed: {
    cookiePrefix() {
      return "fantune-vue-input-";
    },

  },
  methods: {
    onChangeInputParams() {
      this.$emit("changeInputParams");
    },
  },
  mounted() {},
  components: {
    PageCard,
    PhysInput,
    PhysOutput,
    QueryForm,
    ResultFanCard,
    ResultIsAbsentCard,
    Graph,
    Noise,
  },
};
</script>
