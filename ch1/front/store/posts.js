import Vue from 'vue';
import throttle from 'lodash.throttle';

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
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts.splice(index, 1);
        console.log(state.mainPosts)
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
    loadPosts(state, payload) {
        if (payload.reset) {
          state.mainPosts = payload.data;
        } else {
          state.mainPosts = state.mainPosts.concat(payload.data);
        }
        state.hasMorePost = payload.data.length === 10;
      },
    concatImagesPaths(state,payload){
        state.imagePaths=state.imagePaths.concat(payload)
    },
    removeImagePath(state,payload){
        state.imagePaths.splice(payload,1);
    },
    unlikePost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        const userIndex = state.mainPosts[index].Likers.findIndex(v => v.id === payload.userId);
        state.mainPosts[index].Likers.splice(userIndex, 1);
      },
      likePost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);
        state.mainPosts[index].Likers.push({
          id: payload.userId,
        });
      },

}

export const actions={
    add({commit,state},payload){
        //서버에 게시글 등록
        this.$axios.post('/post',{
            content:payload.content,
            image:state.imagePaths,
        },{
            withCredentials: true,
        })
        .then((res)=>{
            console.log('데이터확인',res.data)
            commit('addMainPost',res.data)
        }).catch(()=>{
            console.error(error)
        })
       
        //만약에 위의 addMainPost가 아닌 아른 모듈인 index.js에 있는  addMainPost를 가져오고 싶다면  commit('addMainPost',payload,{root:true}) 라고해주면된다 두번째잇자는 없으면 null로
    },
    remove({commit},payload){
        this.$axios.delete(`/post/${payload.postId}`,{
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
        this.$axios.post(`/post/${payload.postId}/comment`,{
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
        this.$axios.get(`/post/${payload.postId}/comments`)
        .then((res)=>{
            commit('loadComments',res.data)
        })
        .catch(()=>{
            console.error(error)
        })
    },
    loadPosts: throttle(async function({ commit, state }, payload) {
        console.log('loadPosts');
        try {
          if (payload && payload.reset) {
            const res = await this.$axios.get(`/posts?limit=10`);
            commit('loadPosts', {
              data: res.data,
              reset: true,
            });
            return;
          }
          if (state.hasMorePost) {
            const lastPost = state.mainPosts[state.mainPosts.length - 1];
            const res = await this.$axios.get(`/posts?lastId=${lastPost && lastPost.id}&limit=10`);
            commit('loadPosts', {
              data: res.data,
            });
            return;
          }
        } catch (err) {
          console.error(err);
        }
      }, 2000),
      loadUserPosts: throttle(async function({ commit, state }, payload) {
        try {
          if (payload && payload.reset) {
            const res = await this.$axios.get(`/user/${payload.userId}/posts?limit=10`);
            commit('loadPosts', {
              data: res.data,
              reset: true,
            });
            return;
          }
          if (state.hasMorePost) {
            const lastPost = state.mainPosts[state.mainPosts.length - 1];
            const res = await this.$axios.get(`/user/${payload.userId}/posts?lastId=${lastPost && lastPost.id}&limit=10`);
            commit('loadPosts', {
              data: res.data,
            });
            return;
          }
        } catch (err) {
          console.error(err);
        }
      }, 2000),
    uploadImages({commit},payload){
        console.log("이미지확인",payload)
        this.$axios.post('/post/images',payload,{
            withCredentials:true,
        })
        .then((res)=>{
            console.log(res.data)
            commit('concatImagesPaths',res.data)
        })
        .catch((err)=>{
            console.error(error)
        })
    },
    retweet({ commit }, payload) {
        this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
          withCredentials: true,
        })
          .then((res) => {
            commit('addMainPost', res.data);
          })
          .catch((err) => {
            console.error(err);
            alert(err.response.data);
          });
      },
      likePost({ commit }, payload) {
        this.$axios.post(`/post/${payload.postId}/like`, {}, {
          withCredentials: true,
        })
          .then((res) => {
            commit('likePost', {
              userId: res.data.userId,
              postId: payload.postId,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      },
      unlikePost({ commit }, payload) {
        this.$axios.delete(`/post/${payload.postId}/like`, {
          withCredentials: true,
        })
          .then((res) => {
            console.log('unlikePost');
            commit('unlikePost', {
              userId: res.data.userId,
              postId: payload.postId,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      },

}