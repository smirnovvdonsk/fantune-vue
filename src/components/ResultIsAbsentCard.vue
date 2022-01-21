<template>
  <div>
    <span class="badge bg-danger my-1" style="font-size: 100%">
      Нет подходящей схемы
    </span>
    <div v-if="nyIsTooSmall || nyIsTooBig">
      Быстроходность слишком
      {{ nyIsTooSmall ? "мала" : "велика" }} ({{
        nyIsTooSmall ? "менее" : "более"
      }}
      {{ nyIsTooSmall ? minSpeedness : maxSpeedness }}).
      {{ nyIsTooSmall ? "Повысьте" : "Снизьте" }} частоту или
      производительность. {{ nyIsTooSmall ? "Снизьте" : "Повысьте" }} давление.
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultIsAbsentCard",
  props: {
    result: Object,
  },
  computed: {
    nyIsTooSmall() {
      return this.result?.ny < this.result?.minSpeedness;
    },
    nyIsTooBig() {
      return this.result?.ny >= this.result?.maxSpeedness;
    },
    minSpeedness() {
      return (+this.result?.minSpeedness?.toFixed(1))
        .toString()
        .replace(".", ",");
    },
    maxSpeedness() {
      return (+this.result?.maxSpeedness?.toFixed(1))
        .toString()
        .replace(".", ",");
    },
  },
};
</script>
