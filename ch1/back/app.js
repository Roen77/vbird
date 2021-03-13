const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const usersRouter=require('./routes/user')
const postRouter=require('./routes/post')
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
app.use('/',express.static('uploads'))//이미지업로드땜에..프론트에서접근할수잇게한다
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


app.use('/user',usersRouter);
app.use('/post',postRouter);


app.listen(4000,()=>{
    console.log(`백엔드 서버 ${3090}번 포트에서 작동중`)
})