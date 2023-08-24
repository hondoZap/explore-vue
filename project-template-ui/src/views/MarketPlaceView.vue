<template>
  <v-tabs
    fixed-tabs
    bg-color="indigo-darken-2"
    slider-color="orange"
  >
    <v-tab to="/market/sales">
      Sales
    </v-tab>
    <v-tab to="/market/swag">
      Swag
    </v-tab>
    <v-tab to="/market/ideas">
      Ideas
    </v-tab>
    <v-tab to="/market/specialrequests">
      Special Requests
    </v-tab>
    <v-tab to="/market/clearance">
      Clearance
    </v-tab>
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
  <RouterView />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const user = ref('Hondo')
</script>
