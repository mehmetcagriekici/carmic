import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWriteReadStore = defineStore('writeRead', () => {
  //toggle write/read mode state (true-> read, false->write)
  const isReadMode = ref(true)

  //toggle mode action
  function toggleWriteRead() {
    isReadMode.value = !isReadMode.value
  }

  return { isReadMode, toggleWriteRead }
})
