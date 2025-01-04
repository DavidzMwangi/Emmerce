import axios from 'axios'

export const successSnack = ref('')

const timeouts = {
  success: null,
  error: null,
}

const baseURL = `${import.meta.env.VITE_BASE_URL || 'http://127.0.0.1:8000'}/api`

const axiosIns = axios.create({ baseURL })

const refreshToken = async () => {
  try {
    const { data: { data: { token } } } = await axios.post(`${baseURL}/auth/refresh`, {
      refresh_token: localStorage.getItem('refreshToken') || '',
    })

    localStorage.setItem('accessToken', token)
    axiosIns.defaults.headers.Authorization = `Bearer ${token}`
  }
  catch (error) {
    ['accessToken', 'refreshToken', 'userData', 'userAbilities'].map(item => localStorage.removeItem(item))
    window.location.reload()
  }
}

axiosIns.interceptors.request.use(
  config => {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Token ${localStorage.getItem('accessToken') || ''}`,
    }

    return config
  },
)

axiosIns.interceptors.response.use(
  response => {
    if ([200, 201, 204].includes(response.status) && ['post', 'put', 'delete'].includes(<string>response.config.method)) {
      successSnack.value = response.data.message
      clearTimeout(timeouts.success)
      timeouts.success = setTimeout(() => successSnack.value = '', 3000)
    }

    return response
  },
  async error => {
    const originalRequest = error.config
    if (error?.response?.status === 401) {
      if (!originalRequest._retry && localStorage.getItem('refreshToken')) {
        originalRequest._retry = true
        await refreshToken()

        return axiosIns(originalRequest)
      }
      else {
        ['accessToken', 'refreshToken', 'userData', 'userAbilities'].map(item => localStorage.removeItem(item))
        window.location.reload()
      }
    }

    return Promise.reject(error)
  },
)

export default axiosIns
