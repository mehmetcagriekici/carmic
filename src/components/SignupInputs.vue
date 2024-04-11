<script setup lang="ts">
//import store
import { useAuthStore } from '@/stores/auth'
//import components
import InputLabel from './InputLabel.vue'

//store
const auth = useAuthStore()
</script>

<template>
  <!--username-->
  <InputLabel v-model="auth.username" type="text" label="username" />

  <!--email-->
  <InputLabel v-model="auth.email" type="email" label="email" />

  <!--password-->
  <InputLabel v-model="auth.password" type="password" label="password" />
</template>
