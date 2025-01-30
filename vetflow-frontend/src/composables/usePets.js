import { ref, onMounted } from 'vue'
import apiClient from '@/api/config'

const pets = ref([])
const currentPet = ref(null)
const isLoading = ref(false)
const error = ref(null)

export function usePets() {
    async function fetchPets() {
        isLoading.value = true
        try {
            const response = await apiClient.get('/pets/')
            pets.value = response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch pets'
        } finally {
            isLoading.value = false
        }
    }

    async function addPet(petData) {
        try {
            const response = await apiClient.post('/pets/', petData)
            pets.value.push(response.data)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to add pet'
            throw err
        }
    }

    onMounted(() => {
        fetchPets()
    })

    return {
        pets,
        currentPet,
        isLoading,
        error,
        fetchPets,
        addPet
    }
}