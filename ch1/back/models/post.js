
module.exports=(sequelize,DataTypes)=>{
    const Post=sequelize.define('Post',{ //대문자에단수형으로만히씀 테이블명은 posts
        content:{
            type:DataTypes.TEXT,//매우긴글 제한이없다
            allowNull:false,
            //cereatAt updatedAt 자동생성
        },
    },{
        charset:'utf8mb4', //mp4는 이모티콘때메
        collate:'utf8mb4_general_ci'
    });
    Post.associate=(db)=>{
        //여기서는관계?쓰는듯
        db.Post.belongsTo(db.User); //UserId도 추가된다 addUser addusers
        db.Post.hasMany(db.Comment); // addComments addComment  둘다존재 헤즈메니랑 빌롱스투 두개만
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User,{through:"Like", as:'Likers'})
        db.Post.belongsToMany(db.Hashtag,{through:"PostHashtag"})
        db.Post.belongsTo(db.Post, {as:'Retweet'});//PostId 생긴다 하지만 리트윗아이디가 생기길원한다

    };

    return Post;
}