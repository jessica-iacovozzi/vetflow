<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToLogin = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <main>
    <h1>Welcome to Vet Flow</h1>
    <p>Streamline your veterinary visits with smart questionnaires</p>
    <button @click="navigateToLogin">Get Started</button>
  </main>
</template>