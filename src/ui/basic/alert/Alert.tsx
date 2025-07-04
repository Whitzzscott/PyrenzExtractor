import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle, IconButton } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CloseIcon from '@mui/icons-material/Close'
import { AnimatePresence, motion } from 'framer-motion'

export type AlertMode = 'Success' | 'success' | 'Error' | 'error' | 'Alert' | 'alert'

export type PyrenzAlertProps = {
  message: string
  mode: AlertMode
  open: boolean
  onClose: () => void
}

export const PyrenzAlert: React.FC<PyrenzAlertProps> = ({ message, mode, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 1000)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.y > 100) onClose()
          }}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999,
            cursor: 'grab',
          }}
          role="alert"
          aria-live="assertive"
        >
          <Alert
            severity={mode.toLowerCase() === 'success' ? 'success' : 'error'}
            icon={
              mode.toLowerCase() === 'success' ? (
                <CheckCircleOutlineIcon style={{ color: 'green' }} />
              ) : (
                <ErrorOutlineIcon style={{ color: 'red' }} />
              )
            }
            action={
              <IconButton aria-label="Close alert" color="inherit" size="small" onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            <AlertTitle>{mode.charAt(0).toUpperCase() + mode.slice(1)}</AlertTitle>
            {message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
