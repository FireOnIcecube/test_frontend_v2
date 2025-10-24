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
  <div class="grid place-items-center h-screen">
    <div>
      <input v-model="newUser.name" placeholder="姓名" />
      <input v-model.number="newUser.age" type="number" placeholder="年齡" />
      <button @click="userStore.addUser({ name: newUser.name, age: newUser.age })">新增</button>

      <ul>
        <li v-for="user in userStore.users" :key="user.id">
          {{ user.name }} - {{ user.age }}
          <button @click="startEdit(user)">編輯</button>
          <button @click="userStore.deleteUser(user.id)">刪除</button>
        </li>
      </ul>

      <div v-if="editUser.id !== null">
        <input v-model="editUser.name" placeholder="姓名" />
        <input v-model.number="editUser.age" type="number" placeholder="年齡" />
        <button @click="userStore.updateUser({ ...editUser } as any)">更新</button>
      </div>
    </div>
  </div>
</template>
