import { ref } from 'vue'
import apiClient from '@/api/config'

export function useQuestionnaires() {
    const questionnaires = ref([])
    const currentQuestionnaire = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    async function fetchQuestionnaires(petId) {
        isLoading.value = true
        try {
            const response = await apiClient.get(`/questionnaires/?pet=${petId}`)
            questionnaires.value = response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch questionnaires'
        } finally {
            isLoading.value = false
        }
    }

    async function submitQuestionnaire(data) {
        try {
            const response = await apiClient.post('/questionnaires/', data)
            questionnaires.value.push(response.data)
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to submit questionnaire'
            throw err
        }
    }

    return {
        questionnaires,
        currentQuestionnaire,
        isLoading,
        error,
        fetchQuestionnaires,
        submitQuestionnaire
    }
}