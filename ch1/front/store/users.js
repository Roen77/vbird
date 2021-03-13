export const state=()=>({
    me:null,
    // followerList:[{
    //     id:1,
    //     nickname:'roen'
    // },{
    //     id:2,
    //     nickname:'네로'
    // },{
    //     id:3,
    //     nickname:'히어로'
    // }],
    // followingList:[{
    //     id:1,
    //     nickname:'roen'
    // },{
    //     id:2,
    //     nickname:'네로'
    // },{
    //     id:3,
    //     nickname:'히어로'
    // }],
    followerList:[],
    followingList:[],
    hasMoreFollower:true,
    hasMoreFollowing:true,
})

const totalFollowers=8;
const totalFollowings=6;
const limit=3;

export const  mutations={
    setMe(state,payload){
        state.me=payload
    },
    changeNickname(state,payload){
        state.me.nickname=payload.nickname;
    },
    removeFollower(state,payload){
        state.followerList= state.followerList.filter(user=>user.id !== payload.id);
    },
    removeFollowing(state,payload){
        state.followingList= state.followingList.filter(user=>user.id !== payload.id);
    },
    loadFollowings(state){
        const diff=totalFollowings -state.followingList.length;
        const fakeUsers=Array(diff>limit?limit:diff).fill().map(v=>({
            id:Math.random().toString(),
            nickname:String(Math.ceil(Math.random()*1000))
        }));
        state.followingList=state.followingList.concat(fakeUsers);
        state.hasMoreFollowing=fakeUsers.length === limit;
    },
    loadFollowers(state){
        const diff=totalFollowers -state.followerList.length;
        const fakeUsers=Array(diff>limit?limit:diff).fill().map(v=>({
            id:Math.random().toString(),
            nickname:String(Math.ceil(Math.random()*1000))
        }));
        state.followerList=state.followerList.concat(fakeUsers);
        state.hasMoreFollower=fakeUsers.length === limit;
    },

}
// 비동기처리는 actions에서한다
export const actions={
    signUp({ commit, state }, payload) {
        this.$axios.post('http://localhost:4000/user', {
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password,
        }, {
          withCredentials: true,
        })
          .then((res) => {
              console.log(res)
            commit('setMe', res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    login({commit},payload){
        this.$axios.post('http://localhost:4000/user/login', {
            email: payload.email,
            password: payload.password,
          }, {
            withCredentials: true,
          }).then((res)=>{
            commit('setMe',res.data)
          })
          .catch((err)=>{
              console.error(err)
          })
    },
    logout({commit},payload){
        this.$axios.post('http://localhost:4000/user/logout',{},{
            withCredentials: true,
          })
        .then((data)=>{
            commit('setMe',null)
          })
          .catch((err)=>{
              console.error(err)
          })
    },
    changeNickname({commit},payload){
        commit('setMe',payload)
    },
    addFollwing({commit},payload){
        state.followingList.push(payload)
    },
    addFollower({commit},payload){
        state.followerList.push(payload)
    },
    removeFollower({commit},payload){
        commit('removeFollower',payload)
    },
    removeFollowing({commit},payload){
        commit('removeFollowing',payload)
        // state.followingList.push(payload)
    //    state.followingList= state.followingList.fillter(user=>user.id !== payload.id);

    //    const index=state.followingList.findIndex(v=>v.id === payload.id)
    //    state.followerList.splice(index,1)
    },
    loadFollowers({commit,state}){
        if(state.hasMoreFollower){
            commit("loadFollowers")
        }
    },
    loadFollowings({commit,state}){
        if(state.hasMoreFollowing){
            commit("loadFollowings")
        }

    },
}
// context안에 commit,dispatch,state,rootState,getters,rootGetters