const passport= require("passport");
const local=require('./local')

module.exports=()=>{
    passport.serializeUser((user,done)=>{
        return done(null,user.id)
    });
    passport.deserializeUser(()=>{
        
    });
    local();

}