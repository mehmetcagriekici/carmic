<script setup lang="ts">
//import stores
import { useUsersStore } from '@/stores/users'

//stores
const users = useUsersStore()
</script>

<template>
  <div v-if="users.selectedUser" class="flex gap-5">
    <img
      class="bg-cover h-10 w-12 rounded"
      alt="user image"
      :src="users.selectedUser.profile_photo"
    />
    <p class="flex mt-1 text-lg tracking-tight">
      Username:
      <span class="font-serif capitalize font-black ml-2">{{ users.selectedUser.username }}</span>
    </p>
  </div>
</template>
