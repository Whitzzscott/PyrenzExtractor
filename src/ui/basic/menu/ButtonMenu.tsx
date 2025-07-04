import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import { ChubAiExtract, CharacterAIExtract, AnimeGFExtract } from '~/system'
import { AlertMode } from '~/ui'

interface ButtonMenuProps {
  showAlert: (message: string, mode: AlertMode) => void
}

export function ButtonMenu({ showAlert }: ButtonMenuProps) {
  const [loadingCase, setLoadingCase] = useState<null | 'chub' | 'characterai' | 'animegf'>(null)

  const handleExtract = async (type: 'chub' | 'characterai' | 'animegf') => {
    setLoadingCase(type)

    try {
      switch (type) {
        case 'chub':
          await ChubAiExtract(true, showAlert)
          break
        case 'characterai':
          await CharacterAIExtract(true, showAlert)
          break
        case 'animegf':
          await AnimeGFExtract(true, showAlert)
          break
      }
    } catch (err) {
      showAlert('Extraction failed', 'error')
      console.error(err)
    } finally {
      setLoadingCase(null)
    }
  }

  return (
    <Box mt={2}>
      <Box display="flex" gap={1}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleExtract('chub')}
          disabled={loadingCase !== null}
          sx={{
            textTransform: 'none',
            padding: '5px 10px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {loadingCase === 'chub' ? 'Extracting...' : 'ChubAI Extract'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleExtract('characterai')}
          disabled={loadingCase !== null}
          sx={{
            textTransform: 'none',
            padding: '5px 10px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {loadingCase === 'characterai' ? 'Extracting...' : 'CharacterAI Extract'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleExtract('animegf')}
          disabled={loadingCase !== null}
          sx={{
            textTransform: 'none',
            padding: '5px 10px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {loadingCase === 'animegf' ? 'Extracting...' : 'AnimeGF Extract'}
        </Button>
      </Box>
    </Box>
  )
}
