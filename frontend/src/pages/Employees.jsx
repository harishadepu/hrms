import { useEffect, useState } from 'react';
import api from '../services/api';
import EmployeeForm from '../components/EmployeeForm';

export default function Employees() {
  const [rows, setRows] = useState([]);
  async function load() { const { data } = await api.get('/employees'); setRows(data); }
  useEffect(() => { load(); }, []);

  async function del(id) { await api.delete(`/employees/${id}`); load(); }

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Employees</h2>

  <EmployeeForm onCreated={load} />

  <table className="w-full border-collapse mt-6">
    <thead>
      <tr className="bg-gray-200 text-left">
        <th className="p-3 font-semibold text-gray-700">Name</th>
        <th className="p-3 font-semibold text-gray-700">Email</th>
        <th className="p-3 font-semibold text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody>
      {rows.map(r => (
        <tr 
          key={r.id} 
          className="border-b hover:bg-gray-100 transition duration-150"
        >
          <td className="p-3">{r.firstName} {r.lastName}</td>
          <td className="p-3">{r.email}</td>
          <td className="p-3">
            <button 
              onClick={() => del(r.id)} 
              className="px-4 py-2 bg-red-500 text-white rounded-lg 
                         hover:bg-red-600 active:bg-red-700 
                         transition duration-200"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}