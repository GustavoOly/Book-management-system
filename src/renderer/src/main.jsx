import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Historico from './pages/Historico'
import Cadastro from './pages/Cadastro'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index element={<Historico />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
