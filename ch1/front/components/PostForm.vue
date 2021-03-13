<template>
  <v-card style="margin-bottom:20px">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea v-model="content" outlined auto-grow clearble label="어떤 신기한 일이 있었나요?" :hide-details="hideDetails" :success-messages="successMessages"
                    :rules="[v=>!!v || '내용을 입력하세요']"
                    @input="onChangeTextarea"
        ></v-textarea>
        <!-- v.trime() 이 오류가생김 나중에확인 -->
        <v-btn color="green" type="submit" absolute right>
          짹짹
        </v-btn>
        <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
      </v-form>
      <v-btn type="button" @click="onClickImageUpload">
        이미지 업로드
      </v-btn>
      <div>
        <div v-for="(p,i) in imagePaths" :key="p" style="display:inline-block">
          <img :src="`http://localhost:4000/${p}`" :alt="p" style="width:200px">
          <div>
            <button type="button" @click="onReomveImage(i)">
              제거
            </button>
          </div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            valid:false,
            hideDetails: true,
            successMessages:'',
            success:false,
            content:''
        }
    },
    computed:{
         ...mapState('users',['me']),
         ...mapState('posts',['imagePaths'])
        // ...mapState(['users/me'])
        // ...mapState('users',['me']) 둘다 표현다 가능하다
    },
    methods: {
        onChangeTextarea() {
            this.hideDetails=true;
            this.success=false;
            this.successMessages=""
        },
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('posts/add',{
                    content:this.content,
                })
                .then(()=>{
                    this.content=""
                    this.hideDetails=false;
                    this.success=true;
                    this.successMessages="게시글 등록 성공!"
                })
                .catch(()=>{

                })
            }
        },
        onClickImageUpload(){
          this.$refs.imageInput.click();
        },
        onChangeImages(e){
          //여기서 이미지 요청할것
          console.log("파일확인",e.target.files)
          //유사배열이라 배열로만들어서 넣어준것
          const imageFormData=new FormData();
         [].forEach.call(e.target.files, (f) => {
          imageFormData.append('image', f);   // { image: [file1, file2] }
        });
          console.log('이미지폼데이터확인',imageFormData)
          this.$store.dispatch('posts/uploadImages',imageFormData)
        },
        onReomveImage(index){
          this.$store.commit('posts/removeImagePath',index)
        }
    },

}
</script>

<style>

</style>