<template>
  <h1>Checkout</h1>
  <h2>{{ cart }}</h2>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const cart = ref([])
</script>
