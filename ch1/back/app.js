const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const app = express();

db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// app.use(morgan('dev'));
// // app.use(cors())
// // app.use(cors('http://localhost:58696'));
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   }));
// 모든요청허용임
//하지만 실무에서는이렇게하면안된다
// app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie('cookiesecret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookiesecret',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send('안녕 dd');
});



app.post('/user',async (req,res,next)=>{
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

app.use('/user/login',(req,res,next)=>{
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

app.listen(3080,()=>{
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중`)
})