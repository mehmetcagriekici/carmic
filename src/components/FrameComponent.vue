<script setup lang="ts">
//import vue stuff
import { ref } from 'vue'
//import store
import { useStoryStore } from '../stores/story'

//store
const story = useStoryStore()

//individual image state (if clicked hide image array, display single image)
const imageClicked = ref(false)

//clicked image src
const clickedImageSrc = ref('')

//on image click, display clicked image
function onImageClick(event: Event) {
  const target = event.target as HTMLInputElement
  clickedImageSrc.value = target.src
  imageClicked.value = true
}

//on mouse leave hide image, display array
function onImageMouseLeave() {
  imageClicked.value = false
}
</script>

<template>
  <!--Frame Section-->
  <section v-if="!imageClicked" class="size-full grid grid-rows-12 grid-cols-12">
    <!--IMAGES CONTAINER-->
    <div
      class="row-start-2 row-span-8 col-start-2 col-span-10 grid auto-cols-max grid-rows-1 grid-flow-col overflow-x-auto"
    >
      <!--One Single Image-->
      <div
        v-for="(image, index) in story.currentFrame?.images"
        :key="index"
        class="col-span-8 row-span-1 rounded-xl"
      >
        <img
          :src="image"
          alt="frame_image"
          class="size-full px-2 py-2 rounded-xl cursor-pointer opacity-80 hover:opacity-100"
          @click="(event: Event) => onImageClick(event)"
        />
      </div>
    </div>
    <!--TEXT CONTAINER-->
    <div class="row-start-11 row-span-2 col-start-1 col-span-12 flex items-center justify-center">
      <p
        class="w-full h-3/4 text-xl font-bold tracking-wide text-center text-slate-200 text-nowrap indent-4 overflow-x-auto"
      >
        {{ story.currentFrame?.text }}
      </p>
    </div>
  </section>
  <!--If Clicked display single image instead of section-->
  <div v-if="imageClicked" class="size-full rounded">
    <img
      :src="clickedImageSrc"
      alt="frame_image"
      class="size-full bg-cover px-2 py-2 rounded"
      @mouseleave="onImageMouseLeave"
    />
  </div>
</template>
