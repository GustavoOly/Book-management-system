import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Historico from './pages/Historico'
import Cadastro from './pages/Cadastro'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<Historico />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  </React.StrictMode>
)