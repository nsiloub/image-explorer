import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./styles/variables.css";

import "./assets/fonts/SpaceGrotesk/SpaceGrotesk[wght].ttf";
import "./assets/fonts/CHASER/CHASER.ttf";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
