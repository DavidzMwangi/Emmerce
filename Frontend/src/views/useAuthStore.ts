import type { RemovableRef } from '@vueuse/core'
import { useCookie } from '@core/composable/useCookie'
import axiosIns from '@axios'

interface State {
  credentials: UserLogin | {}
  user: RemovableRef<User | {}>
  token: RemovableRef<string>
  refresh_token: RemovableRef<string>
  userAbilities: RemovableRef<{ action: string; subject: string }[]>
  errors: Record<string, string | string[]>
}

export const useAuthStore = defineStore('AuthStore', {
  state: (): State => ({
    credentials: {},
    user: useStorage('userData', {}),
    token: useStorage('accessToken', ''),
    refresh_token: useStorage('refreshToken', ''),
    userAbilities: useStorage('userAbilities', []),
    errors: {},
  }),
  actions: {
    async login() {
      await axiosIns.post<ApiResponse<User>>('auth/login', this.credentials).then(({ data: { data: { token, refresh_token, ...userData } } }) => {
        this.user = userData!
        this.token = token!
        this.refresh_token = refresh_token!
        this.userAbilities = [{ action: 'manage', subject: 'all' }]
      })
        .catch(e => {
          if (e.response.status === 422) {
            this.errors = e.response.data.errors
            setTimeout(() => this.errors = {}, 4000)
          }
        })
    },
  },
})
