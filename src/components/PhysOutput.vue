<template>
  <div>
    <span ref="tooltipobject" :title="tooltip">
      <span v-html="prepend"></span>
      <span>&nbsp;=&nbsp;</span>
      <transition appear name="fade-scale" mode="out-in">
        <span v-if="defined">
          <span>{{ text }}</span>
          <span>&nbsp;</span>
          <span v-html="text === '∞' ? '' : append"></span>
        </span>
        <div
          v-else
          class="spinner-border spinner-border-sm text-info"
          role="status"
        ></div>
      </transition>
    </span>
  </div>
</template>

<script>
import { Tooltip } from "bootstrap";

export default {
  name: "PhysOutput",
  props: {
    obj: Object, // Ссылка на объект, свойство которого будет отображаться
    valuename: String, // Имя свойства в объектк obj, которое будет отображаться
    prepend: String,
    append: String,
    tooltip: String,
    tofixed: {
      type: Number,
      default: 5,
    },
  },
  mounted() {
    this.bootstrap_tooltip = new Tooltip(this.$refs.tooltipobject);
  },
  computed: {
    defined() {
      return (
        this.obj &&
        this.obj[this.valuename] !== undefined &&
        this.obj[this.valuename] !== null
      );
    },
    text: {
      // Текст в инпуте
      get() {
        // При изменении из объекта
        if (!this.defined || isNaN(+this.valueNumber)) return "";
        let result = this.toString(+this.valueNumber.toFixed(this.tofixed));
        if (result === "Infinity") return "∞";
        return result;
      },
    },
    valueNumber: {
      // Число в объекте
      get() {
        // При изменении извне
        return this.obj[this.valuename];
      },
    },
  },
  methods: {
    toString(value) {
      if (value === undefined || isNaN(value)) return "";
      return value.toString().replace(".", ",");
    },
    toNumber(value) {
      if (value === undefined || typeof value !== "string") return NaN;
      return +value.replace(",", ".");
    },
  },
};
</script>
