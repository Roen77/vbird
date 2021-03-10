<template>
  <v-container>
    <post-form v-if="me"></post-form>
    <div>
      <post-card ㅍ- />
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
        }
    }
}
</script>

<style>

</style>