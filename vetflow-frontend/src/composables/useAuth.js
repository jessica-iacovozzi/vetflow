import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api/config'

const user = ref(null)
const error = ref(null)
const isLoading = ref(false)

export function useAuth() {
    const router = useRouter()
    const isAuthenticated = computed(() => !!user.value)

    async function login(credentials) {
        error.value = null
        isLoading.value = true
        try {
            const response = await apiClient.post('/auth/login/', credentials)
            localStorage.setItem('token', response.data.token)
            user.value = response.data.user
            router.push('/dashboard')
        } catch (err) {
            error.value = err.response?.data?.message || 'Login failed'
        } finally {
            isLoading.value = false
        }
    }

    function logout() {
        localStorage.removeItem('token')
        user.value = null
        router.push('/login')
    }

    return {
        user,
        error,
        isLoading,
        isAuthenticated,
        login,
        logout
    }
}