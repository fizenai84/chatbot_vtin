import React, { useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'

interface ModelOption {
  id: string
  name: string
  description: string
}

const Settings: React.FC = () => {
  const llmOptions: ModelOption[] = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most powerful model for complex tasks' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    { id: 'claude-2', name: 'Claude 2', description: 'Anthropic\'s advanced reasoning model' },
    { id: 'llama-2', name: 'Llama 2', description: 'Meta\'s open source large language model' }
  ]
  
  const embeddingOptions: ModelOption[] = [
    { id: 'text-embedding-ada-002', name: 'OpenAI Ada 002', description: 'Efficient text embeddings from OpenAI' },
    { id: 'e5-large-v2', name: 'E5 Large v2', description: 'Microsoft\'s embedding model' },
    { id: 'sentence-transformers', name: 'Sentence Transformers', description: 'Open source embedding model' }
  ]
  
  const [selectedLLM, setSelectedLLM] = useState('gpt-4')
  const [selectedEmbedding, setSelectedEmbedding] = useState('text-embedding-ada-002')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [apiKey, setApiKey] = useState('')
  
  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-gray-600">Configure your AI models and system parameters</p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">LLM Model Settings</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language Model
          </label>
          <select
            value={selectedLLM}
            onChange={(e) => setSelectedLLM(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {llmOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name} - {option.description}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature: {temperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>More Deterministic</span>
              <span>More Creative</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Tokens: {maxTokens}
            </label>
            <input
              type="range"
              min="256"
              max="4096"
              step="256"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Shorter</span>
              <span>Longer</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Embedding Model Settings</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Embedding Model
          </label>
          <select
            value={selectedEmbedding}
            onChange={(e) => setSelectedEmbedding(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {embeddingOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name} - {option.description}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">API Configuration</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your API key"
          />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <RefreshCw size={16} className="mr-1" />
            Reset to Defaults
          </button>
          
          <button 
            onClick={handleSaveSettings}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Save size={16} className="mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
