import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { supabase } from '~/configs/Supabase'
import { Checker } from '~/system'
import { MenuUI, LoginModal } from '~/ui'
import { pyrenzTheme } from '~/ui/theme'

const allowedDomains = ['chub.ai', 'character.ai']
const checker = new Checker(allowedDomains)

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return !!session
}

function mountToBody(component: React.ReactElement) {
  const container = document.createElement('div')
  container.id = '__pyrenz-overlay-root'
  const mountEl = document.createElement('div')
  container.appendChild(mountEl)
  document.body.appendChild(container)

  const root = createRoot(mountEl)
  root.render(
    <StrictMode>
      <ThemeProvider theme={pyrenzTheme}>
        <CssBaseline />
        {component}
      </ThemeProvider>
    </StrictMode>
  )

  return () => {
    root.unmount()
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }
}

if (checker.isDomainAllowed()) {
  checkUser().then((isLoggedIn) => {
    if (isLoggedIn) {
      const handleClose = mountToBody(<MenuUI onClose={() => handleClose()} />)
      console.log('Content script loaded successfully!')
    } else {
      const handleClose = mountToBody(<LoginModal open={true} onClose={() => handleClose()} />)
      console.log('User not logged in, showing login modal.')
    }
  })
} else {
  console.log('Domain not allowed. Extension not rendered.')
}
