<script setup>
import { usePets } from '@/composables/usePets'

const { pets, isLoading, error, addPet } = usePets()
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="pet in pets" :key="pet.id">
        {{ pet.name }}
      </li>
    </ul>
  </div>
</template>