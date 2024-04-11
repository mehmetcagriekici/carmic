<script setup lang="ts">
//import vue stuff
import { inject } from 'vue'
//props from parent
const type = inject('btnType')
</script>

<template>
  <button
    v-if="type === 'navPopper'"
    class="font-medium text-sm tracking-tight capitalize hover:font-black hover:text-slate-50 hover:underline 2xl:text-lg xl:text-base sm:text-xs"
  >
    <slot></slot>
  </button>

  <button
    v-else-if="type === 'navigate'"
    class="size-full text-md font-mono font-black tracking-wide text-slate-300 bg-slate-600 capitalize rounded-sm hover:bg-slate-200 hover:text-slate-700 hover:underline xl:text-5xl md:text-4xl sm:tex-lg"
  >
    <slot></slot>
  </button>

  <button
    v-else-if="type === 'submitBtn'"
    type="submit"
    class="size-full text-sm text-slate-100 capitalize rounded hover:font-bold hover:underline hover:text-slate-800 hover:bg-slate-400 sm:text-xl md:text-2xl"
  >
    <slot></slot>
  </button>

  <button
    v-else-if="type === 'largeIconBtn'"
    class="size-full text-slate-300 font-semibold rounded hover:bg-slate-400 hover:text-slate-50 hover:font-bold"
  >
    <slot></slot>
  </button>

  <button
    v-else-if="type === 'formToggle'"
    class="size-full text-slate-300 font-bold rounded hover:bg-slate-300 hover:text-slate-800"
  >
    <slot></slot>
  </button>

  <button v-else class="">
    <slot></slot>
  </button>
</template>
