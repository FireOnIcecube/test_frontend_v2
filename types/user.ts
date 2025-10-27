export interface User {
  id: number
  name: string
  age: number
}

export type UserForm = {
  id: number | null
} & {
  [K in Exclude<keyof User, 'id'>]: User[K] extends number ? string | null : User[K] | null
}
