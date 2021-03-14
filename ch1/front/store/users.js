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
        const index=state.me.Followings.findIndex(v=>v.id === payload.userId);
        state.me.Followings.splice(index,1);
        // state.followingList= state.followingList.filter(user=>user.id !== payload.id);
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
    following(state,payload){
        state.me.Followings.push({id:payload.userId})
    },


}
// 비동기처리는 actions에서한다
export const actions={
    async loadUser({ state, commit }) {
        try {
          const res = await this.$axios.get('/user', {
            withCredentials: true,
          });
          commit('setMe', res.data);
        //   console.log('개샛기들',res.data)
        } catch (err) {
          console.error(err);
        }
      },
    signUp({ commit, state }, payload) {
        this.$axios.post('/user', {
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
      login({ commit }, payload) {
        this.$axios.post('/user/login', {
          email: payload.email,
          password: payload.password,
        }, {
          withCredentials: true,
        })
          .then((res) => {
            commit('setMe', res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    logout({commit},payload){
        this.$axios.post('/user/logout',{},{
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
        this.$axios.patch(`/user/nickname`,{
            nickname:payload.nickname
        },{
            withCredentials:true
        })
        .then(()=>{
            commit("changeNickname",payload)
        })
        .catch((err)=>{
            console.log(err)
        })
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
    follow({ commit }, payload) {
        this.$axios.post(`/user/${payload.userId}/follow`, {}, {
          withCredentials: true,
        })
          .then((res) => {
            commit('following', {
              userId: payload.userId,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      },
      unfollow({ commit }, payload) {
        return this.$axios.delete(`/user/${payload.userId}/follow`,  {
          withCredentials: true,
        })
          .then((res) => {
            commit('removeFollowing', {
              userId: payload.userId,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      },
}
// context안에 commit,dispatch,state,rootState,getters,rootGetters