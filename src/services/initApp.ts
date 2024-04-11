//data from the server is assigned to app.

//services
import { getAccount } from './apiAccount'
//stores
import { useUsersStore } from '@/stores/users'
import { useStoriesStore } from '@/stores/stories'

export async function initApp() {
  //users state
  const users = useUsersStore()
  //stories state
  const stories = useStoriesStore()

  try {
    //account[0] is the current account
    const { account } = await getAccount()

    if (account[0].users)
      for (const userKey in account[0].users) {
        //push account members to the users store
        users.users.push(account[0].users[userKey])
        //update account / user stories (only for app)
        for (const storyKey in account[0].users[userKey].stories) {
          stories.stories.push(account[0].users[userKey].stories[storyKey])
          stories.userStories.push(account[0].users[userKey].stories[storyKey])
        }
      }
  } catch (error) {
    console.error(error)
  }
}
