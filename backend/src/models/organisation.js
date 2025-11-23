import { DataTypes, Model } from 'sequelize';

export default class Organisation extends Model {
  static initModel(sequelize) {
    Organisation.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100), // shorter length for efficiency
          allowNull: false,
          unique: true,                // optional: enforce unique org names
        },
      },
      {
        sequelize,
        modelName: 'Organisation',
        tableName: 'organisations',
        timestamps: true,
      }
    );
  }
}