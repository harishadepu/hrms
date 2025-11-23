import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Organisation from '../models/organisation.js';
import User from '../models/user.js';
import Log from '../models/log.js';

export async function registerOrg(req, res) {
  const { name, owner } = req.body; // { email, password }
  if (!name || !owner?.email || !owner?.password) return res.status(400).json({ error: 'Invalid payload' });

  const org = await Organisation.create({ name });
  const passwordHash = await bcrypt.hash(owner.password, 10);
  const user = await User.create({ orgId: org.id, email: owner.email, passwordHash, role: 'owner' });

  await Log.create({ orgId: org.id, userId: user.id, action: 'org.register', entityType: 'organization', entityId: org.id, description: `Org created with owner ${user.id}` });

  res.status(201).json({ org, owner: { id: user.id, email: user.email } });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: 'Invalid credentials' });

  await user.update({ lastLoginAt: new Date() });
  const token = jwt.sign({ sub: user.id, orgId: user.orgId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  await Log.create({ orgId: user.orgId, userId: user.id, action: 'login', entityType: 'user', entityId: user.id, description: `User '${user.id}' logged in.` });

  res.json({ accessToken: token });
}

export async function logout(req, res) {
  await Log.create({ orgId: req.user.orgId, userId: req.user.id, action: 'logout', entityType: 'user', entityId: req.user.id, description: `User '${req.user.id}' logged out.` });
  res.json({ ok: true });
}