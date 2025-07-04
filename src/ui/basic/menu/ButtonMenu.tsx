import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import { ChubAiExtract, CharacterAIExtract } from '~/system'
import { PyrenzAlert, AlertMode } from '~/ui'

export function ButtonMenu() {
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertMode, setAlertMode] = useState<AlertMode>('success')
  const [loading, setLoading] = useState(false)

  const showAlert = (message: string, mode: AlertMode) => {
    setAlertMessage(message)
    setAlertMode(mode)
    setAlertOpen(true)
  }

  const handleChubExtract = async () => {
    setLoading(true)
    await ChubAiExtract(true, showAlert)
    setLoading(false)
  }

  const handleCharacterAIExtract = async () => {
    setLoading(true)
    await CharacterAIExtract(true, showAlert)
    setLoading(false)
  }

  const buttons = [
    {
      label: loading ? 'Extracting...' : 'ChubAI Extract',
      onClick: handleChubExtract,
      disabled: loading,
    },
    {
      label: loading ? 'Extracting...' : 'CharacterAI Extract',
      onClick: handleCharacterAIExtract,
      disabled: loading,
    },
  ]

  return (
    <Box mt={2}>
      <Box display="flex" gap={1}>
        {buttons.map((btn, i) => (
          <Button
            key={i}
            variant="contained"
            color="primary"
            size="small"
            disabled={btn.disabled}
            onClick={btn.onClick}
            sx={{
              textTransform: 'none',
              padding: '5px 10px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            {btn.label}
          </Button>
        ))}
      </Box>

      <PyrenzAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
        mode={alertMode}
      />
    </Box>
  )
}
