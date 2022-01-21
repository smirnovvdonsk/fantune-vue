<template>
  <div v-if="obj" class="input-group my-1 py-0" :title="tooltip">
    <span class="input-group-text px-2 py-1" ref="tooltipobj1" :title="tooltip"
      ><span v-html="prepend"></span><span>&nbsp;=</span></span
    >
    <input
      class="form-control px-2 py-1"
      :class="{ 'is-invalid': isInvalid }"
      v-model="text"
      ref="tooltipobj2"
      :title="tooltip"
    />
    <button
      class="btn btn-outline-secondary d-print-none px-2 py-1"
      @click="prevR160"
    >
      -
    </button>
    <button
      class="btn btn-outline-secondary d-print-none px-2 py-1"
      @click="nextR160"
    >
      +
    </button>
    <span
      class="input-group-text px-2 py-1"
      v-html="append"
      ref="tooltipobj3"
      :title="tooltip"
    ></span>
  </div>
</template>


<script>
import { nextR160, prevR160 } from "@smirnovvdonsk/preffered-numbers";
import CONST from "../models/const";

import { Tooltip } from "bootstrap";

export default {
  name: "PhysInput",
  props: {
    obj: Object, // Ссылка на объект, свойство которого будет изменяться
    valuename: String, // Имя свойства в объектк obj, которое будет изменяться
    prepend: String,
    append: String,
    tooltip: String,
    tofixed: {
      type: Number,
      default: 12,
    },
    cookie: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.bootstrap_tooltip = ["tooltipobj1", "tooltipobj2", "tooltipobj3"].map(
      (ref) => new Tooltip(this.$refs[ref])
    );
    this.loadCookie();
  },
  updated() {
    this.saveCookie();
    this.$emit("change");
  },
  computed: {
    text: {
      // Текст в инпуте
      set(value) {
        // При изменении пользователем
        if (value === "-") {
          this.valueNumber = -CONST.TOLERANCE;
          return;
        }
        if (this.toNumber(value) === this.toNumber(this._oldText)) return;
        this._oldText = value;
        this.valueNumber = this.toNumber(value);
      },
      get() {
        // При изменении из объекта
        if (+this.valueNumber === -CONST.TOLERANCE) return "-";
        return this.toString(+this.valueNumber.toFixed(this.tofixed));
      },
    },
    valueNumber: {
      // Число в объекте
      get() {
        // При изменении извне
        return this.obj[this.valuename];
      },
      set(value) {
        // При изменении пользователем
        this.obj[this.valuename] = value;
      },
    },
    isInvalid() {
      // Введённое пользователем число некорректно
      return isNaN(this.valueNumber);
    },
    isValid() {
      // Введённое пользователем число некорректно
      return !this.isInvalid;
    },
    cookieIsExist() {
      return typeof this.cookie === "string" && this.cookie !== "";
    },
  },
  methods: {
    saveCookie() {
      if (this.isValid) localStorage.setItem(this.cookie, this.valueNumber);
      else localStorage.removeItem(this.cookie);
    },
    loadCookie() {
      if (this.cookieIsExist) {
        let text = localStorage.getItem(this.cookie);
        this.text = text;
      }
      this._oldText = this.text;
    },
    toString(value) {
      if (value === undefined || isNaN(value)) return "";
      return value.toString().replace(".", ",");
    },
    toNumber(value) {
      if (value === undefined || typeof value !== "string") return NaN;
      return +value.replace(",", ".");
    },
    nextR160() {
      let oldValue = +this.valueNumber;
      let newValue = nextR160(oldValue);
      let didntChanged =
        +newValue.toFixed(this.tofixed) === +oldValue.toFixed(this.tofixed);
      let zero = +oldValue.toFixed(this.tofixed) === 0;
      if (zero || didntChanged) newValue += Math.pow(10, -this.tofixed);
      this.valueNumber = newValue;
    },
    prevR160() {
      let oldValue = +this.valueNumber;
      let newValue = prevR160(oldValue);
      let didntChanged =
        +newValue.toFixed(this.tofixed) === +oldValue.toFixed(this.tofixed);
      let zero = +oldValue.toFixed(this.tofixed) === 0;
      if (zero || didntChanged) newValue -= Math.pow(10, -this.tofixed);
      this.valueNumber = newValue;
    },
  },
  emits: ["change"],
};
</script>