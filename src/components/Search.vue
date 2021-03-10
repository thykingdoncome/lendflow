<template>
  <input
    type="text"
    :value="value"
    :placeholder="placeholder"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "Search",
  props: {
    value: { type: String, required: false, default: "" },
    placeholder: { type: String, required: false, default: "" },
  },
};
</script>

<style></style>
