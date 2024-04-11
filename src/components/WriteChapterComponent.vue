<script setup lang="ts">
//import vue stuff
import { provide } from 'vue'
//import types
import type { Chapter, Frame } from '@/data/data_types'
//import components
import ButtonComponent from './ButtonComponent.vue'
import WriteFrameComponent from './WriteFrameComponent.vue'

//import store
import { useWriteStoryStore } from '@/stores/WriteStoryStore'
import { useFilesStore } from '@/stores/files'
//import services
import { getFileUrl, uploadFiles } from '@/services/apiAccount'

//form states
const writeStory = useWriteStoryStore()

const files = useFilesStore()

//provide props
provide('btnType', 'submitBtn')

//handlers
async function handleFrame(event: SubmitEvent) {
  event.preventDefault()
  //get frame
  const frame: Frame = {
    text: writeStory.frameText,
    images: files.inputFiles.map((image) => getFileUrl(`story_images/${image.name}`))
  }

  //push to chapter frames
  writeStory.chapterFrames.push(frame)

  //upload files to server
  for (const item of files.inputFiles) {
    uploadFiles({
      file: item,
      file_address: `story_images/${item.name}`
    })
  }

  //clear input fields and form data
  writeStory.frameText = ''
  files.inputFiles.length = 0
}

function handleChapter(event: SubmitEvent) {
  event.preventDefault()
  //convert frames array to an object with indexes as keys
  const frames: { [key: number]: Frame } = {}
  for (let i = 0; i < writeStory.chapterFrames.length; i++) frames[i] = writeStory.chapterFrames[i]

  const chapter: Chapter = { heading: writeStory.chapterHeading, frames }
  //push chapter to stories
  writeStory.storyChapters.push(chapter)
  //upload files to server
  //clear input fields and form data
  writeStory.chapterHeading = ''
  writeStory.frameText = ''
  files.inputFiles.length = 0
  writeStory.chapterFrames.length = 0
}
</script>

<template>
  <!--Chapter Heading-->
  <div class="col-start-3 col-end-10 row-start-2 row-span-1">
    <input
      class="size-full indent-2 text-slate-50 text-sm font-bold bg-slate-400 rounded focus:outline-none focus:bg-slate-300 focus:text-slate-700 sm:text-xl md:text-4xl placeholder-slate-500"
      type="text"
      placeholder="Chapter Heading"
      v-model="writeStory.chapterHeading"
    />
  </div>

  <!--Frame Component-->
  <WriteFrameComponent />
  <!--/Frame Component-->
  <!--send chapter or frame-->
  <div class="col-start-10 col-span-3 row-start-9 row-span-4 mx-3 my-2">
    <!--send frame button container-->
    <div class="w-2/3 h-1/3 bg-slate-700 rounded mb-1 mx-auto">
      <ButtonComponent @click="(event: SubmitEvent) => handleFrame(event)"
        >submit frame <span class="text-xs">(create new chapter)</span></ButtonComponent
      >
    </div>
    <!--send chapter button container-->
    <div class="w-full h-2/3 bg-slate-700 mt-1 rounded">
      <ButtonComponent @click="(event: SubmitEvent) => handleChapter(event)"
        >send chapter <span class="text-xs">(create new story)</span></ButtonComponent
      >
    </div>
  </div>
</template>
