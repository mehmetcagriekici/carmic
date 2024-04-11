<script setup lang="ts">
//import vue stuff
import { provide } from 'vue'
import { storeToRefs } from 'pinia'
//import stores
import { useWriteStoryStore } from '@/stores/WriteStoryStore'
//import components
import FileInputComponent from './FileInputComponent.vue'

//write story global store
const { frameText } = storeToRefs(useWriteStoryStore())

//provide porps
provide('fileMultiple', true)
</script>

<template>
  <!--WriteChapterImage (arbitrary amount, new element next to last)-->
  <!-- Quick shoutout to this draggable input zone and entire drag/drop logic! "https://blog.logrocket.com/customizing-drag-drop-file-uploading-vue/" -->
  <div class="row-start-4 col-start-2 row-span-2 col-span-8 rounded bg-slate-400">
    <FileInputComponent />
  </div>
  <!--WriteChapterText (arbitrary amount, new element next to last)-->
  <div class="row-start-7 row-end-12 col-start-2 col-end-10">
    <textarea
      class="resize-none size-full rounded bg-slate-400 focus:outline-none placeholder:text-slate-600 placeholder:text-xl placeholder:font-bold indent-2"
      placeholder="Frame Text"
      v-model="frameText"
    ></textarea>
  </div>
</template>
