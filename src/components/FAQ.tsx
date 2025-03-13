import React, { useState } from 'react'
import { Plus, Check, AlertCircle, Search, Edit, Trash2 } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
  quality: 'good' | 'poor'
  status: 'verified' | 'unverified'
}

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: 'How do I open a new savings account?',
      answer: 'To open a new savings account, you can visit any of our branches with your ID and proof of address. Alternatively, you can apply online through our website or mobile app.',
      quality: 'good',
      status: 'verified'
    },
    {
      id: 2,
      question: 'What are the current interest rates for fixed deposits?',
      answer: 'Our current interest rates for fixed deposits range from 3.5% to 6.5% depending on the term length. For the most up-to-date rates, please check our website or contact customer service.',
      quality: 'good',
      status: 'verified'
    },
    {
      id: 3,
      question: 'How do I reset my online banking password?',
      answer: 'You can reset your online banking password by clicking on the "Forgot Password" link on the login page. You will receive a verification code via SMS or email to complete the reset process.',
      quality: 'poor',
      status: 'unverified'
    }
  ])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null)
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const handleAddFaq = () => {
    if (newQuestion.trim() === '' || newAnswer.trim() === '') return
    
    const newFaq: FAQItem = {
      id: Date.now(),
      question: newQuestion,
      answer: newAnswer,
      quality: 'poor',
      status: 'unverified'
    }
    
    setFaqs([...faqs, newFaq])
    setNewQuestion('')
    setNewAnswer('')
    setShowAddModal(false)
  }
  
  const handleUpdateFaq = () => {
    if (!editingFaq || editingFaq.question.trim() === '' || editingFaq.answer.trim() === '') return
    
    setFaqs(faqs.map(faq => 
      faq.id === editingFaq.id ? editingFaq : faq
    ))
    
    setEditingFaq(null)
  }
  
  const handleDeleteFaq = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id))
  }
  
  const toggleQuality = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, quality: faq.quality === 'good' ? 'poor' : 'good' } : faq
    ))
  }
  
  const toggleStatus = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, status: faq.status === 'verified' ? 'unverified' : 'verified' } : faq
    ))
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">FAQ Management</h1>
        <p className="text-gray-600">Create and manage frequently asked questions and their answers</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md"
        >
          <Plus size={16} className="mr-1" />
          Add New FAQ
        </button>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Answer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quality
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFaqs.map(faq => (
              <tr key={faq.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                    {faq.question}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-xs truncate">
                    {faq.answer}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => toggleQuality(faq.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      faq.quality === 'good' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {faq.quality === 'good' ? (
                      <>
                        <Check size={12} className="mr-1" />
                        Good
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} className="mr-1" />
                        Poor
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => toggleStatus(faq.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      faq.status === 'verified' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {faq.status === 'verified' ? 'Verified' : 'Unverified'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingFaq(faq)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter question"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter answer"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFaq}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add FAQ
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit FAQ</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={editingFaq.question}
                onChange={(e) => setEditingFaq({...editingFaq, question: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter question"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                value={editingFaq.answer}
                onChange={(e) => setEditingFaq({...editingFaq, answer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter answer"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingFaq(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateFaq}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FAQ
