import axios from 'axios'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  try {
    const res = await axios.get(`${config.apiEndpoint}/user`)
    return res.data
  } catch (err: any) {
    console.error('GET /user error:', err.message)
    throw createError({
      statusCode: err.response?.status || 500,
      statusMessage: err.message,
    })
  }
})
