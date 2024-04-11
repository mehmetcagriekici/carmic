//import vue stuff
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
//stores
import { useStoriesStore } from './stories'
//types
import type { Chapter, Frame } from '@/data/data_types'

export const useStoryStore = defineStore('story', () => {
  const stories = useStoriesStore()
  //frame
  const currentFrameIndex: Ref<number> = ref(0)
  //chapter
  const currentChapterIndex: Ref<number> = ref(0)
  //story is from stories store
  //chapters
  const chapters: ComputedRef<Chapter[]> = computed(() => {
    if (stories.currentStory?.chapters) return Object.values(stories.currentStory.chapters)
    return []
  })
  //current chapter
  const currentChapter: ComputedRef<Chapter | undefined> = computed(() =>
    chapters.value.at(currentChapterIndex.value)
  )
  //frames
  const frames: ComputedRef<Frame[]> = computed(() => {
    if (currentChapter.value?.frames) return Object.values(currentChapter.value?.frames)
    return []
  })
  //current frame
  const currentFrame: ComputedRef<Frame | undefined> = computed(() =>
    frames.value.at(currentFrameIndex.value)
  )

  //actions
  function decreaseChapterIndex() {
    currentChapterIndex.value--
  }

  function increaseChapterIndex() {
    currentChapterIndex.value++
  }

  function decreaseFrameIndex() {
    currentFrameIndex.value--
  }

  function increaseFrameIndex() {
    currentFrameIndex.value++
  }

  return {
    currentFrameIndex,
    currentChapterIndex,
    currentChapter,
    currentFrame,
    chapters,
    frames,
    decreaseChapterIndex,
    increaseChapterIndex,
    decreaseFrameIndex,
    increaseFrameIndex
  }
})
