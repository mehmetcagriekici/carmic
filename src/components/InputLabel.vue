<script setup lang="ts">
//import stores
import { useErrorsStore } from '@/stores/errors'
//model
const model = defineModel()
//props
const props = defineProps(['label', 'type'])
//stores
const errors = useErrorsStore()
</script>

<template>
  <div class="w-full sm:text-xl md:text-3xl grid grid-cols-4 grid-rows-1">
    <label
      :for="type"
      class="row-col-1 col-span-1 capitalize tracking-tight font-bold text-slate-300"
      >{{ props.label }}:</label
    >
    <input
      :id="type"
      class="col-start-2 col-span-3 bg-slate-600 rounded indent-2 text-slate-200 focus:outline-none focus:bg-slate-300 focus:text-slate-800 focus:font-bold"
      :type
      v-model="model"
    />
    <span
      v-if="errors.errorStatus"
      class="w-max mt-2 px-2 text-red-600 indent-5 font-bold uppercase tracking-wide bg-slate-900"
      >{{ errors.errorMessage }}</span
    >
  </div>
</template>
