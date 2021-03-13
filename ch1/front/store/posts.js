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
       const index= state.mainPosts.findIndex(v => v.id === payload.id);
        state.mainPosts.splice(index,1)
        // 사실필터쓰면 한줄로삭제가능
    },
    addComment(state,payload){
        console.log('넘겨준자료',payload)
        const index= state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Comments.unshift(payload)
    },
    loadPosts(state){
        const diff=totalPosts -state.mainPosts.length;//아직 안불러온 게시글 수
        const fakePosts=Array(diff>limit?limit:diff).fill().map(v=>({
            id:Math.random().toString(),
            User:{
                id:1,
                nickname:'roen'
            },
            content:`hello infinite scroll ${Math.random()}`,
            Comments:[],
            Images:[],
        }));
        state.mainPosts=state.mainPosts.concat(fakePosts);
        // console.log("뮤테이션호출", state.mainPosts)

        state.hasMorePost=fakePosts.length === limit
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
            imagePaths:state.imagePaths
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
        commit('removeMainPost',payload)
    },
    addComment({commit},payload){
        commit('addComment',payload)
    },
    loadPosts({commit,state}){
        if(state.hasMorePost){
            commit('loadPosts')
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