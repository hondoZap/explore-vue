import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { CurrentUser } from '@/types'
import api from '@/api'

export const useCurrentUser = defineStore('currentUser', () => {
  const user = ref<CurrentUser>()
  const loading = ref(false)

  const reload = async () => {
    loading.value = true
    try {
      user.value = await api.getCurrentUser()
    } finally {
      loading.value = false
    }
  }
  onMounted(reload)

  return {
    user,
    loading,
  }
})
