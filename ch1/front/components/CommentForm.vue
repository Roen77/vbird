<template>
  <v-form ref="form" v-model="valid" style="position:relative" @submit.prevent="onSubmitForm">
    <v-textarea v-model="content" filled label="댓글달기" auto-grow :success="success" :sucess-messages="successMessages" :hide-details="hideDetails" @input="onChangeTextarea" />
    <v-btn color="green" dark absolute top right type="submit">
      삐약
    </v-btn>
  </v-form>
</template>

<script>
export default {
    props:{
        postId:{
            type:Number,
            required:true
        }
    },
    data() {
        return {
            valid: false,
            content:'',
            hideDetails:false,
            success:false,
            successMessages:''
        }
    },
    computed:{
        me(){
            return this.$store.state.users.me
        }
    },
    methods: {
        onChangeTextarea(value) {
            if(value.length){
                this.hideDetails=true;
                this.success=false;
                this.successMessages='';

            }
        },
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('posts/addComment',{
                    id:Date.now(),
                    postId:this.postId,
                    content:this.content,
                    User:{
                        nickname:this.me.nickname
                    }
                })
                .then(()=>{
                    this.content='';
                    this.success=true;
                    this.successMessages='댓글이 작성되었습니다.'
                    // this.successMessages=['','']여러개면 배열안에쓸수있다
                })
            }
        }

    },

}
</script>

<style>

</style>