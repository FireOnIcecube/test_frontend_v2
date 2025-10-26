<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '~/stores/user'
import type { UserForm, User } from '~/types/user'

// 初始化
const userStore = useUserStore()
const { t } = useI18n()

await userStore.fetchUsers()
const inputUser = ref<UserForm>({
  id: null,
  name: null,
  age: null,
})

function startEdit(user: User) {
  inputUser.value = { ...user, age: String(user.age) }
}

// 輸入驗證失敗的提示文字
const errorText = ref<string>()

const handleSubmitUser = () => {
  const { id, name, age } = inputUser.value

  if (!validateInput('name', name)) return

  if (!validateInput('age', age)) return

  const payload = {
    name: name!.trim(),
    age: Number(age),
  }

  // 用包含 id 判斷 新增/修改
  if (id === null) {
    userStore.addUser(payload)
  } else {
    userStore.updateUser({ id, ...payload })
  }

  resetForm()
}

// 重置表單
function resetForm() {
  inputUser.value = { id: null, name: null, age: null }
  errorText.value = ''
}

function validateInput(key: keyof UserForm, value: unknown) {
  let isValid = true
  let errorMsg = ''

  switch (key) {
    case 'name':
      if (typeof value !== 'string' || value.trim() === '') {
        errorMsg = t('name-cannot-be-empty')
        isValid = false
      }
      break

    case 'age':
      const num = Number(value)
      if (!Number.isInteger(num) || num <= 0) {
        errorMsg = '年齡必須為正整數'
        isValid = false
      }
      break
  }

  errorText.value = errorMsg
  return isValid
}
</script>

<template>
  <button @click="$i18n.setLocale('en-US')">English</button>
  <button @click="$i18n.setLocale('zh-TW')">中文</button>
  <div class="container mx-auto grid place-items-center h-screen">
    <div class="w-full p-4 box-border flex flex-col md:flex-row gap-4 justify-center">
      <ECard padding="md" max-width="md" class="flex-1">
        <div class="text-center">
          <h2>{{ $t('action') }}</h2>
        </div>
        <div class="space-y-4">
          <ETextField
            :label="$t('name')"
            v-model="inputUser.name"
            @update:model-value="
              (val) => {
                validateInput('name', val)
              }
            "
          />
          <ETextField
            :label="$t('age')"
            v-model="inputUser.age"
            @update:model-value="
              (val) => {
                validateInput('age', val)
              }
            "
          />
        </div>
        <p class="text-red-500">{{ errorText }}</p>

        <div class="flex justify-end gap-2 mt-4 lg:mt-8">
          <EBtn @click="handleSubmitUser">{{ $t('edit') }}</EBtn>
          <EBtn color="warn" @click="handleSubmitUser">{{ $t('add') }}</EBtn>
        </div>
      </ECard>
      <ECard padding="md" max-width="xl" class="flex-1">
        <table class="w-full border-collapse whitespace-nowrap">
          <thead class="text-center [&>tr>th]:w-[25%]">
            <tr>
              <th>#</th>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('age') }}</th>
              <th>{{ $t('action') }}</th>
            </tr>
          </thead>

          <tbody>
            <template v-if="userStore.users.length">
              <tr v-for="user in userStore.users" :key="user.id" class="text-center">
                <td class="border border-b-solid border-[var(--color-border)]">{{ user.id }}</td>
                <td class="border border-b-solid border-[var(--color-border)]">{{ user.name }}</td>
                <td class="border border-b-solid border-[var(--color-border)]">{{ user.age }}</td>
                <td class="border border-b-solid border-[var(--color-border)]">
                  <div class="flex flex-nowrap gap-x-2 justify-center">
                    <EBtn @click="startEdit(user)">{{ $t('edit') }}</EBtn>
                    <EBtn color="error" @click="userStore.deleteUser(user.id)">{{
                      $t('delete')
                    }}</EBtn>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="100%" class="text-center bg-gray-800 p-2">{{ $t('no-data') }}</td>
            </tr>
          </tbody>
        </table>
      </ECard>
    </div>
  </div>
</template>

<style scoped lang="scss">
thead th {
  padding-bottom: 20px;
}
</style>
