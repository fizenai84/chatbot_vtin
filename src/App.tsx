import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatInterface from './components/ChatInterface'
import KnowledgeManagement from './components/KnowledgeManagement'
import Settings from './components/Settings'
import FAQ from './components/FAQ'
import Header from './components/Header'

function App() {
  const [activeTab, setActiveTab] = useState('chatbot')

  const renderContent = () => {
    switch (activeTab) {
      case 'chatbot':
        return <ChatInterface />
      case 'knowledge':
        return <KnowledgeManagement />
      case 'settings':
        return <Settings />
      case 'faq':
        return <FAQ />
      default:
        return <ChatInterface />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
