import { DataTypes, Model } from 'sequelize';

export default class Employee extends Model {
  static initModel(sequelize) {
    Employee.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        orgId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'organisations', // enforce FK in MySQL
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        firstName: {
          type: DataTypes.STRING(100), // shorter length for efficiency
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          unique: true,
        },
        phone: {
          type: DataTypes.STRING(20), // constrain length for phone numbers
        },
        title: {
          type: DataTypes.STRING(100),
        },
        status: {
          type: DataTypes.ENUM('active', 'inactive'),
          defaultValue: 'active',
        },
      },
      {
        sequelize,
        modelName: 'Employee',
        tableName: 'employees',
        timestamps: true,
      }
    );
  }
}