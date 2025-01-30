import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

// Types
interface ErrorResponse {
  message: string
  errors?: Record<string, string[]>
}

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  // timeout: 10000 // Optional: set timeout
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponse>) => {
    // Handle 401 errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    // Handle API error messages
    const message = error.response?.data?.message || 'An error occurred'
    error.message = message
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  auth: {
    login: '/auth/login/',
    logout: '/auth/logout/',
    register: '/auth/register/'
  },
  pets: {
    list: '/pets/',
    detail: (id: string) => `/pets/${id}/`,
    create: '/pets/'
  },
  questionnaires: {
    list: '/questionnaires/',
    detail: (id: string) => `/questionnaires/${id}/`,
    create: '/questionnaires/',
    forPet: (petId: string) => `/questionnaires/?pet=${petId}`
  }
}

// API methods
export const api = {
  auth: {
    login: (credentials: { email: string; password: string }) => 
      apiClient.post(endpoints.auth.login, credentials),
    logout: () => apiClient.post(endpoints.auth.logout)
  },
  pets: {
    list: () => apiClient.get(endpoints.pets.list),
    getOne: (id: string) => apiClient.get(endpoints.pets.detail(id)),
    create: (data: any) => apiClient.post(endpoints.pets.create, data),
    update: (id: string, data: any) => apiClient.put(endpoints.pets.detail(id), data)
  },
  questionnaires: {
    list: () => apiClient.get(endpoints.questionnaires.list),
    getOne: (id: string) => apiClient.get(endpoints.questionnaires.detail(id)),
    create: (data: any) => apiClient.post(endpoints.questionnaires.create, data),
    forPet: (petId: string) => apiClient.get(endpoints.questionnaires.forPet(petId))
  }
}

export default apiClient