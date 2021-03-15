<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <!--  v-model="valid"  이건 뷰티파이에만있는것 -->
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field v-model="userId" label="이메일" type="email" required :rules="userIdRules" />
            <v-text-field v-model="password" label="비밀번호" type="password" required :rules="passwordRules" />
            <v-text-field v-model="passwordCheck" label="비밀번호 확인" type="password" required :rules="passwordChackRules" />
            <v-text-field v-model="nickname" label="닉네임" type="nickname" required :rules="nicknameRules" />
            <v-checkbox v-model="terms" required label="회원가입에 동의합니다." :rules="[v=>!!v ||'약관에 동의해야합니다.']" />
            <v-btn color="orange" :disabled="!valid" type="submit">
              가입하기
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
    // head() {
    //     return {
    //         title: '회원가입'
    //     }
    // }
     middleware:'annoymous',
    data() {
        return {
            valid: false,
            // 여기서 valid는 rules에 따라 바뀌고 이건 뷰티파이에있는거임
            //rules가 모두 참인경우에만 valid가 참으로바뀐다
           userId:'',
            password:'',
            passwordCheck:'',
            terms:false,
            nickname:'',
            userIdRules:[
                v=> !!v || '이메일은 필수입니다',
                v=> /.+@.+/.test(v) || '이메일이 유효하지 않습니다'
            ],
            nicknameRules:[
                v=> !!v || '닉네임은 필수입니다',
            ],
            passwordRules:[
                v=> !!v || '비밀번호는 필수입니다.',
            ],
            passwordChackRules:[
                v=> !!v || '비밀번호 확인은 필수입니다.',
                v=> v === this.password || '비밀번가 일치하지 않습니다..'
            ],

        }
    },
    computed:{
      me(){
          return this.$store.state.users.me
      }
    },
    watch:{
      me(newvalue,oldvalue){
        if(newvalue){
          this.$router.push({
            path:'/'
          })
        }
      }
    },
    methods: {
        onSubmitForm() {
            // this.$refs.form.validate();
            // validate는 뷰티파이꺼
             if (this.$refs.form.validate()) {
          this.$store.dispatch('users/signUp', {
            nickname: this.nickname,
            userId: this.userId,
            password: this.password,
               }).then(()=>{
                 this.$router.push({path:'/'})
               })
               .catch(()=>{
                 alert("회원가입 실패")
               })

               
             }
            // console.log(this.valid)
        }
    }

}
</script>

<style>

</style>