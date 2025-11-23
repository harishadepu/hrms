import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Option 1: Using individual env vars
export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,   // database name
  process.env.MYSQL_USER,       // username
  process.env.MYSQL_PASSWORD,   // password
  {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

// Option 2: If you want to keep DATABASE_URL style
// export const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'mysql',
//   logging: false
// });

// Import models and setup associations
import Organisation from './models/organisation.js';
import User from './models/user.js';
import Employee from './models/employee.js';
import Team from './models/team.js';
import EmployeeTeam from './models/employeeTeam.js';
import Log from './models/log.js';

Organisation.initModel(sequelize);
User.initModel(sequelize);
Employee.initModel(sequelize);
Team.initModel(sequelize);
EmployeeTeam.initModel(sequelize);
Log.initModel(sequelize);

// Associations
User.belongsTo(Organisation, { foreignKey: 'orgId' });
Organisation.hasMany(User, { foreignKey: 'orgId' });

Employee.belongsTo(Organisation, { foreignKey: 'orgId' });
Organisation.hasMany(Employee, { foreignKey: 'orgId' });

Team.belongsTo(Organisation, { foreignKey: 'orgId' });
Organisation.hasMany(Team, { foreignKey: 'orgId' });

Employee.belongsToMany(Team, { through: EmployeeTeam, foreignKey: 'employeeId' });
Team.belongsToMany(Employee, { through: EmployeeTeam, foreignKey: 'teamId' });

Log.belongsTo(Organisation, { foreignKey: 'orgId' });
Log.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;