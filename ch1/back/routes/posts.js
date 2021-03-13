const express = require('express');
const multer=require("multer");
const path=require('path');
const db = require('../models');
const {isLoggedIn} =require('./middlewares')
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const db = require('../models');

const router = express.Router();

//누구나다볼수잇는게시글이라 로그인확인은필요없다
router.get('/',async (req,res,next)=>{
    //GET /posts?offset=10&limit=10
    try {
        const posts = await db.Post.findAll({
            include:[{
                model:db.User,
                attributes:['id','nickname'],
            }],
            order:[['createdAt','DESC']],
            offset:parseInt(req.query.offset,10) || 0,
            limit:parseInt(req.query.limit,10) || 10
            //실무에서는안쓰임
        })
    } catch (error) {
        console.error(error);
        next(error)
    }
})


module.exports=router;