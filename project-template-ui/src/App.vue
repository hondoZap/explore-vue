<template>
  <v-app>
    <v-app-bar>
      <v-container class="fill-height d-flex align-center">
        <v-toolbar-title>
          Project_Template
        </v-toolbar-title>

        <v-btn
          variant="text"
          :to="{ name: 'home' }"
        >
          Home
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-dialog
      v-for="error in errors"
      :key="error.id"
      v-model="error.visible"
      max-width="500"
    >
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text>
          {{ error.text }}
        </v-card-text>
        <v-card-actions>
          <span class="grey--text text-caption">
            {{ error.timestamp.toLocaleString() }}
          </span>
          <v-spacer />
          <v-btn @click="error.visible = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import extractErrorMessage from '@/util/extractErrorMessage'

const errors = ref(Array<{
  error: Error
  text: string
  id: number
  visible: boolean
  timestamp: Date
}>())

onErrorCaptured(error => {
  errors.value.push({
    id: errors.value.length + 1,
    error,
    text: extractErrorMessage(error),
    visible: true,
    timestamp: new Date(),
  })
})
</script>
