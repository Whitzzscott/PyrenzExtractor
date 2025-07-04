import { z } from 'zod'
import { Api } from '~/configs/Api'

const CharacterSchema = z.object({
  name: z.string(),
  description: z.string(),
  persona: z.string(),
  model_instructions: z.string(),
  scenario: z.string(),
  gender: z.string().optional(),
  first_message: z.string(),
  creator: z.string(),
  tags: z.array(z.string()),
  profile_image: z.string(),
  is_public: z.boolean(),
  is_nsfw: z.boolean().optional(),
  is_details_private: z.boolean().optional(),
  lorebook: z.string(),
})

export class SaveCharacter {
  private api: Api

  constructor() {
    this.api = new Api()
  }

  async save(data: unknown): Promise<any> {
    try {
      const validatedData = CharacterSchema.parse(data)
      return await this.api.post('/api/savecharacter', validatedData)
    } catch (error) {
      console.error('Validation or saving failed:', error)
      throw error
    }
  }
}
