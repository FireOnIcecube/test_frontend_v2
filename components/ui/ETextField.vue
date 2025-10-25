<template>
  <div class="e-text-field flex flex-col space-y-2">
    <label class="font-semibold text-sm xl:text-base">{{ props.label }}</label>
    <input type="text" class="p-1 xl:p-2 font-semibold text-base rounded-lg" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.e-text-field {
  input[type='text'] {
    background-color: transparent;
    color: var(--color-text);
    border: 1px solid;
    outline: none;
    box-shadow: none;
  }
}
</style>
