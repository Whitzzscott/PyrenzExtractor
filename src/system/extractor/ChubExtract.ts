import { SaveCharacter } from '~/system'

async function fetchData(url: string, payload: any = {}): Promise<any> {
  const queryParams = new URLSearchParams(payload).toString()
  const urlWithQuery = `${url}?${queryParams}`

  const headers: HeadersInit = {}

  const response = await fetch(urlWithQuery, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

function downloadJSON(data: any, filename: string) {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}

export async function ChubAiExtract(
  trigger: boolean,
  showAlert: (message: string, mode: 'success' | 'error') => void
) {
  if (!trigger) return

  const currentUrl = window.location.href
  const isChubAi = currentUrl.startsWith('https://chub.ai/characters/')
  if (!isChubAi) {
    showAlert('Not a ChubAI character URL', 'error')
    return
  }

  const urlParts = currentUrl.split('/')
  const creatorId = urlParts[urlParts.length - 2]
  const characterId = urlParts[urlParts.length - 1]

  if (!creatorId || !characterId) {
    showAlert('Invalid character URL format.', 'error')
    return
  }

  const apiUrl = `https://gateway.chub.ai/api/characters/${creatorId}/${characterId}`

  try {
    const data = await fetchData(apiUrl, { full: true })

    if (data.errors || !data.node?.definition) {
      showAlert(`Error fetching data`, 'error')
      return
    }

    const def = data.node.definition

    const characterData = {
      name: def.name || data.node.name || 'Anon',
      description: def.description || '',
      persona: def.personality || '',
      model_instructions: def.system_prompt || '',
      scenario: def.scenario || '',
      first_message: def.first_message || '',
      creator: creatorId,
      tags: data.node.topics || [],
      profile_image: def.avatar || data.node.avatar_url || '',
      is_public: def.is_public ?? data.node.is_public ?? false,
      lorebook: def.embedded_lorebook || '',
    }

    const saveCharacter = new SaveCharacter()
    await saveCharacter.save(characterData)

    downloadJSON(characterData, 'output.json')

    showAlert('Character saved successfully!', 'success')
  } catch (error) {
    showAlert(
      `Error during extraction or saving: ${error instanceof Error ? error.message : String(error)}`,
      'error'
    )
  }
}
