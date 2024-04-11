<script setup lang="ts">
//import vue stuff
import { provide } from 'vue'
//import store
import { useStoryStore } from '../stores/story'
//import components
import ChapterComponent from './ChapterComponent.vue'
import ButtonComponent from './ButtonComponent.vue'
import { useStoriesStore } from '@/stores/stories'

//story store
const story = useStoryStore()
const stories = useStoriesStore()

//provide pops
provide('btnType', 'navigate')
</script>

<template>
  <!--Story Section-->
  <section>
    <!--Heading-->
    <div class="pt-12 flex justify-center flex-col bg-slate-700">
      <h1
        class="uppercase italic font-serif font-bold tracking-wider text-slate-200 text-center shadow-md h-max w-full sm:text-5xl md:text-7xl"
      >
        {{ stories.currentStory ? stories.currentStory.name : '' }}
      </h1>
    </div>
    <!--chapters and buttons-->
    <div class="h-dvh w-dvw grid grid-rows-12 grid-cols-12 bg-slate-800">
      <!--last button -->
      <div class="row-start-2 row-span-8 col-start-1 col-span-1 mx-1 rounded">
        <ButtonComponent v-if="story.currentChapterIndex > 0" @click="story.decreaseChapterIndex"
          >Last</ButtonComponent
        >
      </div>
      <!--chapter container-->
      <div class="col-start-2 col-span-10 row-start-1 row-span-10 pt-3 rounded">
        <ChapterComponent />
      </div>
      <!--next button -->
      <div class="row-start-2 row-span-8 mx-1 rounded">
        <ButtonComponent
          v-if="story.currentChapterIndex < story.chapters.length - 1"
          @click="story.increaseChapterIndex"
          >Next</ButtonComponent
        >
      </div>
    </div>
  </section>
</template>
