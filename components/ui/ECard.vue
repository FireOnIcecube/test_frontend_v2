<script setup lang="ts">
type PaddingSize = 'none' | 'sm' | 'md' | 'lg'
type WidthSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  padding?: PaddingSize
  maxWidth?: WidthSize
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  maxWidth: 'none',
})

const paddingClass = computed(
  () =>
    ({
      none: '',
      sm: 'p-2 lg:p-4',
      md: 'p-4 lg:p-8',
      lg: 'p-8 lg:p-12',
    })[props.padding]
)

const widthClass = computed(
  () =>
    ({
      none: '',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    })[props.maxWidth]
)
</script>

<template>
  <div
    class="rounded-lg border border-[var(--color-border)] border-solid"
    :class="[paddingClass, widthClass]"
  >
    <slot />
  </div>
</template>
