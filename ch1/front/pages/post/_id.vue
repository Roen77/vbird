<template>
  <div>
    <v-container v-if="post">
      <post-card :post="post"></post-card>
    </v-container>
    <div v-else>
      해당 아이디의 게시글이 존재하지 않습니다
    </div>
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
export default {
    components:{
        PostCard
    },
        fetch({ store, params }) {
      return store.dispatch('posts/loadPost', params.id);
    },
    computed:{
        post(){
            return this.$store.state.posts.mainPosts.find(v=>v.id === parseInt(this.$route.params.id,10))
            // this.$route.params.id이게 파일명임
        }
    },

}
</script>

<style>

</style>