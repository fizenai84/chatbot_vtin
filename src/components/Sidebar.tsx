import React from 'react'
import { MessageSquare, Database, Settings, HelpCircle } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'chatbot', label: 'Chatbot', icon: <MessageSquare size={20} /> },
    { id: 'knowledge', label: 'Knowledge Base', icon: <Database size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'faq', label: 'FAQ Management', icon: <HelpCircle size={20} /> },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <img src="/vietinbank-logo.svg" alt="VietinBank" className="h-8 mr-2" onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/32x32?text=VB'
        }} />
        <span className="text-lg font-semibold text-blue-800">VietinBank</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="px-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3 text-blue-600">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
