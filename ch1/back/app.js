const exporess= require('express');

const app=exporess();

app.get('/',(req,res)=>{
    res.send('안녕 백엔드')
    // res.status(200).send('안녕 백엔드') 이 생략되어 있다
})

app.listen(3085,()=>{
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중`)
})