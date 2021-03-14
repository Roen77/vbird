<template>
  <v-container>
    <post-form v-if="me"></post-form>
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
import PostCard from '../components/PostCard.vue'
import PostForm from '../components/PostForm.vue';
export default {
    components:{
        PostCard,
        PostForm
    },
    fetch({store}){
        console.log('서버에서데이터안줘서안보엿던것...')
        return store.dispatch("posts/loadPosts")
    },
    head(){
        return{
            title:'메인페이지'
        }
    },
    computed:{
        me(){
            return this.$store.state.users.me;
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