export const state=()=>({
    mainPosts:[],
    hasMorePost:true,
    imagePaths:[],
})

const totalPosts=101;
const limit=10;
// 마지막아이디기준으로하고 limit기준으로는안한다
//throttle


export const  mutations={
    addMainPost(state,payload){
        state.mainPosts.unshift(payload)
        state.imagePaths=[];
    },
    removeMainPost(state,payload){
       const index= state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts.splice(index,1)
        // 사실필터쓰면 한줄로삭제가능
    },
    loadComments(state,payload){
        const index= state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments=payload;
    },
    addComment(state,payload){
        // console.log('넘겨준자료',payload)
        const index= state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload)
    },
    loadPosts(state){
        state.mainPosts=state.mainPosts.concat(payload);
        state.hasMorePost=payload.length === limit;
    },
    concatImagesPaths(state,payload){
        state.imagePaths=state.imagePaths.concat(payload)
    },
    removeImagePath(state,payload){
        state.imagePaths.splice(payload,1);
    }
}

export const actions={
    add({commit,state},payload){
        //서버에 게시글 등록
        this.$axios.post('http://localhost:4000/post',{
            content:payload.content,
            image:state.imagePaths,
        },{
            withCredentials: true,
        })
        .then((res)=>{
            commit('addMainPost',res.data)
        }).catch(()=>{

        })
       
        //만약에 위의 addMainPost가 아닌 아른 모듈인 index.js에 있는  addMainPost를 가져오고 싶다면  commit('addMainPost',payload,{root:true}) 라고해주면된다 두번째잇자는 없으면 null로
    },
    remove({commit},payload){
        this.$axios.delete(`http://localhost:4000/post/${payload.postId}`,{
            withCredentials:true,
        })
        .then(()=>{
            commit('removeMainPost',payload.postId)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    },
    addComment({commit},payload){
        this.$axios.post(`http://localhost:4000/post/${payload.postId}/comment`,{
            content:payload.content,
        },{
            withCredentials:true,
        })
        .then((res)=>{
            commit('addComment',res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
     
    },
    loadCommnets({commit},payload){
        this.$axios.get(`http://localhost:4000/post/${payload.postId}/comments`)
        .then((res)=>{
            commit('loadComments',res.data)
        })
        .catch(()=>{

        })
    },
    loadPosts({commit,state}){
        if(state.hasMorePost){
            this.$axios.get(`http://localhost:4000/posts?offset=${state.mainPosts.length}&limit=10`)
            .then((res)=>{
                commit('loadPosts',res.data)
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    uploadImages({commit},payload){
        console.log("이미지확인",payload)
        this.$axios.post('http://localhost:4000/post/images',payload,{
            withCredentials:true,
        })
        .then((res)=>{
            console.log(res.data)
            commit('concatImagesPaths',res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}