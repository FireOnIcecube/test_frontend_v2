import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, ApiResponse } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const errorMsg = ref('')

  // 取得使用者列表
  const fetchUsers = async () => {
    loading.value = true
    try {
      const res = await $fetch<ApiResponse<User[]>>('/api/user')
      users.value = res.data || []
    } catch (err: any) {
      errorMsg.value = err?.message || '取得使用者失敗'
    } finally {
      loading.value = false
    }
  }

  // 新增使用者
  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      await $fetch<ApiResponse>('/api/user', { method: 'POST', body: user })
      await fetchUsers()
    } catch (err: any) {
      errorMsg.value = err?.message || '新增失敗'
    }
  }

  // 更新使用者
  const updateUser = async (user: User) => {
    try {
      await $fetch<ApiResponse>(`/api/user/${user.id}`, { method: 'PUT', body: user })
      await fetchUsers()
    } catch (err: any) {
      errorMsg.value = err?.message || '更新失敗'
    }
  }

  // 刪除使用者
  const deleteUser = async (id: number) => {
    try {
      await $fetch<ApiResponse>(`/api/user/${id}`, { method: 'DELETE', body: { id } })
      await fetchUsers()
    } catch (err: any) {
      errorMsg.value = err?.message || '刪除失敗'
    }
  }

  return { users, loading, errorMsg, fetchUsers, addUser, updateUser, deleteUser }
})
