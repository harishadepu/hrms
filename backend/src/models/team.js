import { DataTypes, Model } from 'sequelize';

export default class Team extends Model {
  static initModel(sequelize) {
    Team.init(
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
        name: {
          type: DataTypes.STRING(100), // limit length for efficiency
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT, // or STRING(500) if you want shorter
        },
      },
      {
        sequelize,
        modelName: 'Team',
        tableName: 'teams',
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ['orgId', 'name'],
          },
        ],
      }
    );
  }
}