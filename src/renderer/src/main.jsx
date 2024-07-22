import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Historico from './pages/Historico'
import Novo from './pages/Novo'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Historico />
        } />
        <Route path="/novo" element={
          <Novo />
        } />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
)
