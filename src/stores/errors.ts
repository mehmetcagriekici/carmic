//import vue stuff
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useErrorsStore = defineStore('errors', () => {
  const errorStatus = ref(false)
  const errorMessage: Ref<unknown> = ref()

  return { errorMessage, errorStatus }
})
