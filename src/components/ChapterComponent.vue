<script setup lang="ts">
//import vue stuff
import { provide, computed } from 'vue'

//import store
import { useStoryStore } from '../stores/story'

//import component
import FrameComponent from './FrameComponent.vue'
import ButtonComponent from './ButtonComponent.vue'
//story store
const story = useStoryStore()
//chapter
const chapter = computed(() => story.currentChapter)

//provide props
provide('btnType', 'navigate')
</script>

<template>
  <!--Chapter Section-->
  <section class="size-full grid grid-rows-12 grid-cols-12 gap-3 rounded bg-slate-700">
    <!--Heading Container-->
    <div class="row-start-1 row-span-1 col-start-1 col-span-6 flex justify-center items-center">
      <!--Chapter heading-->
      <h2 class="text-center text-4xl capitalize font-bold text-slate-100 font-serif">
        {{ chapter ? chapter.heading : '' }}
      </h2>
    </div>
    <!--Navigation button left-->
    <div class="row-start-2 row-span-1 col-start-2 col-span-4">
      <ButtonComponent
        v-if="story.currentFrameIndex > 0"
        @click="story.decreaseFrameIndex"
        type="navigateFrames"
        >Last</ButtonComponent
      >
    </div>
    <!--Frame Area-->
    <div class="row-start-3 row-span-8 col-span-12">
      <!--frame-->
      <FrameComponent />
    </div>
    <!--Navigation button right-->
    <div class="row-start-11 row-span-1 col-start-8 col-span-4">
      <ButtonComponent
        v-if="story.currentFrameIndex < story.frames.length - 1"
        @click="story.increaseFrameIndex"
        type="navigateFrames"
        >Next</ButtonComponent
      >
    </div>
  </section>
</template>
