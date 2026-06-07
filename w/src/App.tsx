import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { TopNavbar } from '@/components/TopNavbar'
import { BottomNavbar } from '@/components/BottomNavbar'
import { LoginModal } from '@/components/LoginModal'
import { HomePage } from '@/pages/HomePage'
import { ForumPage } from '@/pages/ForumPage'
import { MessagePage } from '@/pages/MessagePage'
import { ContactsPage } from '@/pages/ContactsPage'
import { ProfilePage } from '@/pages/ProfilePage'

function App() {
  const { isLoggedIn, departments, initializeMockData } = useStore()
  const [activeTab, setActiveTab] = useState('home')
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!isLoggedIn || initialized) return

    if (departments.length === 0) {
      initializeMockData()
    }
    setInitialized(true)
  }, [isLoggedIn, departments.length, initializeMockData])

  if (!isLoggedIn) {
    return <LoginModal />
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'forum':
        return <ForumPage />
      case 'message':
        return <MessagePage />
      case 'contacts':
        return <ContactsPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopNavbar />
      <div className="pt-16">
        {renderPage()}
      </div>
      <BottomNavbar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
