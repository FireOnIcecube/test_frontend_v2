<template>
  <div>
    {{ $t('welcome') }}
    {{ $t('test') }}
    <button @click="$i18n.locale = 'en-US'">English</button>
    <button @click="$i18n.locale = 'zh-TW'">中文</button>
  </div>
</template>

<script setup lang="ts">
const baseUrl = '' // 後端網址 將由面試官提供
</script>

<style scoped lang="scss"></style>
