import { useEffect, useState } from 'react';
import api from '../services/api';
import TeamForm from '../components/TeamForm';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  async function loadTeams() {
    const { data } = await api.get('/teams');
    setTeams(data);
  }

  async function deleteTeam(id) {
    await api.delete(`/teams/${id}`);
    loadTeams();
  }

  async function updateTeam(id, updated) {
    await api.put(`/teams/${id}`, updated);
    setEditingTeam(null);
    loadTeams();
  }

  useEffect(() => { loadTeams(); }, []);

  return (
    <div className="p-8 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Teams</h2>

      <TeamForm onCreated={loadTeams} />

      <table className="w-full border-collapse mt-6">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{team.name}</td>
              <td className="p-3">{team.description}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingTeam(team)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingTeam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Team</h3>
            <input
              value={editingTeam.name}
              onChange={e => setEditingTeam({ ...editingTeam, name: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              value={editingTeam.description}
              onChange={e => setEditingTeam({ ...editingTeam, description: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTeam(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => updateTeam(editingTeam.id, editingTeam)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}