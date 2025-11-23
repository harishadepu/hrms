import { DataTypes, Model } from 'sequelize';

export default class AuditLog extends Model {
  static initModel(sequelize) {
    AuditLog.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
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
        userId: {
          type: DataTypes.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },
        action: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        entityType: {
          type: DataTypes.STRING(255),
        },
        entityId: {
          type: DataTypes.UUID,
        },
        description: {
          type: DataTypes.TEXT,
        },
        metadata: {
          type: DataTypes.JSON, // ✅ MySQL-compatible
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'AuditLog',
        tableName: 'audit_logs',
        timestamps: false,
      }
    );
  }
}