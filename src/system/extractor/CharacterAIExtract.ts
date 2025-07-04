import { SaveCharacter } from '~/system'

export async function CharacterAIExtract(
  trigger: boolean,
  showAlert: (message: string, mode: 'success' | 'error') => void
) {
  if (!trigger) return

  const currentUrl = window.location.href
  const isCharacterAI = currentUrl.startsWith('https://character.ai/chat/')

  if (!isCharacterAI) {
    showAlert('Not a CharacterAI chat URL', 'error')
    return
  }

  const urlParts = currentUrl.split('/')
  const externalId = urlParts[urlParts.length - 1]

  if (!externalId) {
    showAlert('No external ID found in the URL', 'error')
    return
  }

  const apiUrl = 'https://neo.character.ai/character/v1/get_character_info'

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id: externalId,
        lang: 'en',
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.character) {
      showAlert('Character data not found', 'error')
      return
    }

    const character = data.character
    const characterData = {
      name: character.name || character.title || 'Anon',
      description: character.description || '',
      persona: character.definition || '',
      first_message: character.greeting || '',
      creator: character.user__username || 'Unknown',
      tags: [],
      profile_image: character.avatar_file_name
        ? `https://characterai.io/i/${character.avatar_file_name}`
        : '',
      is_public: character.visibility === 'PUBLIC',
    }

    const saveCharacter = new SaveCharacter()
    await saveCharacter.save(characterData)
    showAlert('CharacterAI character saved successfully!', 'success')
  } catch (error) {
    showAlert(
      `Error during CharacterAI extraction: ${error instanceof Error ? error.message : String(error)}`,
      'error'
    )
  }
}
