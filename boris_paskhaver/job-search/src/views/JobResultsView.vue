<template>
  <h1 class="text-6xl font-bold">Job Results Page</h1>
  <button @click="goToHome">Home Button</button>
</template>

<script>
export default {
  name: 'JobResultsView',
  methods: {
    goToHome() {
      // this.$router.push('/')
      this.$router.push({ name: 'Home' })
      // this.$router.push({ path: '/' })
    }
  }
}
</script>
