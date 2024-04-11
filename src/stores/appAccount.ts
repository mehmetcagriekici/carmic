//import vues stuff
import type { Account } from '@/data/data_types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAppAccountStore = defineStore('appAccount', () => {
  const account: Ref<Account | undefined> = ref({ authenticated: false, email: '', users: {} })

  return { account }
})
