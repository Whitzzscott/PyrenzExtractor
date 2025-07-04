import React, { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { Paper, Typography, Box } from '@mui/material'
import { ButtonMenu, PyrenzAlert } from '~/ui'
import { AlertMode } from '~/ui'

interface MenuUIProps {
  onClose: () => void
}

export function MenuUI({ onClose }: MenuUIProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const [alertMsg, setAlertMsg] = useState('')
  const [alertMode, setAlertMode] = useState<AlertMode>('success')
  const [showAlert, setShowAlert] = useState(false)
  const [menuVisible, setMenuVisible] = useState(true)

  const triggerAlert = (message: string, mode: AlertMode) => {
    setAlertMsg(message)
    setAlertMode(mode)
    setShowAlert(true)
  }

  const hideMenu = () => {
    setMenuVisible(false)
    onClose()
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseDown = (e: MouseEvent) => {
      setDragging(true)
      setOffset({ x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop })
      el.style.cursor = 'grabbing'
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
      if (!dragging) return
      el.style.left = `${e.clientX - offset.x}px`
      el.style.top = `${e.clientY - offset.y}px`
      el.style.transform = 'none'
    }, 16)

    const handleMouseUp = () => {
      setDragging(false)
      if (el) el.style.cursor = 'grab'
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        hideMenu()
      }
    }

    el.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dragging, offset])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { innerWidth, innerHeight } = window
    const { offsetWidth, offsetHeight } = el
    el.style.left = `${(innerWidth - offsetWidth) / 2}px`
    el.style.top = `${(innerHeight - offsetHeight) / 2}px`
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '5') {
        setMenuVisible(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Box>
      {menuVisible && (
        <Paper
          ref={ref}
          elevation={24}
          sx={{
            position: 'fixed',
            zIndex: 9999,
            padding: 2,
            width: 320,
            cursor: 'grab',
            backgroundColor: 'rgba(18, 18, 18, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6" fontWeight={500}>
              Pyrenz Menu
            </Typography>
          </Box>
          <ButtonMenu showAlert={triggerAlert} />
        </Paper>
      )}

      <PyrenzAlert
        open={showAlert}
        message={alertMsg}
        mode={alertMode}
        onClose={() => setShowAlert(false)}
      />
    </Box>
  )
}
