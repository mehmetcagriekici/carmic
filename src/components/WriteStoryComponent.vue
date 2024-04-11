<script setup lang="ts">
//import vue stuff
import { provide } from 'vue'

//import components
import FormComponent from './FormComponent.vue'
import ButtonComponent from './ButtonComponent.vue'
import WriteChapterComponent from './WriteChapterComponent.vue'

//import stores
import { useWriteStoryStore } from '@/stores/WriteStoryStore'
import { useIsLoading } from '@/stores/isLoadingStore'
import { useUsersStore } from '@/stores/users'
import { useStoriesStore } from '@/stores/stories'
import { useWriteReadStore } from '@/stores/writeRead'
//import types
import type { Chapter, Story } from '@/data/data_types'
//import services
import { updateStories, updateUserStories } from '@/services/apiAccount'

//global stores
const writeStory = useWriteStoryStore()
const isLoading = useIsLoading()
const users = useUsersStore()
const stories = useStoriesStore()
const writeRead = useWriteReadStore()

//provide props
provide('btnType', 'submitBtn')
provide('formType', 'writeStoryForm')
provide('submit', handleSubmit)

//handle submit
async function handleSubmit(event: SubmitEvent) {
  try {
    isLoading.isLoadingWriteStory = true
    event.preventDefault()

    //convert frames array to an object with indexes as keys
    const chapters: { [key: number]: Chapter } = {}

    for (let i = 0; i < writeStory.storyChapters.length; i++)
      chapters[i] = writeStory.storyChapters[i]

    const story: Story = { name: writeStory.storyName, chapters }

    //upload story to the server (main story branch)
    await updateStories(story)
    //upload story to the sever (account branch)
    if (users.selectedUser) await updateUserStories(story, users.selectedUser?.username)

    if (users.selectedUser)
      users.selectedUser.stories = {
        ...users.selectedUser.stories,
        [Object.values(users.selectedUser.stories || {}).length]: story
      }

    if (users.selectedUser) users.selectedUser.stories = { ...users.selectedUser.stories }

    //update app stories (stories store)
    stories.stories.push(story)

    //clear fields
    writeStory.storyName = ''
    writeStory.storyChapters.length = 0
    writeRead.isReadMode = false
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.isLoadingWriteStory = false
  }
}
</script>

<template>
  <div class="size-full">
    <!--
        features: 
         enter images and texts
         sort them by chapters and frames
    -->
    <FormComponent>
      <!--Story Name-->
      <div class="row-start-2 row-span-1 col-start-3 col-end-9 rounded bg-slate-600">
        <input
          v-model="writeStory.storyName"
          type="text"
          class="bg-inherit size-full pl-3 text-sm text-slate-400 sm:text-xl md:text-3xl md:tracking-wide focus:outline-none focus:bg-slate-500 focus:text-slate-50 focus:font-bold"
          placeholder="Story Name"
        />
      </div>

      <!--WriteChapterComponent || Edit Chapter-->
      <div
        class="row-span-9 col-start-2 col-end-12 overflow-y-auto rounded bg-slate-600 grid grid-cols-12 grid-rows-12"
      >
        <WriteChapterComponent />
      </div>
      <!--/WriteChapterComponent -->
      <!--Submit Button-->
      <div class="row-span-1 col-start-9 col-end-11 rounded flex justify-center bg-slate-600">
        <ButtonComponent @click="(event: SubmitEvent) => handleSubmit(event)"
          >Submit Story</ButtonComponent
        >
      </div>
    </FormComponent>
  </div>
</template>
