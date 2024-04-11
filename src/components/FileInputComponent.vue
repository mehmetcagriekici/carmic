<script setup lang="ts">
/* !!! IMPORTANT !!! Quick shoutout to this draggable input zone and entire drag/drop logic! "https://blog.logrocket.com/customizing-drag-drop-file-uploading-vue/" */

//import vue stuff
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
//import stores
import { useFilesStore } from '../stores/files'
//import services
import { generateFakeUrl } from '../services/generateFakeUrl'

//props
const fileMultiple = inject('fileMultiple')

//global store
const files = storeToRefs(useFilesStore())

//local states
const isDragging = ref(false)
const fileAlready = ref(false)

//functions
//drag / drop / remove item handlers
function dragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
  fileAlready.value = false
}

function dragleave(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
}

function drop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false

  const fileList = event.dataTransfer?.files

  if (fileList) {
    if (!fileMultiple && fileList.length > 1) throw new Error('Multiple Files are not supported')

    for (const file of fileList) {
      if (files.inputFiles.value.some((el) => el.name === file.name)) fileAlready.value = true
      else {
        files.inputFiles.value.push(file)
        generateFakeUrl(file)
      }
    }
  }
}

function removeItem(index: number) {
  files.inputFiles.value.splice(index, 1)
}
</script>

<template>
  <!--Drop Zone-->
  <div
    @dragover="dragOver"
    @dragleave="dragleave"
    @drop="drop"
    class="size-full"
    :class="
      isDragging
        ? !fileMultiple
          ? files.inputFiles.value.length > 0
            ? 'bg-red-600 flex justify-center items-center'
            : 'bg-slate-200'
          : 'bg-slate-200'
        : !fileMultiple
          ? files.inputFiles.value.length > 0
            ? ' bg-slate-800 flex justify-start items-start'
            : ''
          : 'bg-inherit'
    "
  >
    <!--Drop Zone Label Container-->
    <div class="h-1/4 text-center rounded">
      <label for="file" class="text-xl font-semibold">
        <!--Duplicate-->
        <span v-if="fileAlready" class="text-red-600 font-black text-2xl"
          >Frame images array can not contain duplicates...</span
        >
        <!--Multiple-->
        <span v-if="!fileAlready && fileMultiple">Drag and Drop Images Here!</span>
        <!--Single-->
        <span v-if="!fileAlready && !fileMultiple && files.inputFiles.value.length < 1"
          >Drag and Drop a Single Image Here!</span
        >
      </label>
    </div>
    <!--File Overview List-->
    <ul
      class="h-3/4 rounded flex gap-3 overflow-x-auto pl-3 items-center"
      :class="files.inputFiles.value.length > 0 && !isDragging && fileMultiple && 'bg-slate-300 '"
    >
      <li
        v-for="(file, index) in files.inputFiles.value"
        :key="index"
        class="cursor-pointer w-max h-5/6 px-1 text-xs flex items-center justify-center gap-1 rounded bg-slate-500 hover:bg-red-700"
        @click="() => removeItem(index)"
      >
        <img
          v-if="files.inputFiles.value.length < 7"
          :alt="file.name"
          :src="generateFakeUrl(file)"
          class="size-10/12 bg-cover rounded-full opacity-75"
        />
        <span>{{ file.name }}</span>
      </li>
    </ul>
    <input
      id="file"
      type="file"
      :multiple="fileMultiple ? 'true' : 'false'"
      accept=".jpg, .jpeg, .png"
      class="size-0 absolute top-0 left-0"
    />
  </div>
</template>
