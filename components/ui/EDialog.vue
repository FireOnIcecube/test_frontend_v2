<template>
  <dialog
    ref="dialogEl"
    @close="onClose"
    @cancel.prevent
    class="dialog"
    @click.self="close"  <!-- 點擊 backdrop 關閉 -->
  >
    <div class="dialog-content" :class="{ 'animate-in': show, 'animate-out': !show }">
      <slot />
      <button @click="close">關閉</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, defineExpose } from 'vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'close'])

const dialogEl = ref<HTMLDialogElement>()
const show = ref(false)

watch(
  () => props.modelValue,
  async (val) => {
    if (!dialogEl.value) return
    if (val) {
      dialogEl.value.showModal()
      await nextTick()
      show.value = true // 啟動動畫
    } else {
      show.value = false
      setTimeout(() => dialogEl.value?.close(), 200)
    }
  }
)

const close = () => {
  emit('update:modelValue', false)
}

const onClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

defineExpose({ close })
</script>

<style scoped>
.dialog {
  border: none;
  border-radius: 12px;
  padding: 0;
  background: transparent;
}

::backdrop {
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.2s ease;
}

.dialog-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 300px;
  transform: scale(0.95);
  opacity: 0;
  transition: all 0.2s ease;
}

/* 開啟動畫 */
.animate-in {
  transform: scale(1);
  opacity: 1;
}

/* 關閉動畫 */
.animate-out {
  transform: scale(0.95);
  opacity: 0;
}
</style>
