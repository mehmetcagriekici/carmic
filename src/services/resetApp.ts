//import stores
import { useAuthStore } from '@/stores/auth'
import { useStoriesStore } from '@/stores/stories'
import { useUsersStore } from '@/stores/users'
import { useWriteStoryStore } from '@/stores/WriteStoryStore'
import { useWriteReadStore } from '@/stores/writeRead'
import { useErrorsStore } from '@/stores/errors'
import { useFilesStore } from '@/stores/files'
import { useStoryStore } from '@/stores/story'
import { useAppAccountStore } from '@/stores/appAccount'

export function resetApp() {
  //stores
  //login/signup state for auth
  const auth = useAuthStore()
  //users state
  const users = useUsersStore()
  //stories state
  const stories = useStoriesStore()
  //write story store
  const writeStory = useWriteStoryStore()
  //write/read toggle store
  const writeRead = useWriteReadStore()
  //errors
  const errors = useErrorsStore()
  //files
  const files = useFilesStore()
  //story
  const story = useStoryStore()
  //account
  const appAccount = useAppAccountStore()

  //auth
  auth.username = ''
  auth.password = ''
  auth.email = ''
  auth.authenticated = false
  auth.isLoginForm = true
  auth.isNavForm = false

  //stories
  stories.stories.length = 0
  stories.userStories.length = 0
  stories.storiesStoryIndex = 0
  stories.userStoriesStoryIndex = 0

  //users
  users.users.length = 0
  users.userIndex = 0
  users.isSelected = false

  //write story
  writeStory.frameText = ''
  writeStory.chapterHeading = ''
  writeStory.chapterFrames.length = 0
  writeStory.storyChapters.length = 0
  writeStory.storyName = ''

  //write read story
  writeRead.isReadMode = true

  //errors
  errors.errorMessage = ''
  errors.errorStatus = false

  //files
  files.inputFiles.length = 0

  //story
  story.currentFrameIndex = 0
  story.currentChapterIndex = 0

  //account
  appAccount.account = undefined
}
