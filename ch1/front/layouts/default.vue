<template>
  <v-app>
    <nav>
      <v-toolbar dark color="primary">
        <v-toolbar-title>
          <nuxt-link to="/" class="logo">
            NodeBird
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{display:'flex',height:'100%',alignItems:'center'}">
              <v-text-field v-model="hashtag" label="검색" hide-details prepend-icon="mdi-magnify" />
            </div>
          </v-form>
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
  data() {
    return {
      hashtag: ''
    }
  },
    methods: {
      onSearchHashtag() {
        console.log(this.hashtag)
        this.$router.push({
          path:`/hashtag/${encodeURIComponent(this.hashtag)}`
        });
        this.hashtag=''
        }
      }


}
</script>

<style scoped>
.v-application a{color:#fff;}
.logo{text-align: none;}
</style>