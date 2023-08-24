<template>
  <h1>MarketPlace</h1>
  <v-carousel>
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    />
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
      cover
    />
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    />
  </v-carousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const user = ref('Hondo')
</script>
