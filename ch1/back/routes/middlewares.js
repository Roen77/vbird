exports.isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
        // next()는 그냥 다음 미들웨어로넘어가는데 next(23)이렇게인자를넣으면 에러로넘어간다
    }
    return res.status(401).send("로그인이 필요합니다.")
};

exports.isNotLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        return next();
    }
    return res.status(401).send("로그인한 사람은 이용할 수 없습니다")
};

// module.exports={
//     isLoggedIn:()=>{},
//     isNotLoggedIn:()=>{}
// }
//이것도가능 모듈이 우선권이높아서 여거래쓰면 덮어씌어짐