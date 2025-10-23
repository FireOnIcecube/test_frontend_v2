<script setup lang="ts">
import { ref, reactive } from 'vue'

// 表單資料
const newUser = reactive({
  name: '',
  age: 0,
})

// 選取要更新的使用者
const editUser = reactive({
  id: null as number | null,
  name: '',
  age: 0,
})

const users = ref<Array<any>>([])
const errorMsg = ref('')
const loading = ref(false)

// 取得使用者列表
const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/user')
    users.value = res.data || res
  } catch (err: any) {
    errorMsg.value = err?.message || '取得使用者失敗'
  } finally {
    loading.value = false
  }
}

// 新增使用者
const addUser = async () => {
  try {
    await $fetch('/api/user', {
      method: 'POST',
      body: { name: newUser.name, age: newUser.age },
    })
    newUser.name = ''
    newUser.age = 0
    await fetchUsers()
  } catch (err: any) {
    errorMsg.value = err?.message || '新增失敗'
  }
}

const startEdit = (user: { id: number; name: string; age: number }) => {
  editUser.id = user.id
  editUser.name = user.name
  editUser.age = user.age
}

// 更新使用者
const updateUser = async () => {
  if (!editUser.id) return
  try {
    await $fetch('/api/user', {
      method: 'PUT',
      body: {
        id: editUser.id,
        name: editUser.name,
        age: editUser.age,
      },
    })
    editUser.id = null
    editUser.name = ''
    editUser.age = 0
    await fetchUsers()
  } catch (err: any) {
    errorMsg.value = err?.message || '更新失敗'
  }
}

// 刪除使用者
const deleteUser = async (id: number) => {
  try {
    await $fetch('/api/user', {
      method: 'DELETE',
      body: { id },
    })
    await fetchUsers()
  } catch (err: any) {
    errorMsg.value = err?.message || '刪除失敗'
  }
}

// 頁面掛載時載入使用者
await fetchUsers()
</script>

<template>
  <div class="p-4 space-y-6">
    <h2 class="text-xl font-bold">使用者管理</h2>

    <!-- 新增使用者 -->
    <div class="space-y-2 border p-4 rounded">
      <h3 class="font-semibold">新增使用者</h3>
      <input v-model="newUser.name" placeholder="姓名" class="border p-1 rounded w-full" />
      <input
        v-model.number="newUser.age"
        type="number"
        placeholder="年齡"
        class="border p-1 rounded w-full"
      />
      <button @click="addUser" class="bg-green-500 text-white px-4 py-2 rounded mt-2">新增</button>
    </div>

    <!-- 更新使用者 -->
    <div v-if="editUser.id" class="space-y-2 border p-4 rounded">
      <h3 class="font-semibold">更新使用者</h3>
      <input v-model="editUser.name" placeholder="姓名" class="border p-1 rounded w-full" />
      <input
        v-model.number="editUser.age"
        type="number"
        placeholder="年齡"
        class="border p-1 rounded w-full"
      />
      <button @click="updateUser" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        更新
      </button>
    </div>

    <!-- 使用者列表 -->
    <div class="space-y-2 border p-4 rounded">
      <h3 class="font-semibold">使用者列表</h3>
      <div v-if="loading">載入中...</div>
      <div v-if="errorMsg" class="text-red-600">{{ errorMsg }}</div>
      <ul>
        <li v-for="user in users" :key="user.id" class="flex justify-between items-center py-1">
          <span>{{ user.name }} - {{ user.age }}</span>
          <div class="space-x-2">
            <button @click="startEdit(user)" class="bg-yellow-500 text-white px-2 py-1 rounded">
              編輯
            </button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-2 py-1 rounded">
              刪除
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
input {
  box-sizing: border-box;
}
</style>
