export interface Frame {
  text: string
  images: string[]
}

export interface Chapter {
  heading: string
  frames: { [key: number]: Frame }
}

export interface Story {
  name: string
  chapters: { [key: number]: Chapter }
}

export interface User {
  username: string
  profile_photo: string
  stories: {
    [key: number]: Story
  }
}

export interface Account {
  authenticated: boolean
  email: string
  users: {
    [key: number]: User
  }
}

export interface SendStoryParams {
  name: string
  chapters: { [key: number]: Chapter }
}

export interface SignUpParams {
  email: string
  password: string
  username: string
  authenticated: boolean
}

export interface InitialAccount {
  authenticated: boolean
  email: string
  user_id: string
  users: { [key: string]: User }
}
