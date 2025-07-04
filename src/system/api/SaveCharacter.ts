import { z } from 'zod'

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

function downloadJSON(data: z.infer<typeof CharacterSchema>, filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export class SaveCharacter {
  async save(data: unknown): Promise<void> {
    try {
      const validatedData = CharacterSchema.parse(data)
      downloadJSON(validatedData, 'character.json')
    } catch (error) {
      console.error('Validation or downloading failed:', error)
      throw error
    }
  }
}
