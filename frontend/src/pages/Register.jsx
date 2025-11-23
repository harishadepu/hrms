import { useState } from 'react';
import api from '../services/api';

export default function RegisterOrg() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  async function submit(e) {
    e.preventDefault();
    await api.post('/auth/register-organization', { name, owner: { email, password } });
    alert('Organization registered. Please login.');
    window.location.assign('/login');
  }
  return (
    <form 
  onSubmit={submit} 
  className="flex flex-col items-center justify-center 
             shadow-xl p-10 sm:p-14 
             bg-white rounded-xl gap-5 
             max-w-md mx-auto"
>
  <h2 className="text-3xl font-bold text-gray-800 mb-4">
    Register Organization
  </h2>

  <input 
    placeholder="Org Name" 
    value={name} 
    onChange={e => setName(e.target.value)} 
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <input 
    placeholder="Owner Email" 
    value={email} 
    onChange={e => setEmail(e.target.value)} 
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <input 
    placeholder="Owner Password" 
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
    Register
  </button>
  <p className="text-gray-600 mt-4"> Already have an account? 
    <a href="/login" className="text-blue-600 hover:underline ml-1">
      Login
    </a>
  </p>
</form>
  );
}