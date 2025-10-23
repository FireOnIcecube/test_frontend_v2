import axios from 'axios'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  try {
    const res = await axios.post(`${config.apiEndpoint}/user`, body, {
      headers: { 'Content-Type': 'application/json' },
    })
    return res.data
  } catch (err: any) {
    console.error('POST /user error:', err.message)
    throw createError({
      statusCode: err.response?.status || 500,
      statusMessage: err.message,
    })
  }
})
