import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatWidget from './App.tsx'
import './index.css'

const el = document.getElementById('chat-widget-embed');
<ChatWidget providerKey={el?.getAttribute('data-provider')} />
ReactDOM.createRoot(el as HTMLElement).render(
  <React.StrictMode>
    <ChatWidget providerKey={el?.getAttribute('data-provider')} />
  </React.StrictMode>,
)
