<template>
  <h1>MarketPlace</h1>
  <h2>Welcome {{ user }}</h2>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const user = ref('Hondo')
</script>
