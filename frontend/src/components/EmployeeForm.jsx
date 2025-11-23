import { useState } from 'react';
import api from '../services/api';

export default function EmployeeForm({ onCreated }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  async function submit(e) {
    e.preventDefault();
    await api.post('/employees', { firstName, lastName, email });
    setFirstName(''); setLastName(''); setEmail('');
    onCreated?.();
  }

  return (
    <form 
  onSubmit={submit} 
  className="flex flex-col items-center justify-center 
             shadow-lg p-8 sm:p-12 
             bg-white rounded-xl gap-5 
             max-w-md mx-auto"
>
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Add Employee
  </h2>

  <input 
    placeholder="First name" 
    required
    value={firstName} 
    onChange={e => setFirstName(e.target.value)} 
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <input 
    placeholder="Last name" 
    value={lastName} 
    required
    onChange={e => setLastName(e.target.value)} 
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <input 
    placeholder="Email" 
    value={email} 
    required
    onChange={e => setEmail(e.target.value)} 
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <button 
    type="submit" 
    className="w-full p-3 bg-green-600 rounded-lg 
               text-white font-semibold 
               hover:bg-green-700 active:bg-green-800 
               transition duration-200"
  >
    Add Employee
  </button>
</form>
  );
}