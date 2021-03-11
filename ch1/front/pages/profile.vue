<template>
  <div>
    <v-container>
      <v-card style="margin-bottom:20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChaneNickname">
            <v-text-field v-model="nickname" label="닉네임" required :rules="nicknameRules" />
            <v-btn color="blue" type="submit">
              수정
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
      <!-- card -->
      <v-card style="margin-bottom:20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingLlist" :remove="removeFollowing" />
          <v-btn v-if=" hasMoreFollowing" color="blue" style="width:100%" @click="loadMoreFollowings">
            더보기
          </v-btn>
        </v-container>
      </v-card>
      <v-card style="margin=bottom:20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn v-if=" hasMoreFollower" color="blue" style="width:100%" @click="loadMoreFollowers">
            더보기
          </v-btn>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from '../components/FollowList.vue'
export default {
  components: { FollowList },
  middleware:'authenticated',
  data() {
      return {
          valid: false,
          nickname:'',
          nicknameRules:[v=>!!v || "닉네임을 입력하세요"]
      }
  },
  fetch({store}){
    store.dispatch('users/loadFollowers')
    store.dispatch('users/loadFollowings')
  },
      computed:{
        followingLlist(){
            return this.$store.state.users.followingList
        },
        followerList(){
            return this.$store.state.users.followerList
        },
        hasMoreFollowing(){
          return this.$store.state.users.hasMoreFollowing
        },
        hasMoreFollower(){
          return this.$store.state.users.hasMoreFollower
        },
    },
  methods: {
      onChaneNickname() {
          this.$store.dispatch("users/changeNickname",{
              nickname:this.nickname,

          })
      },
      removeFollowing(id){
          this.$store.dispatch('users/removeFollowing',{id})
      },
      removeFollower(id){
            this.$store.dispatch('users/removeFollower',{id})
      },
      loadMoreFollowings(){
        this.$store.dispatch('users/loadFollowings')
      },
      loadMoreFollowers(){
        this.$store.dispatch('users/loadFollowers')
      }
  }
    // layout:'admin',
    // nuxt가 추가한것
    // head(){
    //     return{
    //         title:'프로필'
    //     }
    // }

}
</script>

<style>

</style>