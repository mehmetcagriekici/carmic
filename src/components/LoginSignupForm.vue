<script setup lang="ts">
//import vue stuff
import { provide } from 'vue'
//import services
import { initAccount, userSignup, userLogin, getAccount } from '@/services/apiAccount'
import { initApp } from '@/services/initApp'
//import components
import ButtonComponent from './ButtonComponent.vue'
import LoginInputs from './LoginInputs.vue'
import SignupInputs from './SignupInputs.vue'
//store
import { useAuthStore } from '@/stores/auth'
import { useAppAccountStore } from '@/stores/appAccount'
import { useErrorsStore } from '@/stores/errors'
import { useIsLoading } from '@/stores/isLoadingStore'
//types
import { type Account, type InitialAccount } from '../data/data_types'

//props
provide('btnType', 'submitBtn')

//global state (stores)
const auth = useAuthStore()
const appAccount = useAppAccountStore()
const isLoading = useIsLoading()
const erros = useErrorsStore()

//handlers
async function handleSignup(event: Event) {
  event.preventDefault()

  try {
    isLoading.isLoadingAuth = true
    //signup, create account, give auth
    const { data } = await userSignup({ email: auth.email, password: auth.password })

    //after account is created use data from the account
    if (data.user?.email) {
      //account information
      const email = data.user.email
      const authenticated = true
      const user_id = data.user.id
      const users = {}

      const serverAccount: InitialAccount = {
        email,
        authenticated,
        user_id,
        users
      }

      const account: Account = {
        email,
        users,
        authenticated
      }

      //init account on server (client is unauthorized!)
      initAccount(serverAccount)

      //init account on the app
      appAccount.account = account
      initApp()

      //reset global error
      erros.errorStatus = false
      erros.errorMessage = ''
    }

    //open app
    auth.authenticated = true
  } catch (error) {
    console.error(error)

    //global error status
    erros.errorStatus = true
    erros.errorMessage = error

    //if there is an error clear form fields and auth store
    auth.username = ''
    auth.password = ''
    auth.email = ''

    throw new Error('Signup Form Error!')
  } finally {
    isLoading.isLoadingAuth = false
  }
}

//login, get account from the server, assign account to app
async function handleLogin(event: Event) {
  event.preventDefault()

  try {
    isLoading.isLoadingAuth = true
    const { data } = await userLogin({ email: auth.email, password: auth.password })
    if (data.user) {
      const { account } = await getAccount()

      //init account ont the app
      appAccount.account = account[0]
      initApp()
    }
    //open app
    auth.authenticated = true

    //reset global error
    erros.errorStatus = false
    erros.errorMessage = ''
  } catch (error) {
    console.error(error)

    //global error status
    erros.errorStatus = true
    erros.errorMessage = error

    //if there is an error clear form fields and auth store
    auth.password = ''
    auth.email = ''

    throw new Error('Login Form Error!')
  } finally {
    isLoading.isLoadingAuth = false
  }
}
</script>

<template>
  <!--Modal form works as an altarnate to defualt form, isLogin state is the opposite, directs user to opposite state of form (if default is login, directs to signup vs.)-->
  <!--Modal Form Login / Signup-->
  <form
    v-if="auth.isNavForm"
    @submit="(event) => (!auth.isLoginForm ? handleLogin(event) : handleSignup(event))"
    class="size-full rounded grid grid-cols-12 grid-rows-12"
  >
    <!--Inputs Container-->
    <div
      class="row-start-2 row-span-7 col-start-3 col-span-8 rounded flex flex-col items-center justify-evenly"
    >
      <SignupInputs v-if="auth.isLoginForm" />
      <LoginInputs v-if="!auth.isLoginForm" />
    </div>
    <!--Submit Button Container-->
    <div class="row-start-9 row-span-1 col-start-8 col-span-2 rounded bg-slate-600">
      <ButtonComponent
        @click="(event) => (!auth.isLoginForm ? handleLogin(event) : handleSignup(event))"
        >{{ !auth.isLoginForm ? 'Login' : 'Signup' }}</ButtonComponent
      >
    </div>
  </form>
  <!--Default Login / Signup form-->
  <form
    v-if="!auth.isNavForm"
    @submit="(event) => (auth.isLoginForm ? handleLogin(event) : handleSignup(event))"
    class="size-full rounded grid grid-cols-12 grid-rows-12"
    :class="isLoading.isLoadingAuth && 'animate-ping'"
  >
    <!--Inputs Container-->
    <div
      class="row-start-2 row-span-7 col-start-3 col-span-10 rounded flex flex-col items-center justify-evenly"
    >
      <SignupInputs v-if="!auth.isLoginForm" />
      <LoginInputs v-if="auth.isLoginForm" />
    </div>
    <!--Submit Button Container-->
    <div
      class="row-start-9 row-span-2 col-start-8 col-span-4 rounded bg-slate-600"
      :class="isLoading.isLoadingAuth && 'animate-ping bg-slate-50'"
    >
      <ButtonComponent
        @click="(event) => (auth.isLoginForm ? handleLogin(event) : handleSignup(event))"
        >{{ auth.isLoginForm ? 'Login' : 'Signup' }}</ButtonComponent
      >
    </div>
  </form>
</template>
