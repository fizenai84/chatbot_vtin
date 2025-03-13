import React from 'react'
import { Bell, User } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-end">
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={20} />
        </button>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
            <User size={16} />
          </div>
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>
    </header>
  )
}

export default Header
