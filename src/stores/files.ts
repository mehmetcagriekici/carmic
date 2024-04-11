//import vue stuff
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useFilesStore = defineStore('files', () => {
  const inputFiles: Ref<File[]> = ref([])

  return { inputFiles }
})
