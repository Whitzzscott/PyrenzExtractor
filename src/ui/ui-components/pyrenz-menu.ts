import { css } from '@emotion/css'

export const pyrenzMenu = () => css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 220px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  z-index: 9999;
  cursor: grab;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease-in-out;
  color: white;
  font-family: Inter, sans-serif;
  padding: 1rem;

  h3 {
    margin: 0;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    opacity: 0.8;
  }
`
