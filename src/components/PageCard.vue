<template>
  <div class="fantune-card">
    <div v-if="header" :class="headerClass">
      <strong>
        <span v-html="header" />
      </strong>
    </div>
    <div class="card-body p-2">
      <slot />
    </div>
  </div>
</template>


<script>
export default {
  name: "PageCard",
  props: {
    header: String,
    edit_mode: Object,
  },
  computed: {
    headerClass() {
      return this.edit_mode && this.edit_mode.enabled
        ? ["fantune-card-header-edit"]
        : ["fantune-card-header-normal"];
    },
  },
};
</script>






