//import vue stuff
import { ref } from 'vue'
import { defineStore } from 'pinia'

//global story state
export const useAuthStore = defineStore('auth', () => {
  const isLoginForm = ref(false)
  const isNavForm = ref(false)
  const authFormType = ref('')
  const username = ref('')
  const password = ref('')
  const email = ref('')
  const authenticated = ref(false)

  return { isLoginForm, isNavForm, authFormType, username, password, email, authenticated }
})
