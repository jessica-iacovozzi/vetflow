<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const { login, error } = useAuth()
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  await login({
    email: email.value,
    password: password.value
  })
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div v-if="error" class="error">{{ error }}</div>
      
      <div>
        <label for="email">Email:</label>
        <input 
          id="email"
          v-model="email"
          type="email"
          required
        >
      </div>

      <div>
        <label for="password">Password:</label>
        <input 
          id="password"
          v-model="password"
          type="password"
          required
        >
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>