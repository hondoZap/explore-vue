<template>
  <h1>Item</h1>
  <h2>{{ item }}</h2>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const item = ref('Avocado')
</script>
