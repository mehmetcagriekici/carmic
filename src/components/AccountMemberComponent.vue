<script setup lang="ts">
//import vue stuff
import { provide, ref, onBeforeUnmount } from 'vue'
//import types
import type { User } from '@/data/data_types'
//import stores
import { useIsLoading } from '@/stores/isLoadingStore'
import { useStoriesStore } from '@/stores/stories'
import { useUsersStore } from '@/stores/users'
import { useFilesStore } from '@/stores/files'
import { useErrorsStore } from '@/stores/errors'
import { useWriteReadStore } from '@/stores/writeRead'
//import components
import ListComponent from './ListComponent.vue'
import ButtonComponent from './ButtonComponent.vue'
import FormComponent from './FormComponent.vue'
import InputLabel from './InputLabel.vue'
import FileInputComponent from './FileInputComponent.vue'
import StoryComponent from './StoryComponent.vue'
//services
import { uploadFiles, updateAccountUsers, getFileUrl } from '@/services/apiAccount'

//stores
const stories = useStoriesStore()
const users = useUsersStore()
const isLoading = useIsLoading()
const files = useFilesStore()
const errors = useErrorsStore()
const writeRead = useWriteReadStore()

//local state
const isCreatingUser = ref(false)
const createUserFormUsernameModel = ref('')

//provide props
provide('listType', 'selectUserList')
provide('btnType', 'formToggle')
provide('formType', 'createUserForm')
provide('fileMultiple', false)

//empty files
onBeforeUnmount(() => {
  files.inputFiles.length = 0
})

//service functions
//function upload to server
async function upload() {
  try {
    //set is loading
    isLoading.isLoadingCreateAccountMember = true

    //upload pp to server storage
    //profile photo: profile_photos/photo_name
    //there is only one file
    await uploadFiles({
      file: files.inputFiles[0],
      file_address: `profile_photos/${files.inputFiles.at(0)?.name}`
    })

    //create user on the app
    const user: User = {
      username: users.username,
      profile_photo: getFileUrl(`profile_photos/${files.inputFiles.at(0)?.name}`),
      //new member no stories exists!
      stories: {}
    }

    //update account on the server
    await updateAccountUsers({ account_member: user })

    //push user to the app
    users.users.push(user)
  } catch (err: unknown) {
    console.error(err)
    errors.errorStatus = true
    errors.errorMessage = err
  } finally {
    //finalize is loading
    isLoading.isLoadingCreateAccountMember = false
  }
}

//handlers
function handleCreateUser() {
  isCreatingUser.value = true
}

async function submitUser(event: SubmitEvent) {
  event.preventDefault()

  //assign app data
  users.username = createUserFormUsernameModel.value

  //to server
  await upload()

  //clear fields
  createUserFormUsernameModel.value = ''
  files.inputFiles.length = 0

  //exit form
  isCreatingUser.value = false
}
</script>

<template>
  <div class="size-full rounded">
    <!--Select User-->
    <!--If no user is selected display this, user must select a user to continue their session on the app-->
    <div
      v-if="!users.isSelected && !isCreatingUser"
      class="h-1/2 w-full fixed top-1/2 -translate-y-1/2 bg-slate-800 grid grid-cols-6 rounded"
      :class="isLoading.isLoadingCreateAccountMember && 'animate-pulse bg-slate-200'"
    >
      <!--Display existing users-->
      <ListComponent />

      <!--Create new user -->
      <div
        class="col-span-1 h-1/3 w-4/5 translate-y-3/4 rounded bg-slate-600"
        :class="isLoading.isLoadingCreateAccountMember && 'hidden'"
      >
        <ButtonComponent @click="handleCreateUser">Create New User</ButtonComponent>
      </div>
    </div>

    <!--Create User Form Container-->
    <div
      v-if="isCreatingUser"
      class="size-4/6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-slate-800"
    >
      <!--Create User Form Container-->
      <FormComponent>
        <!--Profile Photo-->
        <div
          class="col-start-2 col-span-3 row-start-3 row-span-4 rounded bg-slate-600"
          :class="isLoading.isLoadingCreateAccountMember && 'animate-ping'"
        >
          <!--File Input-->
          <FileInputComponent />
        </div>
        <!--User Name-->
        <div
          class="col-start-6 col-span-6 row-start-4"
          :class="isLoading.isLoadingCreateAccountMember && 'animate-ping'"
        >
          <InputLabel v-model="createUserFormUsernameModel" type="text" label="Enter Username" />
        </div>

        <!--Submit Button-->
        <div
          class="col-start-7 col-span-3 row-start-6 rounded bg-slate-600"
          :class="isLoading.isLoadingCreateAccountMember && 'animate-ping'"
        >
          <ButtonComponent @click="submitUser">Create New User</ButtonComponent>
        </div>
      </FormComponent>
    </div>

    <!--Display User -->
    <div v-if="users.isSelected">
      <!--Display Story-->
      <StoryComponent v-if="stories.stories.length > 0" />
      <div v-if="stories.stories.length === 0" class="h-dvh w-dvw flex justify-center items-center">
        <!--Open write story component-->
        <div class="size-max flex justify-items-center">
          <ButtonComponent @click="() => (writeRead.isReadMode = false)"
            >You don't have any stories. Click here to start creating one...</ButtonComponent
          >
        </div>
      </div>
    </div>
  </div>
</template>
