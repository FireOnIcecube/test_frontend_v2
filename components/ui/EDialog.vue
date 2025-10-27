<template>
  <div v-if="isVisible" class="e-dialog-wrapper" @click.self="onCancel">
    <div class="e-dialog-content" :class="{ 'fade-in': show, 'fade-out': !show }">
      <header class="e-dialog-header">
        <slot name="header">提示</slot>
      </header>

      <main class="e-dialog-body">
        <slot>這是一個對話框內容</slot>
      </main>

      <footer class="e-dialog-footer">
        <EBtn color="cancel" class="btn cancel" @click="onCancel">{{ $t('cancel') }}</EBtn>
        <EBtn class="btn confirm" @click="onConfirm">{{ $t('confirm') }}</EBtn>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const show = ref(false)
const isVisible = ref(false)

watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      isVisible.value = true
      await nextTick()
      show.value = true
    } else {
      show.value = false
      setTimeout(() => {
        isVisible.value = false
      }, 300)
    }
  },
  { immediate: true }
)

function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}

function onConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.e-dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.e-dialog-content {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.3s ease;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  &.fade-out {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.e-dialog-header {
  font-weight: bold;
  margin-bottom: 1rem;
}

.e-dialog-body {
  margin-bottom: 1.5rem;
}

.e-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
