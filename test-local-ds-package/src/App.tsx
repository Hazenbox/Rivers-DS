import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Home from './pages/Home'
import ComponentPage from './pages/ComponentPage'
import TokensPage from './pages/TokensPage'
import IconsPage from './pages/IconsPage'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as 'light' | 'dark') || 'light'
  })
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.style.margin = '0'
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: '32px',
          marginLeft: sidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease'
        }}>
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
