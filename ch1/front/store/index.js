// export const strict = false

export const state=()=>({
   
})


export const  mutaions={

};

export const actions = {
    nuxtServerInit({ commit, dispatch, state }, { req }) {
      return dispatch('users/loadUser');
    },
  };

