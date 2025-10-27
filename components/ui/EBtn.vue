<script setup lang="ts">
interface Props {
  text?: string
  disabled?: boolean
  color?: 'success' | 'error' | 'warn' | 'cancel'
  toggle?: boolean
  pressed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  color: 'success',
  disabled: false,
  toggle: false,
  pressed: false,
})

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'press'): void
  (e: 'unpress'): void
  (e: 'update:pressed', value: boolean): void
}>()

const isPressed = ref(props.pressed)
watch(
  () => props.pressed,
  (v) => (isPressed.value = v)
)

function onClick() {
  if (props.disabled) return

  emit('click')

  if (props.toggle) {
    isPressed.value = !isPressed.value
    emit('update:pressed', isPressed.value)

    if (isPressed.value) {
      emit('press')
    } else {
      emit('unpress')
    }
  }
}

const btnClass = computed(() => `e-btn e-btn-${props.color}`)
</script>

<template>
  <button
    :class="btnClass"
    :disabled="props.disabled"
    :aria-pressed="isPressed"
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

  &:active,
  &[aria-pressed='true'] {
    transform: translateY(1px) scale(0.97);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  // success 綠
  &-success {
    background-color: var(--color-success);

    &:hover {
      background-color: var(--color-success-hover);
    }
    &:active,
    &[aria-pressed='true'] {
      background-color: var(--color-success-active);
      border: 2px solid darkgreen;
    }
  }

  // error 紅
  &-error {
    background-color: var(--color-error);

    &:hover {
      background-color: var(--color-error-hover);
    }
    &:active,
    &[aria-pressed='true'] {
      background-color: var(--color-error-active);
      border: 2px solid darkred;
    }
  }

  // warn 黃
  &-warn {
    background-color: var(--color-warn);
    color: black;

    &:hover {
      background-color: var(--color-warn-hover);
    }
    &:active,
    &[aria-pressed='true'] {
      background-color: var(--color-warn-active);
      border: 2px solid goldenrod;
    }
  }

  &-cancel {
    background-color: var(--color-cancel);

    &:hover {
      background-color: var(--color-cancel-hover);
    }
    &:active,
    &[aria-pressed='true'] {
      background-color: var(--color-cancel-active);
      border: 2px solid black;
    }
  }
}
</style>
