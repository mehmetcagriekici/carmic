<script setup lang="ts">
//import vue stuff
import { inject } from 'vue'
//import store
import { useStoriesStore } from '../stores/stories'
import { useStoryStore } from '../stores/story'
import { useUsersStore } from '../stores/users'
import { useWriteReadStore } from '@/stores/writeRead'

//import types
import type { Chapter, Story, User } from '@/data/data_types'

//props from parent
const type = inject('listType')
defineProps(['items'])

//store
const stories = useStoriesStore()
const users = useUsersStore()
const story = useStoryStore()
const writeRead = useWriteReadStore()

//navigate between items from nav bar
function onNavigate(index: number, items: User[] | Story[] | Chapter[]) {
  //select story (global) from the nav
  if (items === stories.stories) {
    stories.userStoriesStoryIndex = -1
    story.currentChapterIndex = 0
    story.currentFrameIndex = 0
    stories.storiesStoryIndex = index
  }
  //select chapter from the nav
  if (items === stories.currentStory?.chapters) {
    stories.userStoriesStoryIndex = -1
    story.currentFrameIndex = 0
    story.currentChapterIndex = index
  }
  //select user from the nav
  if (items === users.users) {
    stories.userStoriesStoryIndex = -1
    stories.storiesStoryIndex = 0
    story.currentChapterIndex = 0
    story.currentFrameIndex = 0
    users.userIndex = index
    users.isSelected = true
  }

  //select story (user) from the nav
  if (items === users.selectedUser?.stories) {
    stories.storiesStoryIndex = -1
    story.currentChapterIndex = 0
    story.currentFrameIndex = 0
    stories.userStoriesStoryIndex = index
  }

  writeRead.isReadMode = true
}
</script>

<template>
  <div
    v-if="type === 'navPopper'"
    class="fixed top-6 mt-3 px-5 text-xl capitalize text-slate-300 bg-slate-700 rounded"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="cursor-pointer my-3 hover:underline hover:text-slate-50"
        @click="() => onNavigate(index, items)"
      >
        {{ item.heading || item.name || item.username }}
      </li>
    </ul>
  </div>
  <!--///////////////////////////////////////////////////////////////-->
  <ul
    v-if="type === 'selectUserList'"
    class="flex justify-start items-center flex-wrap col-start-1 col-span-5"
  >
    <li
      v-for="(user, index) in users.users"
      :key="index"
      class="h-1/2 w-1/12 ml-3 rounded cursor-pointer bg-slate-200 flex flex-col items-center justify-center"
      @click="
        () => {
          users.isSelected = true
          users.userIndex = index
        }
      "
    >
      <img
        :src="user.profile_photo || 'default-user.jpg'"
        alt="user_profile_photo"
        class="w-full h-4/5 bg-cover rounded bg-slate-300"
      />
      <span class="w-full h-1/5 text-center uppercase font-bold text-slate-800"
        >user: {{ user.username }}</span
      >
    </li>
  </ul>
</template>
