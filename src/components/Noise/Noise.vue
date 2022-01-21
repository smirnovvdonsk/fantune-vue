<template>
  <div class="table-responsive">
    <table class="table table-sm table-bordered table-fantune-noise">
      <NoiseTable :noisefan="originalNoise" :freqs="freqs">
        <div>Уровни звуковой мощности</div>
        <div>без шумоглушителей</div>
      </NoiseTable>
      <thead>
        <tr class="">
          <th :colspan="freqs.length + 2">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-xxl my-1">
                  <div class="input-group">
                    <span class="input-group-text">Добавить глушитель:</span>
                    <button
                      @click="addMuffler('inlet')"
                      type="button"
                      class="btn btn-outline-primary"
                    >
                      <i class="fas fa-sign-in-alt"></i>&nbsp;вход
                    </button>
                    <button
                      @click="addMuffler('outlet')"
                      type="button"
                      class="btn btn-outline-primary"
                    >
                      <i class="fas fa-sign-out-alt"></i>&nbsp;выход
                    </button>
                    <button
                      @click="addMuffler('case')"
                      type="button"
                      class="btn btn-outline-primary"
                    >
                      <i class="fas fa-square"></i>&nbsp;корпус
                    </button>
                  </div>
                </div>
                <div class="col-xxl my-1">
                  <div class="input-group">
                    <span class="input-group-text"
                      >Мат&nbsp;<img
                        :src="rockwoolLogo"
                        height="20"
                      />&nbsp;на корпус:</span
                    >
                    <select class="form-select" v-model="rockwoolMate">
                      <option
                        v-for="mate in rockwoolMates"
                        :value="mate"
                        :key="mate"
                      >
                        {{ mate.name }}
                      </option>
                    </select>
                    <transition appear name="fade-scale">
                      <button
                        v-show="rockwoolMate"
                        @click="addMuffler('case', rockwoolMate)"
                        type="button"
                        class="btn btn-outline-primary"
                      >
                        <i class="fas fa-plus"></i>&nbsp;добавить
                      </button>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <transition appear name="fade-scale">
        <thead
          v-if="mufflers.all.length"
          class="table-fantune-header text-center"
        >
          <tr>
            <th rowspan="2" colspan="2" scope="col">Глушители</th>
            <th :colspan="freqs.length" scope="col">
              <div>дБ, по октавным полосам, Гц</div>
            </th>
          </tr>
          <tr>
            <th scope="col" v-for="freq in freqs" :key="freq">
              <div>{{ freq }}</div>
            </th>
          </tr>
        </thead>
      </transition>
      <tbody>
        <template v-for="point in noisePoints">
          <template v-if="mufflers[point.name].length">
            <MufflerRow
              v-for="(muffler, index) in mufflers[point.name]"
              :muffler="muffler"
              :key="index"
            >
              {{ point.titleMuffler }}
              <button
                @click="mufflers[point.name].splice(index, 1)"
                type="button"
                class="btn btn-sm btn-outline-danger mx-1 p-1"
              >
                <i class="fas fa-trash-alt"></i>&nbsp;Удалить
              </button>
            </MufflerRow>
          </template>
        </template>
      </tbody>

      <NoiseTable
        v-if="mufflers.all.length"
        :noisefan="reducedNoise"
        :freqs="freqs"
      >
        <div>Уровни звуковой мощности</div>
        <div>после шумоглушителей</div>
      </NoiseTable>
    </table>
  </div>
</template>

<script>
import NoiseTable from "./NoiseTable.vue";
import MufflerRow from "./MufflerRow.vue";

import Muffler from "../../models/muffler.js";
import CONST from "../../models/const.js";
import ROCKWOOL_MATES from "./rockwool/mates.js";

import rockwoolLogo from './rockwool/rockwool.svg';

export default {
  name: "Noise",
  props: {
    fan: Object,
    mufflers: Object,
    cookie: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      rockwoolMate: null,
    };
  },
  computed: {
    rockwoolLogo() { return rockwoolLogo },
    freqs() {
      return CONST.FREQS;
    },
    fanNoise() {
      return this.fan.noise;
    },
    noisePoints() {
      return [
        {
          name: "inlet",
          titleNoise: "в сеть на входе",
          titleMuffler: "на входе",
          power: "Lwin",
        },
        {
          name: "outlet",
          titleNoise: "в сеть на выходе",
          titleMuffler: "на выходе",
          power: "Lwout",
        },
        {
          name: "case",
          titleNoise: "от корпуса",
          titleMuffler: "на корпусе",
          power: "Lwcase",
        },
      ];
    },
    originalNoise() {
      let selection = this;
      return this.noisePoints.map(function (point) {
        return {
          name: point.name,
          title: point.titleNoise,
          total: selection.fanNoise[`${point.power}Corr`],
          octaves: selection.fanNoise[point.power],
        };
      });
    },
    reducedNoise() {
      let noise = this.mufflers.muffle(this.fanNoise);
      return this.noisePoints.map(function (point) {
        return {
          name: point.name,
          title: point.titleNoise,
          total: noise[`${point.power}Corr`],
          octaves: noise[point.power],
        };
      });
    },
    rockwoolMates() {
      return ROCKWOOL_MATES.map(function (mate) {
        return {
          name: `${mate.type} ● ${mate.density} ● ${mate.thickness}`,
          αArray: mate.arr,
        };
      });
    },
    mufflersCookieName() {
      if (typeof this.cookie === "string" && this.cookie !== "")
        return `${this.cookie}-mufflers`;
    },
  },
  methods: {
    addMuffler(where = "inlet", mufflerObj = {}) {
      if (this.mufflers.hasOwnProperty(where))
        this.mufflers[where].push(new Muffler(mufflerObj));
    },
    saveMufflersCookie() {
      if (this.mufflersCookieName) {
        let mufflers = {
          inlet: this.mufflers.inlet.map((muffler) => muffler.dBArray),
          outlet: this.mufflers.outlet.map((muffler) => muffler.dBArray),
          case: this.mufflers.case.map((muffler) => muffler.dBArray),
        };
        localStorage.setItem(this.mufflersCookieName, JSON.stringify(mufflers));
      }
    },
    loadMufflersCookie() {
      let mufflers = this.mufflers;
      if (this.mufflersCookieName) {
        let cookie = JSON.parse(localStorage.getItem(this.mufflersCookieName));
        if (cookie !== null) {
          let cookieMufflers = JSON.parse(
            localStorage.getItem(this.mufflersCookieName)
          );
          this.noisePoints.forEach((point) => {
            mufflers[point.name] = [];
            cookieMufflers[point.name].forEach((muffler) => {
              this.addMuffler(point.name, { dBArray: muffler });
            });
          });
        }
      }
    },
  },
  mounted() {
    this.loadMufflersCookie();
  },
  updated() {
    this.saveMufflersCookie();
  },
  components: {
    NoiseTable,
    MufflerRow,
  },
};
</script>

<style scoped lang="scss">
@import "@fortawesome/fontawesome-free/css/fontawesome.css";
@import "@fortawesome/fontawesome-free/css/solid.css";

.table-fantune-noise {
  .dark {
    background-color: #495057;
    color: #f8f9fa;
    border-color: #adb5bd;
  }
  margin: 0;
}
</style>
