<template>
  <v-app>
    <nav>
      <v-toolbar dark color="primary">
        <v-toolbar-title>
          <nuxt-link to="/">
            NodeBird
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-text-field label="검색" hide-details prepend-icon="mdi-magnify" />
          <v-btn text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>
    <!-- nav -->
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <login-form />
      </v-col>
      <!-- 왼쪽 -->
      <v-col cols="12" md="8">
        <nuxt />
      </v-col>
      <!-- 오른쪽 -->
    </v-row>
  </v-app>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
// 상대경로 복잡해지면 루트폴더 ~/ 이렇게써도된다
export default {
  components: { LoginForm },
  computed:{
      name(){
          return this.$store.state.posts.name;
      }
  },
  methods: {
      onClick() {
          this.$store.commit('posts/bye')
      }
  },
    // head(){
    //     return{
    //         title:'NodeBird',
    //     }
    // }
    // 메인페이지 즉 index페이지에 head가 없으면 이폴트값에있는 이 헤드값이들어각ㄴ다 head에 title에 들어감

}
</script>

<style scoped>
.v-application a{color:#fff;}
</style>