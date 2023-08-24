<template>
  <v-tabs
    fixed-tabs
    bg-color="indigo-darken-2"
    slider-color="orange"
  >
    <v-tab>Sales</v-tab>
    <v-tab>Swag</v-tab>
    <v-tab>Ideas</v-tab>
    <v-tab>Special Requests</v-tab>
    <v-tab>Clearance</v-tab>
  </v-tabs>
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
