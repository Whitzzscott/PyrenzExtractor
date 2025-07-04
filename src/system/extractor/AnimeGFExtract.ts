import { SaveCharacter } from '~/system'

const SUPABASE_URL = 'https://pjoabwtwjcpohcpuhijy.supabase.co/rest/v1'
const SUPABASE_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqb2Fid3R3amNwb2hjcHVoaWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTUwNzQsImV4cCI6MjA1MzU3MTA3NH0.iTks0t3CWkr1JVGYD0lH-s5_IZWUb9QpmPWWsdyDqzE'

const getAccessToken = (): string => {
  const raw = localStorage.getItem('sb-pjoabwtwjcpohcpuhijy-auth-token')
  if (!raw) throw new Error('No Supabase auth token found')
  const parsed = JSON.parse(raw)
  const token = parsed.access_token
  if (!token) throw new Error('Access token missing')
  return token
}

const buildHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  apikey: SUPABASE_API_KEY,
  Authorization: `Bearer ${getAccessToken()}`,
})

interface CharacterData {
  id: number
  name: string
  tagline: string
  greeting: string
  scenario: string
  is_private: boolean
  tag_ids: number[]
  avatar_file_name: string
  profiles?: {
    username: string
  }
}

interface ChatCharacterJoin {
  characters: CharacterData
}

interface Tag {
  id: number
  name: string
}

interface FilteredCharacterData {
  name: string
  description: string
  scenario: string
  first_message: string
  creator: string
  tags: string[]
  profile_image: string
  is_public: boolean
}

async function fetchFromSupabase(chatID: string): Promise<ChatCharacterJoin[]> {
  const params = new URLSearchParams({
    select:
      'characters(name, tagline, greeting, scenario, tag_ids, avatar_file_name, is_private, profiles(username))',
    chat_id: `eq.${chatID}`,
  })

  const res = await fetch(`${SUPABASE_URL}/chats_characters?${params.toString()}`, {
    headers: buildHeaders(),
  })

  if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`)
  return res.json()
}

async function fetchTagsByIds(ids: number[]): Promise<Tag[]> {
  if (!ids.length) return []

  const query = new URLSearchParams({
    id: `in.(${ids.join(',')})`,
    select: 'id,name',
  })

  const res = await fetch(`${SUPABASE_URL}/tags?${query.toString()}`, {
    headers: buildHeaders(),
  })

  if (!res.ok) throw new Error(`Failed to fetch tags: ${res.status}`)
  return res.json()
}

async function filterCharacterData(data: ChatCharacterJoin[]): Promise<FilteredCharacterData> {
  const character = data[0].characters
  const baseImageUrl =
    'https://pjoabwtwjcpohcpuhijy.supabase.co/storage/v1/object/public/public_images/'
  const tagObjs = await fetchTagsByIds(character.tag_ids)

  return {
    name: character.name,
    description: character.tagline || '',
    scenario: character.scenario || '',
    first_message: character.greeting || '',
    creator: character.profiles?.username || 'unknown',
    tags: tagObjs.map((tag) => tag.name),
    profile_image: `${baseImageUrl}${character.avatar_file_name}`,
    is_public: !character.is_private,
  }
}

export async function AnimeGFExtract(
  trigger: boolean,
  showAlert: (message: string, mode: 'success' | 'error') => void
): Promise<void> {
  if (!trigger) return

  const currentUrl = window.location.href
  const url = new URL(currentUrl)
  const chatID = url.searchParams.get('chatID')
  if (!chatID) {
    showAlert('No chatID found in the URL', 'error')
    return
  }

  try {
    const data = await fetchFromSupabase(chatID)
    if (!data || data.length === 0) {
      showAlert('No character data found', 'error')
      return
    }

    const filteredData = await filterCharacterData(data)
    const save = new SaveCharacter()
    const response = await save.save(filteredData)

    if (response.success) {
      showAlert('Character data saved and downloaded!', 'success')
    } else {
      showAlert('Save failed unexpectedly.', 'error')
    }
  } catch (err) {
    showAlert(`Error: ${err instanceof Error ? err.message : String(err)}`, 'error')
  }
}
