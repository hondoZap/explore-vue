<template>
  <v-container>
    <SomeComponent :message="message" />
  </v-container>
</template>

<script lang="ts" setup>
import SomeComponent from '@/components/SomeComponent.vue'
import { useCurrentUser } from '@/stores/currentUser'
import { computed } from 'vue'

const currentUserStore = useCurrentUser()

const message = computed(() => {
  if (currentUserStore.loading) {
    return 'Loading...'
  }
  if (!currentUserStore.user) {
    return 'No user'
  }
  return `Hello, this is some code ${currentUserStore.user.fullName}!`
})
</script>
