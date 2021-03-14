<template>
  <v-container>
    <v-card style="margin-bottom:20px">
      <v-container>
        {{ other.nickname }}
        <v-row>
          <v-col cols="4">
            {{ other.Followings.length }}팔로잉
          </v-col>
          <v-col cols="4">
            {{ other.Followers.length }}팔로워
          </v-col>
          <v-col cols="4">
            {{ other.Posts.length }} 게시글
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
import PostCard from '../../../components/PostCard.vue'
export default {
    components:{
        PostCard,
    },
    fetch({ store, params }) {
      return Promise.all([
        store.dispatch('posts/loadUserPosts', {
          userId: params.id,
          reset: true,
        }),
        store.dispatch('users/loadOther', {
          userId: params.id,
        }),
      ]);
    },
    //fetch는 this못쓴다
    head(){
        return{
            title:'메인페이지'
        }
    },
    computed:{
        other(){
            return this.$store.state.users.other;
        },
        mainPosts(){
            return this.$store.state.posts.mainPosts
        },
        hasMorePost(){
            return this.$store.state.posts.hasMorePost
        }
    },

    // created(){
    //      this.$store.dispatch('posts/loadPosts')
    // },
    //beforemount같은느낌인가 created에하는듯 이거찾아보니 nuxt꺼인듯??
    mounted(){
        window.addEventListener("scroll",this.onScroll)
    },
    // el 못가져오니 안전하게 마운트완료되어 이벤트 걸어주는게좋다
    beforeDestroy(){
        window.addEventListener("scroll",this.onScroll)
    },
    methods: {
        onScroll() {
            if(window.scrollY +document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                if(this.hasMorePost){
                    console.log("스크롤이벤트")
                    this.$store.dispatch('posts/loadPosts')
                }
            };
        }
    },
}
</script>

<style>

</style>