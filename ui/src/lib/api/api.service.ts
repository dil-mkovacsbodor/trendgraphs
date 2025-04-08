import type { QueryPayload } from '../schema/form.schema'
import { queryPayloadSchema } from '../schema/form.schema'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://61mbal589a.execute-api.us-west-2.amazonaws.com/prod/company-config'

export const apiService = {
  async submitQuery(payload: QueryPayload) {
    try {
      queryPayloadSchema.parse(payload)

      const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error submitting query:', error)
      throw error
    }
  },
}