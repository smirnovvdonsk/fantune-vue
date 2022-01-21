<template>
  <div v-if="obj">
    <input
      v-if="edit"
      class="muffler-input m-0 p-0"
      size="2"
      :class="{ 'is-invalid': isInvalid }"
      v-model="text"
    />
    <span v-else class="m-0 p-0">{{ text }}</span>
  </div>
</template>

<script>
import CONST from "../../models/const.js";

export default {
  name: "NoiseCell",
  props: {
    obj: {}, // Ссылка на объект, свойство которого будет изменяться
    valuename: {
      // Имя свойства в объектк obj, которое будет изменяться
      default: "",
    },
    tofixed: {
      type: Number,
      default: 12,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this._oldText = this.text;
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
        if (this.valuename === "") return this.obj;
        else return this.obj[this.valuename];
      },
      set(value) {
        // При изменении пользователем
        if (this.valuename === "") this.obj = value;
        else this.obj[this.valuename] = value;
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

<style scoped lang="scss">
.muffler-input {
  text-align: inherit;
  font: {
    family: inherit;
    size: inherit;
  }
  border-color: transparent;
  background-color: transparent;
  &:focus,
  &:hover {
    background-color: white;
  }
  &:hover {
    border-color: #343a40;
  }
}
</style>