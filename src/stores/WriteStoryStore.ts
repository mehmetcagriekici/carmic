//import vue stuff
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
//import types
import type { Chapter, Frame } from '@/data/data_types'

export const useWriteStoryStore = defineStore('writeStory', () => {
  //frame text (user input, single)
  const frameText: Ref<string> = ref('')

  //chapter heading (single)
  const chapterHeading: Ref<string> = ref('')
  //chapter frames (multiple)
  const chapterFrames: Ref<Frame[]> = ref([])
  //story chapters (multiple)
  const storyChapters: Ref<Chapter[]> = ref([])
  //story name (single)
  const storyName: Ref<string> = ref('')

  //return all state
  return {
    frameText,
    chapterHeading,
    chapterFrames,
    storyChapters,
    storyName
  }
})
