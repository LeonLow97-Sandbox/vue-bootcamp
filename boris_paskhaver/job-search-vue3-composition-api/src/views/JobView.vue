<template>
  <div>Job Page for job {{ currentJobId }}</div>
</template>

<script>
export default {
  name: 'JobView',
  computed: {
    currentJobId() {
        return this.$route.params.id // useful to retrieve information from backend
    }
  }
}
</script>
