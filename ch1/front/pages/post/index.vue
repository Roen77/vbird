<template>
  <div>
    post페이지
  </div>
</template>

<script>

export default {

    computed:{
        post(){
            return this.$store.state.posts.mainPosts.find(v=>v.id === parseInt(this.$route.params.id,10))
            // this.$route.params.id이게 파일명임
        }
    }

}
</script>

<style>

</style>