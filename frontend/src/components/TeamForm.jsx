import { useState } from 'react';
import api from '../services/api';

export default function TeamForm({ onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post('/teams', { name, description });
      setName('');
      setDescription('');
      onCreated?.(); // refresh parent list
    } catch (err) {
      console.error(err);
      alert('Failed to create team');
    }
  }

  return (
    <form 
  onSubmit={submit} 
  className="flex flex-col items-center justify-center 
             shadow-lg p-8 sm:p-12 
             bg-white rounded-xl gap-5 
             max-w-md mx-auto mb-6"
>
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    Add Team
  </h2>

  <input
    placeholder="Team name"
    value={name}
    onChange={e => setName(e.target.value)}
    required
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <input
    placeholder="Description"
    value={description}
    onChange={e => setDescription(e.target.value)}
    className="w-full border border-gray-300 p-3 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
  />

  <button 
    type="submit" 
    className="w-full p-3 bg-indigo-600 rounded-lg 
               text-white font-semibold 
               hover:bg-indigo-700 active:bg-indigo-800 
               transition duration-200"
  >
    Add Team
  </button>
</form>
  );
}