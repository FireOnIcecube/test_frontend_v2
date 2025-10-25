<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const newUser = reactive({ name: '', age: 0 })
const editUser = reactive({ id: null as number | null, name: '', age: 0 })

// 初始化
await userStore.fetchUsers()

const startEdit = (user: typeof editUser) => {
  editUser.id = user.id
  editUser.name = user.name
  editUser.age = user.age
}
</script>

<template>
  <button @click="$i18n.locale = 'en-US'">English</button>
  <button @click="$i18n.locale = 'zh-TW'">中文</button>
  <div class="container mx-auto grid place-items-center h-screen">
    <div class="w-full p-4 box-border flex flex-col md:flex-row gap-4 justify-center">
      <ECard padding="md" max-width="md" class="flex-1">
        <div class="text-center">
          <h2>{{ $t('action') }}</h2>
        </div>
        <div class="space-y-4">
          <ETextField :label="$t('name')" />
          <ETextField :label="$t('age')" />
        </div>
        <!-- <div class="flex flex-col gap-2 justify-center">
          <ETextField :label="$t('name')" />
          <ETextField :label="$t('age')" />

          <input v-model="newUser.name" placeholder="姓名" />
          <input v-model.number="newUser.age" type="number" placeholder="年齡" />
        </div> -->

        <div class="flex justify-end gap-2 mt-4 lg:mt-8">
          <EBtn>{{ $t('edit') }}</EBtn>
          <EBtn color="warn" @click="userStore.addUser({ name: newUser.name, age: newUser.age })">{{
            $t('add')
          }}</EBtn>
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
              <td colspan="100%" class="text-center bg-gray-800 p-2">{{ $t('noData') }}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="editUser.id !== null">
          <input v-model="editUser.name" placeholder="姓名" />
          <input v-model.number="editUser.age" type="number" placeholder="年齡" />
          <button @click="userStore.updateUser({ ...editUser } as any)">更新</button>
        </div>
      </ECard>
    </div>
  </div>
</template>

<style scoped lang="scss">
thead th {
  padding-bottom: 20px;
}
</style>
