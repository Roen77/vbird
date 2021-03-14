const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const {isNotLoggedIn,isLoggedIn} =require('./middlewares')

const router = express.Router();



router.get('/', isLoggedIn, async (req, res, next) => {
    const user = req.user;
    res.json(user);
  });

router.post('/',isNotLoggedIn,async (req,res,next)=>{
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (exUser) { // 이미 회원가입되어있으면
          return res.status(403).json({
            errorCode: 1,
            message: '이미 회원가입되어있습니다.',
          });
        }
      await db.User.create({
          email: req.body.email,
          password: hash,
          nickname: req.body.nickname,
        }); // HTTP STATUS CODE
        // return res.status(201).json(newUser)
        passport.authenticate('local',(err,user,info)=>{
            if(err){
                console.error(err);
                return next(err);
            }
            if(info){
                return res.status(401).send(info.reason)
            }
            return req.login(user,async (err)=>{ //세션에다 사용자 정보 저장(어떻게??시리얼라이즈유저)
                if(err){
                    console.error(err);
                    return next(err)
                }
                return res.json(user);
            })
        })(req,res,next);
        // 회원가입후 로그인하려고
      }
      catch(err){
        console.log(err);
        return next(err);

      }
    // try {
    //     const hash=await bcrypt.hash(req.body.password,12)
    //     const exUser=db.User.findOne({
    //         where:{
    //             email:req.body.email
    //         }
    //     })
    //     if(exUser){
    //         //이미 회원가입되어있다면
    //         return res.status(403).json({
    //             errorCode:1,//errorCode는마음대로
    //             message:'이미 회원가입되어있습니다.',
    //         });
    //     }
    // //  const newUser= await db.User.create({
    // //         where:{
    // //             email:req.body.email,
    // //             password:hash,
    // //             nickname:req.body.nickname
    // //         }
    // //     });
    //  const newUser=  await db.User.create({
    //         email: req.body.email,
    //         nickname: req.body.nickname,
    //         password: hash,
    //   }); // HTTP STATUS CODE
    //     return res.status(201).json(newUser)
    // } catch (error) {
    //     console.log(error)
    //     // 여기서이프로 오류 조건문 if(){}
    //    return next(error)
    // //    return res.status 
    // }
})

router.use('/login',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason)
        }
        return req.login(user,async (err)=>{ //세션에다 사용자 정보 저장(어떻게??시리얼라이즈유저)
            if(err){
                console.error(err);
                return next(err)
            }
            return res.json(user);
        })
    })(req,res,next);
});

// router.post('/logout',isLoggedIn,(req,res)=>{ //실제주소는 /user/logout
//     if(req.isAuthenticated()){
//         req.logout(); //이건필수
//         req.session.destroy();
//         //세션없에는거 세션없애는건선택사항이다
//         return res.status(200).send('로그아웃 되었습니다.')
//     }
// })

router.post('/logout', isLoggedIn, (req, res) => { // 실제 주소는 /user/logout
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy();  // 선택사항
      return res.status(200).send('로그아웃 되었습니다.');
    }
  });

module.exports=router;