import React, { useState } from 'react'
import { Plus, Upload, FileText, Check, AlertCircle } from 'lucide-react'

interface KnowledgeBase {
  id: number
  name: string
  description: string
  createdAt: string
  documentsCount: number
}

interface Document {
  id: number
  name: string
  knowledgeBaseId: number
  uploadDate: string
  status: 'uploaded' | 'digitized'
  size: string
}

const KnowledgeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bases' | 'documents'>('bases')
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    {
      id: 1,
      name: 'Banking Products',
      description: 'Information about our banking products and services',
      createdAt: '2023-10-15',
      documentsCount: 12
    },
    {
      id: 2,
      name: 'Customer Support',
      description: 'Common customer support information and procedures',
      createdAt: '2023-11-02',
      documentsCount: 8
    }
  ])
  
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Savings Account Terms.pdf',
      knowledgeBaseId: 1,
      uploadDate: '2023-10-15',
      status: 'digitized',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Credit Card Policy.docx',
      knowledgeBaseId: 1,
      uploadDate: '2023-10-16',
      status: 'uploaded',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Customer FAQ.pdf',
      knowledgeBaseId: 2,
      uploadDate: '2023-11-02',
      status: 'digitized',
      size: '3.2 MB'
    }
  ])
  
  const [showNewKnowledgeModal, setShowNewKnowledgeModal] = useState(false)
  const [newKnowledgeName, setNewKnowledgeName] = useState('')
  const [newKnowledgeDescription, setNewKnowledgeDescription] = useState('')
  
  const handleCreateKnowledge = () => {
    if (newKnowledgeName.trim() === '') return
    
    const newKnowledge: KnowledgeBase = {
      id: Date.now(),
      name: newKnowledgeName,
      description: newKnowledgeDescription,
      createdAt: new Date().toISOString().split('T')[0],
      documentsCount: 0
    }
    
    setKnowledgeBases([...knowledgeBases, newKnowledge])
    setNewKnowledgeName('')
    setNewKnowledgeDescription('')
    setShowNewKnowledgeModal(false)
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Knowledge Management</h1>
        <p className="text-gray-600">Manage and organize your knowledge bases with easy-to-use tools</p>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'bases' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('bases')}
          >
            Knowledge Bases
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'documents' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
        </div>
      </div>
      
      {activeTab === 'bases' ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Your Knowledge Bases</h2>
            <button 
              onClick={() => setShowNewKnowledgeModal(true)}
              className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md"
            >
              <Plus size={16} className="mr-1" />
              Create Knowledge Base
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {knowledgeBases.map(kb => (
              <div key={kb.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-lg mb-1">{kb.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{kb.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Created: {kb.createdAt}</span>
                  <span>{kb.documentsCount} documents</span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Manage Documents
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Documents</h2>
            <button className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md">
              <Upload size={16} className="mr-1" />
              Upload Document
            </button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Knowledge Base
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {documents.map(doc => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {knowledgeBases.find(kb => kb.id === doc.knowledgeBaseId)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'digitized' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status === 'digitized' ? (
                          <Check size={12} className="mr-1" />
                        ) : (
                          <AlertCircle size={12} className="mr-1" />
                        )}
                        {doc.status === 'digitized' ? 'Digitized' : 'Uploaded'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* New Knowledge Base Modal */}
      {showNewKnowledgeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Knowledge Base</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newKnowledgeName}
                onChange={(e) => setNewKnowledgeName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter knowledge base name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newKnowledgeDescription}
                onChange={(e) => setNewKnowledgeDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter description"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewKnowledgeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKnowledge}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KnowledgeManagement
