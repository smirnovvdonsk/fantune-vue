<template>
  <div>
    <PhysInput
      :obj="query"
      v-for="val in [
        ['n', 'n', 'мин<sup>-1</sup>', 'Частота вращения', 0],
        ['t', 't', '°C', 'Температура', 1],
        ['Q', 'Q', 'м<sup>3</sup>/ч', 'Производительность', 0],
        ['Pv', 'P<sub>v</sub>', 'Па', 'Полное давление', 0],
      ]"
      :valuename="val[0]"
      :prepend="val[1]"
      :append="val[2]"
      :tooltip="val[3]"
      :tofixed="val[4]"
      :key="val[0]"
      :cookie="`${cookiePrefix}${val[0]}`"
      @change="change"
    >
    </PhysInput>
    <div class="form-check">
      <input
        v-model="twinSide"
        type="checkbox"
        class="form-check-input"
        id="fantune-twin-side-checkbox"
        @change="change"
      />
      <label class="form-check-label" for="fantune-twin-side-checkbox"
        >Двусторонний всас</label
      >
    </div>
    <div class="row">
      <div
        class="col"
        v-for="val in [
          ['ny', 'n<sub>y</sub>', '', 'Требуемая быстроходность', 1],
          ['ρ', 'ρ', 'кг/м<sup>3</sup>', 'Плотность', 2],
        ]"
        :key="val[0]"
      >
        <PhysOutput
          :obj="result"
          :valuename="val[0]"
          :prepend="val[1]"
          :append="val[2]"
          :tooltip="val[3]"
          :tofixed="val[4]"
        >
        </PhysOutput>
      </div>
    </div>
  </div>
</template>

<script>
import PhysInput from "./PhysInput.vue";
import PhysOutput from "./PhysOutput.vue";

export default {
  name: "QueryForm",
  props: {
    query: Object,
    result: Object,
    cookiePrefix: String,
  },
  computed: {
    twinSide: {
      get() {
        if (this.query.depth > 1) return true;
        else return false;
      },
      set(value) {
        if (value) this.query.depth = 2;
        else this.query.depth = 1;
      },
    },
    cookiePrefix_twinSide() {
      return `${this.cookiePrefix}twinside`;
    },
  },
  methods: {
    change() {
      this.saveCookie_twinSide();
      this.$emit("change");
    },
    saveCookie_twinSide() {
      localStorage.setItem(this.cookiePrefix_twinSide, this.twinSide);
    },
    loadCookie_twinSide() {
      let value = localStorage.getItem(this.cookiePrefix_twinSide);
      if (value !== null) {
        this.twinSide = value && value == "true";
      }
    },
  },
  mounted() {
    this.loadCookie_twinSide();
  },
  components: {
    PhysInput,
    PhysOutput,
  },
  emits: ["change"],
};
</script>
