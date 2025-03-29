import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL




interface AuthProps {
  onClose: () => void;
  toggleMode: () => void; // New prop to toggle to Signin
}

export function Signup({ onClose, toggleMode }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [loading ,setLoading] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    await axios.post(`${BACKEND_URL}/api/v1/signup` , {
      name : name,
      email : email,
      password : password,
    })
    toast.success("Signed Up Successfully")

    onClose()


  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-gray-800 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">×</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields... */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          <div className="text-center text-sm text-gray-400">
            <button type="button" onClick={toggleMode} className="text-blue-400 hover:text-blue-300">Already have an account? Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}







