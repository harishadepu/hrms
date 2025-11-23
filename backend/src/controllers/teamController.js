import Team from '../models/team.js';
import Employee from '../models/employee.js';

export async function listTeams(req, res) {
  const teams = await Team.findAll({ where: { orgId: req.user.orgId } });
  res.json(teams);
}

export async function createTeam(req, res) {
  const { name, description } = req.body;
  const team = await Team.create({ orgId: req.user.orgId, name, description });
  res.status(201).json(team);
}

export async function updateTeam(req, res) {
  const { id } = req.params;
  const team = await Team.findOne({ where: { id, orgId: req.user.orgId } });
  if (!team) return res.status(404).json({ error: 'Not found' });
  await team.update(req.body);
  res.json(team);
}

export async function deleteTeam(req, res) {
  const { id } = req.params;
  const team = await Team.findOne({ where: { id, orgId: req.user.orgId } });
  if (!team) return res.status(404).json({ error: 'Not found' });
  await team.destroy();
  res.json({ ok: true });
}

export async function teamEmployees(req, res) {
  const { id } = req.params;
  const team = await Team.findOne({ where: { id, orgId: req.user.orgId } });
  if (!team) return res.status(404).json({ error: 'Not found' });
  const employees = await team.getEmployees({ where: { orgId: req.user.orgId } });
  res.json(employees);
}