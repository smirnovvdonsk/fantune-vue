<template>
  <tr>
    <th scope="row" rowspan="2">
      <div><slot></slot></div>
      <div>{{ muffler.name }}</div>
    </th>
    <td class="text-center">
      <div>дБ</div>
    </td>
    <td
      v-for="(freq, index) in muffler.freqs"
      :key="index"
      class="text-center"
      :style="{
        background: colorValue(dBArray[index], dBArray, true, 15, 100),
      }"
    >
      <NoiseCell
        :obj="muffler[freq.toString()]"
        valuename="dB"
        :tofixed="1"
        :edit="true"
      ></NoiseCell>
    </td>
  </tr>
  <tr>
    <td class="text-center">
      <div>α</div>
    </td>
    <td
      v-for="(freq, index) in muffler.freqs"
      :key="index"
      class="text-center"
      :style="{
        background: colorValue(dBArray[index], dBArray, true, 15, 100),
      }"
    >
      <NoiseCell
        :obj="muffler[freq.toString()]"
        valuename="α"
        :tofixed="3"
        :edit="true"
      ></NoiseCell>
    </td>
  </tr>
</template>

<script>
import NoiseCell from "./NoiseCell.vue";
import { colorValue } from "../colors";

export default {
  name: "MufflerRow",
  props: {
    muffler: Object,
  },
  computed: {
    dBArray() {
      return this.muffler.dBArray;
    },
  },
  methods: {
    colorValue: colorValue,
  },
  components: {
    NoiseCell,
  },
};
</script>