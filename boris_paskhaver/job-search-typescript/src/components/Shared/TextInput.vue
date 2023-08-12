<template>
  <input
    type="text"
    :value="modelValue"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      // passing value from Child component to Parent component
      // the payload in this event is `this.value`
      this.$emit('update:modelValue', $event.target.value)
    }
  }
}
</script>
