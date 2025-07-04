import { z } from 'zod'
import { Api } from '~/configs/Api'
import { supabase } from '~/configs/Supabase'

const CharacterSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  persona: z.string().optional(),
  model_instructions: z.string().optional(),
  scenario: z.string().optional(),
  gender: z.string().optional(),
  first_message: z.string(),
  creator: z.string().optional(),
  tags: z.array(z.string()).optional(),
  profile_image: z.string(),
  is_public: z.boolean().optional(),
  is_nsfw: z.boolean().optional(),
  is_details_private: z.boolean().optional(),
  lorebook: z.string().optional(),
})

function downloadJSON(data: z.infer<typeof CharacterSchema> & { user_uuid: string }, filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

interface ApiResponse {
  success: boolean
}

export class SaveCharacter {
  private api: Api

  constructor() {
    this.api = new Api()
  }

  async save(data: unknown): Promise<ApiResponse> {
    try {
      const validatedData = CharacterSchema.parse(data)

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        throw new Error('User not authenticated')
      }

      const payloadWithUser = {
        ...validatedData,
        user_uuid: user.id,
      }

      downloadJSON(payloadWithUser, 'character.json')

      const response = await this.api.post<ApiResponse>('/api/CharacterExtract', payloadWithUser)

      return response
    } catch (error) {
      console.error('Validation or saving failed:', error)
      throw error
    }
  }
}
