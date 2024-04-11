<script setup lang="ts">
//import vue stuff

import { inject, provide } from 'vue'
//props from parent
const type = inject('formType')

//provide props
provide('btnType', 'largeIconBtn')
//emits
</script>

<template>
  <!--small modal form-->
  <div
    v-if="type === 'navPopper'"
    class="fixed size-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-slate-900"
  >
    <slot></slot>
  </div>
  <!--large form-->
  <form v-if="type === 'writeStoryForm'" class="size-full grid grid-rows-12 grid-cols-12 gap-1">
    <slot></slot>
  </form>
  <!--Create User Form-->
  <form v-if="type === 'createUserForm'" class="size-full grid grid-rows-8 grid-cols-12">
    <slot></slot>
  </form>
</template>
