<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  modelValue?: string | null
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const safeValue = computed(() => props.modelValue ?? '')

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="e-text-field flex flex-col space-y-2">
    <label class="font-semibold text-sm xl:text-base">{{ props.label }}</label>
    <input
      type="text"
      :value="safeValue"
      @input="onInput"
      class="p-1 xl:p-2 font-semibold text-base rounded-lg"
    />
  </div>
</template>
