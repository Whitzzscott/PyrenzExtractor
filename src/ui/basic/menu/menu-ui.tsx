import React, { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { IconButton, Paper, Typography, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ButtonMenu } from '~/ui'

interface MenuUIProps {
  onClose: () => void
}

export function MenuUI({ onClose }: MenuUIProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<boolean>(false)
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

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

    el.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, offset])

  return (
    <Paper
      ref={ref}
      elevation={6}
      sx={{
        position: 'fixed',
        top: '100px',
        left: '100px',
        zIndex: 9999,
        padding: 2,
        cursor: 'grab',
        width: 300,
        backgroundColor: '#121212',
        color: '#fff',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Pyrenz Menu</Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: '#fff' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <ButtonMenu />
    </Paper>
  )
}
