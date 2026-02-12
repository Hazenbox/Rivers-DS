import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import ComponentPage from './pages/ComponentPage'
import TokensPage from './pages/TokensPage'
import IconsPage from './pages/IconsPage'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as 'light' | 'dark') || 'light'
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={`main-content ${sidebarOpen ? '' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<ComponentPage />} />
            <Route path="/components/:name" element={<ComponentPage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/tokens/:category" element={<TokensPage />} />
            <Route path="/icons" element={<IconsPage />} />
            <Route path="/icons/:category" element={<IconsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
