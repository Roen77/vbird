// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: {
        type: DataTypes.STRING(40), // 40자 이내
        allowNull: false, // 필수
        unique: true, // 중복금지
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장돼요
    });
  
    User.associate = (db) => {
        db.User.hasMany(db.Post); //1대다관계
        db.User.hasMany(db.Comment);
    };
  
    return User;
  };
//   시퀄라이즈에서 creatat updateat이자동으로 생긴다 아이디도추가됨