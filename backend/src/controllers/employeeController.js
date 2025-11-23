import Employee from '../models/employee.js';
import Team from '../models/team.js';
import EmployeeTeam from '../models/employeeTeam.js';
import Log from '../models/log.js';

export async function listEmployees(req, res) {
  const employees = await Employee.findAll({ where: { orgId: req.user.orgId } });
  res.json(employees);
}

export async function createEmployee(req, res) {
  const { firstName, lastName, email, phone, title } = req.body;
  const employee = await Employee.create({ orgId: req.user.orgId, firstName, lastName, email, phone, title });
  await Log.create({ orgId: req.user.orgId, userId: req.user.id, action: 'employee.create', entityType: 'employee', entityId: employee.id, description: `User '${req.user.id}' added employee '${employee.id}'.`, metadata: { payload: req.body } });
  res.status(201).json(employee);
}

export async function updateEmployee(req, res) {
  const { id } = req.params;
  const emp = await Employee.findOne({ where: { id, orgId: req.user.orgId } });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  await emp.update(req.body);
  await Log.create({ orgId: req.user.orgId, userId: req.user.id, action: 'employee.update', entityType: 'employee', entityId: id, description: `User '${req.user.id}' updated employee '${id}'.`, metadata: { payload: req.body } });
  res.json(emp);
}

export async function deleteEmployee(req, res) {
  const { id } = req.params;
  const emp = await Employee.findOne({ where: { id, orgId: req.user.orgId } });
  if (!emp) return res.status(404).json({ error: 'Not found' });
  await emp.destroy();
  await Log.create({ orgId: req.user.orgId, userId: req.user.id, action: 'employee.delete', entityType: 'employee', entityId: id, description: `User '${req.user.id}' deleted employee '${id}'.` });
  res.json({ ok: true });
}

export async function assignEmployee(req, res) {
  const { teamId } = req.params;
  const { employeeId } = req.body;
  const team = await Team.findOne({ where: { id: teamId, orgId: req.user.orgId } });
  const emp = await Employee.findOne({ where: { id: employeeId, orgId: req.user.orgId } });
  if (!team || !emp) return res.status(404).json({ error: 'Team/Employee not found' });
  await EmployeeTeam.upsert({ employeeId, teamId, orgId: req.user.orgId });
  await Log.create({ orgId: req.user.orgId, userId: req.user.id, action: 'team.assign', entityType: 'team', entityId: teamId, description: `User '${req.user.id}' assigned employee '${employeeId}' to team '${teamId}'.` });
  res.status(201).json({ ok: true });
}

export async function unassignEmployee(req, res) {
  const { teamId, employeeId } = req.params;
  await EmployeeTeam.destroy({ where: { employeeId, teamId, orgId: req.user.orgId } });
  await Log.create({ orgId: req.user.orgId, userId: req.user.id, action: 'team.unassign', entityType: 'team', entityId: teamId, description: `User '${req.user.id}' unassigned employee '${employeeId}' from team '${teamId}'.` });
  res.json({ ok: true });
}