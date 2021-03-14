const passport= require("passport");
const db = require("../models");
const local=require('./local')

module.exports=()=>{
    passport.serializeUser((user,done)=>{
        return done(null,user.id)
    });
    passport.deserializeUser(async (id,done)=>{
        try {
            const user=await db.User.findOne({ where : {id},attributes:['id','nickname'], include:[{
                model:db.Post,
                attributes:['id']
            },{
                model:db.User,
                as:'Followings',
                attributes:['id'],
            },{
                model:db.User,
                as:'Followers',
                attributes:['id']
            }]})
            return done(null,user) //req.user에넣어준다 req.isAuthenticaated() ==true 로 만들어준다 한번로그인하게되면 이것 모든요청에 계속 호출한다
            //나중에는 그래서이걸 캐싱?해준다
        } catch (error) {
            console.error(error)
            return done(error)
        }
    });
    local();

}