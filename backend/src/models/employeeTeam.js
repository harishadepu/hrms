import { DataTypes, Model } from 'sequelize';

export default class EmployeeTeam extends Model {
  static initModel(sequelize) {
    EmployeeTeam.init(
      {
        employeeId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'employees',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        teamId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'teams',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        orgId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'organisations',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        assignedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'EmployeeTeam',
        tableName: 'employee_team',
        timestamps: false,
      }
    );
  }
}