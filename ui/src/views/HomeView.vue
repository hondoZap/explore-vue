<template>
  <div>
    <SomeComponent :message="message" />
  </div>
</template>

<script lang="ts" setup>
import SomeComponent from '@/components/SomeComponent.vue'

const message = 'Hello, world!'
</script>
