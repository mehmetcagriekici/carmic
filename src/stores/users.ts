//vue stuff
import { defineStore } from 'pinia'
import { ref, computed, type Ref, type ComputedRef } from 'vue'
//types
import type { User } from '@/data/data_types'

export const useUsersStore = defineStore('users', () => {
  //users array
  const users: Ref<User[]> = ref([])

  const username: Ref<string> = ref('')

  const profile_photo: Ref<string> = ref('')

  const user: Ref<User> = computed(() => ({
    username: username.value,
    profile_photo: profile_photo.value,
    stories: {}
  }))

  const userIndex: Ref<number> = ref(0)

  const isSelected: Ref<boolean> = ref(false)

  const selectedUser: ComputedRef<User | undefined> = computed(() =>
    users.value.at(userIndex.value)
  )

  return {
    users,
    userIndex,
    selectedUser,
    isSelected,
    username,
    profile_photo,
    user
  }
})
