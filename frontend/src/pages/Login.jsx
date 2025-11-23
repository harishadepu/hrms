import { useState } from 'react';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  async function submit(e) {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    window.location.assign('/');
  }
  return (
    <form 
  onSubmit={submit} 
  className="flex flex-col items-center justify-center 
             shadow-xl p-10 sm:p-16 
             bg-white rounded-xl gap-5 
             max-w-md mx-auto"
>
  <h2 className="text-3xl font-bold text-gray-800 mb-4">Login</h2>

  <input 
    placeholder="Email" 
    value={email} 
    onChange={e => setEmail(e.target.value)} 
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <input 
    placeholder="Password" 
    type="password" 
    value={password} 
    onChange={e => setPassword(e.target.value)} 
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <button 
    type="submit" 
    className="w-full p-3 bg-blue-600 rounded-lg 
               text-white font-semibold 
               hover:bg-blue-700 active:bg-blue-800 
               transition duration-200"
  >
    Login
  </button>
  <p className="text-gray-600 mt-4"> Don't have an account? 
    <a href="/register" className="text-blue-600 hover:underline ml-1">
      Register
    </a>
  </p>
</form>
  );
}