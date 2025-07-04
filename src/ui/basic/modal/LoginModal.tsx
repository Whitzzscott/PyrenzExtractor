import React, { useState } from 'react'
import { supabase } from '~/configs/Supabase'
import { PyrenzModal, PyrenzModalContent } from '~/ui'
import { Button, TextField, Typography, Stack } from '@mui/material'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const saveSessionToChrome = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error('Error getting session:', error)
      return
    }

    if (session) {
      chrome.storage.local.set({ pyrenz_session: session }, () => {
        console.log('✅ Session saved to chrome.storage.local')
      })
    }
  }

  const handleDiscordLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
    if (error) {
      console.error('Error logging in with Discord:', error)
    } else {
      saveSessionToChrome()
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) {
      console.error('Error logging in with Google:', error)
    } else {
      saveSessionToChrome()
    }
  }

  const handleEmailLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error logging in with email:', error)
    } else {
      saveSessionToChrome()
    }
  }

  return (
    <PyrenzModal open={open} onClose={onClose}>
      <PyrenzModalContent>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center" fontWeight={600}>
            Get Started with Pyrenz
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleDiscordLogin}
            sx={{
              color: 'white',
              borderColor: '#5865F2',
              backgroundColor: '#5865F2',
              '&:hover': {
                backgroundColor: '#4752c4',
                borderColor: '#4752c4',
              },
            }}
          >
            Get started with Discord
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{
              color: 'white',
              borderColor: '#555',
              '&:hover': {
                borderColor: '#888',
                backgroundColor: 'transparent',
              },
            }}
          >
            Get started with Google
          </Button>

          <Typography variant="body2" textAlign="center" color="gray">
            or get started with email
          </Typography>

          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />

          <TextField
            fullWidth
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleEmailLogin}
            sx={{
              color: 'white',
              backgroundColor: '#5865F2',
              '&:hover': {
                backgroundColor: '#4752c4',
              },
            }}
          >
            Get Started
          </Button>
        </Stack>
      </PyrenzModalContent>
    </PyrenzModal>
  )
}
