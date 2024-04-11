<script setup lang="ts">
//import vue stuff
import { ref } from 'vue'
//import components
import ButtonComponent from './ButtonComponent.vue'
import FormComponent from './FormComponent.vue'
import ListComponent from './ListComponent.vue'
import LoginSignupForm from './LoginSignupForm.vue'
//import stores
import { useAuthStore } from '@/stores/auth'
import { useErrorsStore } from '@/stores/errors'

//props
defineProps(['role', 'items', 'btnText', 'toggleState'])

//global state
const auth = useAuthStore()
const errors = useErrorsStore()

//modal state
const showModal = ref(false)

//update show modal state
function toggleShowModal() {
  showModal.value = !showModal.value

  //reset error
  errors.errorStatus = false
  errors.errorMessage = ''
}

function closeModal() {
  showModal.value = false

  //reset error
  errors.errorStatus = false
  errors.errorMessage = ''
}
</script>

<template>
  <div v-if="role === 'listModal'" :onMouseleave="closeModal">
    <ButtonComponent @click="toggleShowModal">{{ btnText }}</ButtonComponent>
    <ListComponent v-if="showModal" :items />
  </div>
  <div v-else-if="role === 'toggleModal'">
    <ButtonComponent @click="toggleState">{{ btnText }}</ButtonComponent>
  </div>
  <div v-else-if="role === 'formModal'">
    <ButtonComponent
      @click="
        () => {
          auth.isNavForm = !auth.isNavForm

          //reset error
          errors.errorStatus = false
          errors.errorMessage = ''
        }
      "
      >{{ btnText }}</ButtonComponent
    >
    <FormComponent v-if="auth.isNavForm">
      <LoginSignupForm />
    </FormComponent>
  </div>
</template>
