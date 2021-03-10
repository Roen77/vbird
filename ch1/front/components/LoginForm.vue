<template>
  <v-container>
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field v-model="email" label="이메일" type="email" required :rules="emailRules" />
          <v-text-field v-model="password" label="비밀번호" type="password" required :rules="passwordRules" />
          <v-btn color="orange" type="submit" :disabled="!valid">
            로그인
          </v-btn>
          <v-btn nuxt to="/signup">
            회원가입
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <!-- v-container는 패딩?준것과비슷 -->
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            email:'',
            password:'',
            emailRules:[
                v=> !!v || '이메일은 필수입니다',
                v=> /.+@.+/.test(v) || '이메일이 유효하지 않습니다'
            ],
            passwordRules:[
                v=> !!v || '비밀번호는 필수입니다.',
            ],

        }
    },
    methods: {
        onSubmitForm() {
            this.$refs.form.validate();
            console.log( this.$refs.form.validate())
        }
    },

}
</script>

<style>

</style>