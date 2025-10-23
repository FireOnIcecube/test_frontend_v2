<script setup lang="ts">
import UserList from '../components/user/UserList'

const baseUrl = '' // 後端網址 將由面試官提供
</script>

<template>
  <div>
    <div class="">{{ $t('welcome') }}</div>
    <div>{{ $t('test') }}</div>
    <button @click="$i18n.locale = 'en-US'">English</button>
    <button @click="$i18n.locale = 'zh-TW'">中文</button>

    <UserList />
  </div>
</template>

<style scoped lang="scss"></style>
