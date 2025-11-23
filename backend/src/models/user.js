import { DataTypes, Model } from 'sequelize';

export default class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        orgId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255), // specify length for MySQL
          allowNull: false,
          unique: true,
        },
        passwordHash: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('owner', 'admin', 'user'),
          allowNull: false,
          defaultValue: 'admin',
        },
        lastLoginAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
  }
}