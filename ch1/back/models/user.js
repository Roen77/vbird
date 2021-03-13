// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

module.exports=(sequelize,DataTypes) =>{
    const User=sequelize.define('User',{
        email:{
            type:DataTypes.STRING(30),
            allowNull:false, //필수
            unique:true, //중복금지
        },
        nickname:{
            type:DataTypes.STRING(20),
            allowNull:false //필수

        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false //필수

        },
    },{
        charset:"utf8",
        collate:"utf8_general_ci" //한글지원됨
    });
    User.associate=(db)=>{

    };

    return User;
}