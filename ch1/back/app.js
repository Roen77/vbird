const exporess= require('express');
const db=require("./models")
const app=exporess();

db.sequelize.sync();

app.use(exporess.json());
app.use(exporess.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('안녕 백엔드')
    // res.status(200).send('안녕 백엔드') 이 생략되어 있다
})

app.post('/user',async (req,res,next)=>{
    try {
     const newUser= await db.User.create({
            where:{
                email:req.body.email,
                password:req.body.password,
                nickname:req.body.nickname
            }
        });
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.listen(3080,()=>{
    console.log(`백엔드 서버 ${3080}번 포트에서 작동중`)
})