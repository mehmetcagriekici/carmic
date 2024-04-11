//import vue stuff
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

import type { Story } from '@/data/data_types'

//global story state
export const useStoriesStore = defineStore('stories', () => {
  //stories array
  const stories: Ref<Story[]> = ref([])
  //user stories array
  const userStories: Ref<Story[]> = ref([])

  const storiesStoryIndex: Ref<number> = ref(0)

  const userStoriesStoryIndex: Ref<number> = ref(0)

  const selectedStoriesStory: ComputedRef<Story | undefined> = computed(() =>
    stories.value.at(storiesStoryIndex.value)
  )

  const selectedUserStory: ComputedRef<Story | undefined> = computed(() =>
    userStories.value.at(userStoriesStoryIndex.value)
  )

  const currentStory: ComputedRef<Story | undefined> = computed(() => {
    if (selectedStoriesStory.value) return selectedStoriesStory.value
    if (selectedUserStory.value) return selectedUserStory.value
    return undefined
  })

  return {
    stories,
    userStories,
    storiesStoryIndex,
    selectedStoriesStory,
    userStoriesStoryIndex,
    selectedUserStory,
    currentStory
  }
})
