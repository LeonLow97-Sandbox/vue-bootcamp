<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computer Programming, Finance degree"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// Connecting with the Pinia store instead of using $onAction
const skillsSearchTerm = computed({
  // reading from pinia state to this component template
  get() {
    return userStore.skillsSearchTerm
  },
  // writing from component template to pinia state
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value)
  }
})
</script>
