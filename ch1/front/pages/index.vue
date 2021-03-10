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
        }
    }
}
</script>

<style>

</style>