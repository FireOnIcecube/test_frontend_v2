import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) // 讀取 { id: 123 }

  try {
    const res = await axios.delete(`${config.apiEndpoint}/user`, {
      data: body, // DELETE 也可以用 data 傳 body
      headers: { 'Content-Type': 'application/json' },
    })
    return res.data
  } catch (err: any) {
    console.error('DELETE /user error:', err.message)
    throw createError({
      statusCode: err.response?.status || 500,
      statusMessage: err.message,
    })
  }
})
