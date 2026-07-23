import { useState } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SVGBackground } from './svg-background';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    unaNo: '',
  });
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try{
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, formData);
    localStorage.setItem('token', response.data.token);
    sessionStorage.setItem('user', JSON.stringify({name: response.data.name, role: response.data.role}));
    if (response.data.role === 'ADMIN') {
      navigate('/admin');
    }
    navigate('/dashboard');
    setTimeout(() => setIsLoading(false), 1000)
    }catch(err){
      setIsLoading(false)
      alert("Login failed");
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* SVG Background */}
      <SVGBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg relative z-10"
      >
        <div className="text-center mb-8">
          <img
            src="/choicelogo.png"
            alt="Choice Enterprises Logo"
            width={180}
            height={72}
            className="mx-auto"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="una" className="block text-sm font-medium text-gray-700 mb-1">
              UNA Number
            </label>
            <div className="relative">
              <input
                id="una"
                name="una"
                type="text"
                required
                placeholder="Enter your UNA Number"
                className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                onChange={(e) => setFormData({ ...formData, unaNo: e.target.value })}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

