<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), { text: '', color: 'success', disabled: false })

const emit = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
  emit('click')
}

const btnClass = computed(() => `e-btn e-btn-${props.color}`)
</script>

<template>
  <button
    :class="btnClass"
    :disabled="props.disabled"
    class="font-semibold text-base xl:text-lg"
    @click="onClick"
  >
    {{ props.text || '' }}
    <slot v-if="!props.text" />
  </button>
</template>

<style scoped lang="scss">
.e-btn {
  color: var(--color-text);
  padding: 0.25rem 1rem;
  border-radius: 0.375rem;
  transition: 0.3s;
  cursor: pointer;
  outline: none;
  box-shadow: none;

  &.disabled,
  &[disabled] {
    filter: var(--btn-disabled-filter);
    cursor: not-allowed;
    pointer-events: none;
  }

  // success 綠
  &-success {
    background-color: var(--color-success);

    &:hover {
      background-color: var(--color-success-hover);
    }
    &:active {
      background-color: var(--color-success-active);
    }
  }

  // error 紅
  &-error {
    background-color: var(--color-error);

    &:hover {
      background-color: var(--color-error-hover);
    }
    &:active {
      background-color: var(--color-error-active);
    }
  }

  // warn 黃
  &-warn {
    background-color: var(--color-warn);
    color: black;

    &:hover {
      background-color: var(--color-warn-hover);
    }
    &:active {
      background-color: var(--color-warn-active);
    }
  }
}
</style>
