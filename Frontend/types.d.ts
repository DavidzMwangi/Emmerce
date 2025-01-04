type UserLogin = {
  email: string
  password: string
  remember_me?: boolean
}

type Faq = Model & {
  question: string,
  answer: string,
  status: number,
}

type Legal = Model & {
  resource: string,
  content: string,
}

type Blog = Model & {
  title: string,
  content: string,
  date: Date,
}
type User = Model & {
  first_name: string,
  last_name: string,
  name?: string,
  email: string,
  token?: string,
  refresh_token?: string,
  // user_group: number,
  // address: string,
  // city: string,
  // state: string,
  // zip: string,
}
type Lead = Model & {
  title: string,
  company: string,
  description: string,
  status: string
  estimated_value: number | string
  created_by: number
  created_by_name:string

}
type Contact = Model & {
  first_name: string
  last_name: string
  email: string
  phone: string
  position: string
  lead: number
}

type Note = Model & {
  content: string
  lead: Lead
  created_by: number
  created_by_name:string
}

type Reminder = Model & {
  title: string
  description: string
  due_date: Date
  completed: boolean
  lead: Lead
  created_by: number
  created_by_name:string
}

interface Model {
  id: string,
  created_at: string,
  updated_at: string,
}

type DialogEmit = {
  (e: 'update:isDialogVisible', value: boolean): void
}
type ApiResponse<T> = {
  message: string,
  data?: T
  errors?: Record<string, string | undefined>
  page?: number
  pages?: number
  total?: number
}

type BaseState = {
  page: number,
  pages: number,
  total: number,
  errors: Record<string, string | undefined>
  tableParams: { search: string, per_page: number, page: number }
}
