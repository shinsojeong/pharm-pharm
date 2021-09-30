const { Sequelize } = require('sequelize');

module.exports = class Schedule extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      sche_code: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true
      },
      medi_code: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      medi_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      medi_date1: {
        type: Sequelize.DATE,
        allowNull: false
      },
      medi_date2: {
        type: Sequelize.DATE,
        allowNull: false
      },
      medi_day: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      medi_time: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      medi_times: {
        type: Sequelize.TINYINT(2),
        allowNull: false
      },
      medi_num: {
        type: Sequelize.TINYINT(2),
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,  //createAt, updateAt 추가
      underscored: false,  //snake case 옵션
      modelName: 'Schedule',
      tableName: 'schedules',
      paranoid: false,  //deleteAt 추가
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.Schedule.belongsTo(db.User, { foreignKey: 'user', targetKey: 'user_num' });
  }
};