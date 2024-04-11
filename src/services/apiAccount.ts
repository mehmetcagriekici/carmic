import supabase, { supabaseURL } from '@/lib/supabaseClient'

import type { Chapter, InitialAccount, Story, User } from '@/data/data_types'

//supabase signup function
export async function userSignup({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) throw new Error(error.message)

  return { data }
}

//supabase login fucntion
export async function userLogin({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(error.message)

  return { data }
}

//for the signup (account initialization) create account at supabase account table
export async function initAccount(accountInitial: InitialAccount) {
  const { data, error } = await supabase.from('account').insert([accountInitial]).select()

  if (error) throw new Error(error.message)

  return { data }
}

//get current account
export async function getAccount() {
  //get user id from supabase to match ids with accounts table
  const {
    data: { user }
  } = await supabase.auth.getUser()

  //returns [account]
  const { data: account, error } = await supabase
    .from('account')
    .select('*')
    .eq('user_id', user?.id)

  if (error) throw new Error(error.message)

  return { account }
}

//user logout
export async function userLogout() {
  const { error } = await supabase.auth.signOut()

  if (error) throw new Error(error.message)
}

//upload files to server
export async function uploadFiles({ file, file_address }: { file: File; file_address: string }) {
  const { data, error } = await supabase.storage.from('images').upload(file_address, file)

  //!!!!!!! give images unique names !!!!!!!!!!!1
  if (error?.message === 'The resource already exists') return 'fix this!!!'

  if (error) throw new Error(error.message)

  return { data }
}

//download files from the server
export function getFileUrl(file_address: string) {
  return `${supabaseURL}/storage/v1/object/public/images/${file_address}`
}

//update account
export async function updateAccountUsers({ account_member }: { account_member: User }) {
  //get user id from supabase to match ids with accounts table
  const {
    data: { user }
  } = await supabase.auth.getUser()

  //get previous data from the account
  const { data: accountUsers, error: getAccountError } = await supabase
    .from('account')
    .select('users')
    .eq('user_id', user?.id)

  if (getAccountError) throw new Error(getAccountError.message)

  //check if username already exists
  if (
    Object.keys(accountUsers.at(0)?.users).some((username) => username === account_member.username)
  )
    throw new Error('Username already exist!')

  const { data, error: updateError } = await supabase
    .from('account')
    .update({ users: { ...accountUsers.at(0)?.users, [account_member.username]: account_member } })
    .eq('user_id', user?.id)
    .select()

  if (updateError) throw new Error(updateError.message)

  return { data }
}

//update main stories branch (independent)
export async function updateStories({
  name,
  chapters
}: {
  name: string
  chapters: { [key: number]: Chapter }
}) {
  //get user id from supabase to match ids with accounts table
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('story')
    .insert([{ user_id: user?.id, name, chapters }])
    .select()

  if (error) throw new Error(error.message)

  return { data }
}

//update user stories (inside account)
export async function updateUserStories(story: Story, username: string) {
  //get user id from supabase to match ids with accounts table
  const {
    data: { user }
  } = await supabase.auth.getUser()

  //get previous data from the account
  const { data: accountUsers, error: getAccountError } = await supabase
    .from('account')
    .select('users')
    .eq('user_id', user?.id)

  if (getAccountError) throw new Error(getAccountError.message)

  const { data, error } = await supabase
    .from('account')
    .update({
      users: {
        ...accountUsers.at(0)?.users,
        [username]: {
          ...accountUsers.at(0)?.users[username],
          stories: {
            ...accountUsers.at(0)?.users[username].stories,
            [Object.entries(accountUsers.at(0)?.users[username].stories || {}).length]: story
          }
        }
      }
    })
    .eq('user_id', user?.id)
    .select()

  if (error) throw new Error(error.message)

  return { data }
}
