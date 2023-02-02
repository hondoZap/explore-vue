<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>