import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import NavBar from './components/NavBar'
import HistoricTable from './components/HistoricTable'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <NavBar />
    <HistoricTable />
  </React.StrictMode>
)
