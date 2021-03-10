<template>
  <div>
    <div>
      <post-card />
      <post-card />
      <post-card />
      <post-card />
      <post-card />
    </div>
  </div>
</template>

<script>
import PostCard from '../components/PostCard.vue'
export default {
    components:{
        PostCard
    },
    head(){
        return{
            title:'메인페이지'
        }
    }
}
</script>

<style>

</style>