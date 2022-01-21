<template>
    <thead class="table-fantune-header text-center">
      <tr>
        <th rowspan="2" scope="col">
          <slot></slot>
        </th>
        <th rowspan="2" scope="col">
          <div>всего,</div>
          <div>дБА</div>
        </th>
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
    <tbody>
      <tr v-for="point in noisefan" :key="point.title">
        <th scope="row">
          <div>{{ point.title }}</div>
        </th>
        <td class="text-center">
          <NoiseCell
            :obj="point"
            valuename="total"
            :tofixed="0"
            :edit="false"
          ></NoiseCell>
        </td>
        <td
          v-for="(item, index) in point.octaves"
          class="text-center"
          :style="{
            background: colorValue(item, point.octaves, false, 15, 100),
          }"
          :key="index"
        >
          <NoiseCell
            :obj="point.octaves"
            :valuename="index"
            :tofixed="0"
            :edit="false"
          ></NoiseCell>
        </td>
      </tr>
    </tbody>
</template>

<script>
import NoiseCell from "./NoiseCell.vue";
import { colorValue } from "../colors";

export default {
  name: "NoiseTable",
  props: {
    noisefan: Object,
    freqs: Array,
  },
  computed: {},
  methods: {
    colorValue: colorValue,
  },
  components: {
    NoiseCell,
  },
};
</script>