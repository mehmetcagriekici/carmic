//import vue sutff
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIsLoading = defineStore('isLoading', () => {
  //special styling on elements based on is Loading
  const isLoadingAuth = ref(false)
  const isLoadingCreateAccountMember = ref(false)
  const isLoadingFiles = ref(false)
  const isLoadingWriteStory = ref(false)
  return { isLoadingAuth, isLoadingCreateAccountMember, isLoadingFiles, isLoadingWriteStory }
})
