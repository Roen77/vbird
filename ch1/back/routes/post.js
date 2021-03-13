const express = require('express');
const multer=require("multer");
const path=require('path');
const db = require('../models');
const {isLoggedIn} =require('./middlewares')
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const db = require('../models');

const router = express.Router();

const upload=multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads');
        },
        filename(req,file,done){
            const ext=path.extname(file.originalname);
            const basename=path.basename(file.originalname,ext); //로엔.png
            //basename=로엔 ext=.png
            done(null,basename+Date.now()+ext);

        }
    }),
    limit:{fileSize:20*1024*1024},
});
router.post('/images',isLoggedIn,upload.array('image'),(req,res)=>{
    // if(req.isAuthenticated()){
    //     //이건 로그인한사람만할수있는거 앞에느낌표붙이면 로그인안한사람이할수있는거
    //     // 중복된다면미들웨어로빼서쓸수잇다
    // }
    //multer를 쓰면 
    // req.files=[{filename:"~"},{filename:"~"}] 이런식으로넣어줌
    console.log(req.files);
    res.json(req.files.map((v)=>v.filename))
});


router.post('/',isLoggedIn,async (req,res)=>{ // POST /post 게시물을작성한다
    // if(req.isAuthenticated()){
        try {
            // req.body.content,
            // req.body.imagePaths,
            const hasgtags=req.body.content.match(/#[^\s#]+/g);
            const newPost=await db.Post.create({
                content:req.body.content,
                UserId:req.user.id,
            });
            if(hasgtags){
              const result = await Promise.all(hasgtags.map(tag=>db.Hashtag.findOrCreate({
                        where:{ name:tag.slice(1).toLoserCase()},
                    })));
                    await newPost.addHashtags(result.map(r=>r[0]));
                    //쿼리복잡하거나안되면
                    //db.sequelize.query('sql문직접적으면된다');
            }
            const fullPost=await db.Post.findOne({
                where:{id:newPost.id},
                include:[{
                    model:db.User,
                    attributes:['id','nickname'],
                }]
            })
            return res.json(fullPost)

        } catch (error) {
            console.error(error);
            next(error)
        }
    // }
});


module.exports=router;