const { Sequelize } = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      user_num: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      sns_id: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'kakao'
      },
      nickname: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      birth: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING(6),
        allowNull: true
      },
    }, {
      sequelize,
      timestamps: false,  //createAt, updateAt 추가
      underscored: false,  //snake case 옵션
      modelName: 'User',
      tableName: 'users',
      paranoid: false,  //deleteAt 추가
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.User.hasMany(db.Schedule, { foreignKey: 'user', sourceKey: 'user_num' });
  }
};